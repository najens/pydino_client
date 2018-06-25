import thunk from 'redux-thunk'
import logger from './logger'
import { applyMiddleware } from 'redux'

// Combines all middleware that
// will be passed to the store
export default applyMiddleware(
  thunk,
  logger
)
