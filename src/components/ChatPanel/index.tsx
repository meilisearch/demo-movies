import React, { useState, useRef, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { Cross, Send } from '~/components/icons'
import LanguageContext from '~/context/LanguageContext'
import { MEILISEARCH_HOST, MEILISEARCH_API_KEY } from '~/constants'
import MovieCarousel from './MovieCarousel'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  toolCalls?: any[]
  searchProgress?: {
    query: string
    indexUid: string
    results?: number
    movieTitles?: string[]
  }[]
  sources?: {
    title: string
    id: string
    poster_path?: string
    release_date?: string
    vote_average?: number
  }[]
}

interface ChatPanelProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const PanelContainer = styled.div<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  right: ${props => props.isOpen ? '0' : '-500px'};
  height: 100vh;
  width: 500px;
  background: var(--color-background);
  border-left: ${props => props.isOpen ? '1px solid var(--color-border)' : 'none'};
  transition: right 0.3s ease-in-out, border 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  box-shadow: ${props => props.isOpen ? '-2px 0 8px rgba(0, 0, 0, 0.1)' : 'none'};
  overflow: hidden;
  z-index: 999;

  @media (max-width: 768px) {
    right: ${props => props.isOpen ? '0' : '-100%'};
    width: 100%;
    transition: right 0.3s ease-in-out;
    z-index: 1000;
  }
`


const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid var(--color-border);
  background: var(--color-header-bg);
`

const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
`

const CloseButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: var(--color-text-secondary);

  &:hover {
    background: var(--color-hover-bg);
  }
`

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const MessageBubble = styled.div<{ role: 'user' | 'assistant' }>`
  max-width: 85%;
  align-self: ${props => props.role === 'user' ? 'flex-end' : 'flex-start'};
  background: ${props => props.role === 'user' ? 'var(--color-user-message)' : 'var(--color-assistant-message)'};
  color: ${props => props.role === 'user' ? 'white' : 'var(--color-text)'};
  padding: 12px 16px;
  border-radius: 16px;
  word-wrap: break-word;
  line-height: 1.5;
`

const ToolCallIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: var(--color-tool-bg);
  border-radius: 8px;
  font-size: 13px;
  color: var(--color-text-secondary);
  margin: 4px 0;
`

const SearchProgress = styled.div`
  padding: 10px 14px;
  background: var(--color-tool-bg);
  border-radius: 8px;
  font-size: 13px;
  color: var(--color-primary);
  margin: 8px 0;
  border-left: 3px solid var(--color-primary);
  
  .search-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
    margin-bottom: 4px;
  }
  
  .search-details {
    color: var(--color-text-secondary);
    font-size: 12px;
    margin-left: 28px;
  }
  
  .movie-list {
    margin-top: 6px;
    margin-left: 28px;
    font-size: 12px;
    color: var(--color-text-secondary);
  }
`


const InputContainer = styled.form`
  padding: 16px;
  border-top: 1px solid var(--color-border);
  display: flex;
  gap: 8px;
`

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid var(--color-border);
  border-radius: 24px;
  background: var(--color-input-bg);
  color: var(--color-text);
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: var(--color-primary);
  }

  &::placeholder {
    color: var(--color-text-secondary);
  }
`

const SendButton = styled.button`
  background: var(--color-primary);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background 0.2s;

  &:hover:not(:disabled) {
    background: var(--color-primary-hover);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const WelcomeMessage = styled.div`
  text-align: center;
  color: var(--color-text-secondary);
  padding: 40px 20px;
  font-size: 14px;
  line-height: 1.6;
`

const ExampleQueries = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
  max-width: 100%;
`

const ExampleButton = styled.button`
  background: var(--color-assistant-message);
  border: 1px solid var(--color-border);
  color: var(--color-text);
  padding: 12px 24px;
  border-radius: 24px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  font-weight: 500;
  width: 100%;
  text-align: center;
  
  &:hover {
    background: var(--color-hover-bg);
    border-color: var(--color-primary);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
    box-shadow: none;
  }
`

const ExampleSection = styled.div`
  margin-top: 20px;
  
  h4 {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 12px;
  }
`

const exampleQueries = [
  "Movies similar to Inception",
  "Show me feel-good family movies",
  "Best sci-fi movies from 2023"
]

