import theme from '../theme'
import lodashGet from 'lodash.get'

const get = value => {
  try {
    const res = lodashGet(theme, value)
    return res?.DEFAULT || res
  } catch (err) {
    return value
  }
}

export default get
