export default {
  name: 'ShortcutButton',
  props: {
    faIcon: {
      type: String
    },
    name: {
      type: String
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
        disabled={this.disabled}
        on={this.$listeners}
      >
        <div
          class={['shortcut-icon fa p-1 pointer-events-none', `fa-${this.faIcon}`]}
          aria-hidden="true"
        />
        <span class="text-xs pointer-events-none">{this.name}</span>
      </button>
    )
  }
}