export default function ChatPanel({ isOpen, setIsOpen }: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<null | HTMLDivElement>(null)
  const { selectedLanguage } = useContext(LanguageContext)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const submitQuery = async (query: string) => {
    if (!query.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: query.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(`${MEILISEARCH_HOST}/chats/movie-advisor/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${MEILISEARCH_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            ...messages.map(m => ({ role: m.role, content: m.content })),
            { role: 'user', content: userMessage.content }
          ],
          stream: true,
          tools: [
            {
              type: 'function',
              function: {
                name: '_meiliSearchProgress',
                description: 'Internal tool for tracking search progress',
                parameters: {
                  type: 'object',
                  properties: {
                    function_arguments: { type: 'string' }
                  }
                }
              }
            },
            {
              type: 'function',
              function: {
                name: '_meiliSearchSources',
                description: 'Provides sources from search results'
              }
            },
            {
              type: 'function',
              function: {
                name: '_meiliAppendConversationMessage',
                description: 'Internal tool for appending conversation messages',
                parameters: {
                  type: 'object',
                  properties: {
                    message: { type: 'string' }
                  }
                }
              }
            }
          ]
        })
      })

      if (!response.ok) {
        throw new Error('Failed to get response')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()
      let assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: '',
        searchProgress: [],
        sources: []
      }

      setMessages(prev => [...prev, assistantMessage])

      if (reader) {
        while (true) {
          const { value, done } = await reader.read()
          if (done) break

          const chunk = decoder.decode(value)
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6)
              if (data === '[DONE]') continue

              try {
                const json = JSON.parse(data)
                
                // Handle tool calls
                const toolCalls = json.choices?.[0]?.delta?.tool_calls
                if (toolCalls && toolCalls.length > 0) {
                  for (const toolCall of toolCalls) {
                    if (toolCall.function?.name === '_meiliSearchProgress') {
                      try {
                        const args = JSON.parse(toolCall.function.arguments)
                        const innerArgs = JSON.parse(args.function_arguments)
                        
                        const movieTitles = innerArgs.hits?.slice(0, 5).map((hit: any) => hit.title) || []
                        
                        assistantMessage.searchProgress?.push({
                          query: innerArgs.q || '',
                          indexUid: innerArgs.index_uid || selectedLanguage.indexName,
                          results: innerArgs.hits?.length,
                          movieTitles
                        })

                        setMessages(prev => {
                          const newMessages = [...prev]
                          const lastMessage = newMessages[newMessages.length - 1]
                          if (lastMessage.id === assistantMessage.id) {
                            lastMessage.searchProgress = assistantMessage.searchProgress
                          }
                          return newMessages
                        })
                      } catch (e) {
                        console.error('Error parsing search progress:', e)
                      }
                    } else if (toolCall.function?.name === '_meiliSearchSources') {
                      try {
                        const args = JSON.parse(toolCall.function.arguments)
                        const sources = args.sources || []
                        
                        assistantMessage.sources = sources.map((doc: any) => ({
                          title: doc.title,
                          id: doc.id || doc.objectID,
                          poster_path: doc.poster_path,
                          release_date: doc.release_date,
                          vote_average: doc.vote_average
                        }))

                        setMessages(prev => {
                          const newMessages = [...prev]
                          const lastMessage = newMessages[newMessages.length - 1]
                          if (lastMessage.id === assistantMessage.id) {
                            lastMessage.sources = assistantMessage.sources
                          }
                          return newMessages
                        })
                      } catch (e) {
                        console.error('Error parsing sources:', e)
                      }
                    }
                  }
                }

                // Handle content
                const content = json.choices?.[0]?.delta?.content
                if (content) {
                  assistantMessage.content += content
                  setMessages(prev => {
                    const newMessages = [...prev]
                    const lastMessage = newMessages[newMessages.length - 1]
                    if (lastMessage.id === assistantMessage.id) {
                      lastMessage.content = assistantMessage.content
                    }
                    return newMessages
                  })
                }
              } catch (e) {
                console.error('Error parsing SSE data:', e)
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const handleExampleClick = (query: string) => {
    submitQuery(query)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submitQuery(input)
  }

  return (
    <PanelContainer isOpen={isOpen}>
        <Header>
          <Title>Movie Advisor AI</Title>
          <CloseButton onClick={() => setIsOpen(false)}>
            <Cross width={20} height={20} />
          </CloseButton>
        </Header>

        <MessagesContainer>
          {messages.length === 0 ? (
            <WelcomeMessage>
              <div>
                👋 Hi! I'm your movie advisor. Ask me about movies, actors, genres, or get personalized recommendations!
              </div>
              
              <ExampleSection>
                <h4>Try asking:</h4>
                <ExampleQueries>
                  {exampleQueries.map((query, index) => (
                    <ExampleButton
                      key={index}
                      onClick={() => handleExampleClick(query)}
                    >
                      {query}
                    </ExampleButton>
                  ))}
                </ExampleQueries>
              </ExampleSection>
            </WelcomeMessage>
          ) : (
            messages.map((message) => (
              <React.Fragment key={message.id}>
                {message.searchProgress && message.searchProgress.length > 0 && (
                  message.searchProgress.map((progress, index) => (
                    <SearchProgress key={`${message.id}-progress-${index}`}>
                      <div className="search-header">
                        🔍 Searching database...
                      </div>
                      <div className="search-details">
                        Query: "{progress.query}"<br />
                        Index: {progress.indexUid}
                        {progress.results !== undefined && (
                          <>
                            <br />
                            Found: {progress.results} results
                          </>
                        )}
                      </div>
                      {progress.movieTitles && progress.movieTitles.length > 0 && (
                        <div className="movie-list">
                          Top matches: {progress.movieTitles.join(', ')}
                        </div>
                      )}
                    </SearchProgress>
                  ))
                )}
                {message.sources && message.sources.length > 0 && (
                  <MovieCarousel movies={message.sources} />
                )}
                <MessageBubble role={message.role}>
                  {message.content}
                </MessageBubble>
              </React.Fragment>
            ))
          )}
          <div ref={messagesEndRef} />
        </MessagesContainer>

        <InputContainer onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Ask about movies..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
          />
          <SendButton type="submit" disabled={!input.trim() || isLoading}>
            <Send width={18} height={18} />
          </SendButton>
        </InputContainer>
      </PanelContainer>
  )
}