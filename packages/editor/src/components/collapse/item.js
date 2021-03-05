export default {
  name: 'FishCollapseItem',
  props: {
    show: { type: Boolean },
    title: { type: String },
    label: { type: String }
  },
  data () {
    return {
      showTemp: this.show
    }
  },
  methods: {
    clickTitleHandler () {
      this.showTemp = !this.showTemp
      this.$emit('change', !this.showTemp)
    }
  },
  render () {
    return (
      <div class={['item', { active: this.showTemp }]}>
        <div
          class="title text-sm h-10 leading-10 px-2 cursor-pointer flex flex-row justify-between items-center"
          onClick={this.clickTitleHandler}
        >
          <span>{this.title}</span>
          <i class="fa fa-chevron-down text-xs"></i>
        </div>
        <div class="content">{this.$slots.default}</div>
      </div>
    )
  }
}
