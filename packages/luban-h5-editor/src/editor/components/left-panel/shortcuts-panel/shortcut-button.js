export default {
  name: 'ShortcutButton',
  functional: true,
  props: {
    faIcon: {
      required: true,
      type: String
    },
    name: {
      required: true,
      type: String
    },
    clickFn: {
      required: false,
      type: Function,
      default: () => {}
    },
    mousedownFn: {
      required: false,
      type: Function,
      default: () => {}
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  render: (h, { props, listeners, slots }) => {
    return (
      <button
        class="shortcut-button"
        onClick={props.clickFn}
        onMousedown={props.mousedownFn}
        disabled={props.disabled}
      >
        <div
          class={['shortcut-icon', 'fa', `fa-${props.faIcon}`]}
          aria-hidden='true'
        />
        <span>{ props.name }</span>
      </button>
    )
  }
}
