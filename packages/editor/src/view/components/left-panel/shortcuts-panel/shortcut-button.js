export default {
  name: 'ShortcutButton',
  props: {
    faIcon: {
      type: String
    },
    name: {
      type: String
    },
    clickFn: {
      type: Function,
      default: () => {}
    },
    mousedownFn: {
      type: Function,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render () {
    return (
      <button
        class="shortcut-button cursor-pointer flex flex-grow flex-col justify-center items-center w-5/12 h-16 mx-1 my-2 border border-dotted border-white bg-gray-50 text-gray-600 select-none"
        onClick={this.clickFn}
        onMousedown={this.mousedownFn}
        disabled={this.disabled}
      >
        <div
          class={['shortcut-icon fa p-1', `fa-${this.faIcon}`]}
          aria-hidden="true"
        />
        <span class="text-xs">{this.name}</span>
      </button>
    )
  }
}
