/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-17 14:57:05
 * @LastEditTime : 2020-11-18 14:28:05
 * @Description :
 */
import { Seq } from 'immutable'

function fromJSGreedy (js) {
  return typeof js !== 'object' || js === null
    ? js
    : Array.isArray(js)
      ? Seq(js)
        .map(fromJSGreedy)
        .toList()
      : Seq(js)
        .map(fromJSGreedy)
        .toMap()
}
class UndoRedoHistory {
  state
  history = []
  currentIndex = 0

  init (state) {
    this.state = fromJSGreedy(state)
    this.history = [this.state]
  }

  addState (state) {
    if (this.currentIndex + 1 < this.history.length) {
      this.history.splice(this.currentIndex + 1)
    }
    this.currentIndex++
    const newState = this.state.merge(fromJSGreedy(state))
    this.history.push(newState)
  }

  undo () {
    const prevIndex = Math.max(this.currentIndex - 1, 0)
    console.log(prevIndex)
    const prevState = this.history[prevIndex]
    this.currentIndex = prevIndex
    return prevState.toJS()
  }

  redo () {
    const nextIndex = Math.min(this.history.length - 1, this.currentIndex + 1)
    const nextState = this.history[nextIndex]
    this.currentIndex = nextIndex
    return nextState.toJS()
  }
}

export default new UndoRedoHistory()
