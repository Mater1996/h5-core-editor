
export default {
  name: 'Tab',
  props: {
    id: { default: null },
    name: { required: true },
    prefix: { default: '' },
    suffix: { default: '' },
    isDisabled: { default: false }
  },

  data: () => ({
    isActived: false,
    isActive: false,
    isVisible: true
  }),
  watch: {
    isActive (newValue) {
      if (newValue) this.isActived = true
    }
  },
  computed: {
    header () {
      return this.prefix + this.name + this.suffix
    },

    computedId () {
      return this.id ? this.id : this.name.toLowerCase().replace(/ /g, '-')
    },

    hash () {
      if (this.isDisabled) {
        return '#'
      }

      return '#' + this.computedId
    }
  },
  render () {
    return <section
      v-show={this.isActive}
      aria-hidden={!this.isActive}
      class="tabs-component-panel"
      id={this.computedId}
      role="tabpanel"
    >
      {
        this.isActived && this.$slots.default
      }
    </section>
  }
}
