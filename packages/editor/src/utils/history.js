/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-17 14:57:05
 * @LastEditTime: 2020-12-21 16:40:09
 * @Description :
 */
import { Seq } from 'immutable'

function fromJSGreedy (js) {
  if (typeof js !== 'object' || js === null) return js
  const jsMap = Seq(js).map(fromJSGreedy)
  return Array.isArray(js) ? jsMap.toList() : jsMap.toMap()
}
class UndoRedoHistory {
  state
  history = []
  currentIndex = 0

  init (state) {
    this.history = [fromJSGreedy(state)]
  }

  addState (state) {
    const { history, currentIndex } = this
    const currentState = history[currentIndex] || {}
    const nextIndex = currentIndex + 1
    if (nextIndex < history.length) history.splice(nextIndex)
    this.currentIndex = nextIndex
    history[nextIndex] = currentState.merge(fromJSGreedy(state))
  }

  undo () {
    const { currentIndex } = this
    const prevIndex = Math.max(currentIndex - 1, 0)
    const prevState = this.history[prevIndex].toJS()
    this.currentIndex = prevIndex
    return prevState
  }

  redo () {
    const { history, currentIndex } = this
    const nextIndex = Math.min(history.length - 1, currentIndex + 1)
    const nextState = this.history[nextIndex].toJS()
    this.currentIndex = nextIndex
    return nextState
  }
}

export default new UndoRedoHistory()
