import { createContext } from 'react'

// Define the shape of our context
interface SemanticRatioContextType {
  semanticRatio: number
  setSemanticRatio: (value: number) => void // eslint-disable-line no-unused-vars
}

// Create the context with a default value
const defaultValue: SemanticRatioContextType = {
  semanticRatio: 0, // default value
  setSemanticRatio: () => {}, // placeholder function
}

// Create the context
const SemanticRatioContext =
  createContext<SemanticRatioContextType>(defaultValue)

// Export the context to be used by consumer components
export default SemanticRatioContext
