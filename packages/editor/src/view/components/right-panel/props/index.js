import support from '../../../../support'
import './index.scss'

export default {
  name: 'Props',
  data: () => ({
    loadCustomEditorFlag: false
  }),
  props: {
    layout: {
      type: String,
      default: 'horizontal'
    },
    config: {
      type: Object,
      default: () => ({})
    },
    value: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    triggerChange (changedValue = {}) {
      this.$emit('change', {
        ...this.value,
        ...changedValue
      })
    },
    handlePropChange (propName, e) {
      this.triggerChange({
        [propName]: e.target ? e.target.value : e
      })
    },
    renderPropFormItem (key, { name, props, label }) {
      if (!name) return null
      const value = this.value[key]
      const PropsEditor = support[name]
      return (
        <div class="props-config-form-item" key={key}>
          <label class="label">{label}:</label>
          <PropsEditor
            class="prop-editor"
            props={props}
            value={value}
            onChange={e => this.handlePropChange(key, e)}
          ></PropsEditor>
        </div>
      )
    }
  },
  render () {
    const configEntries = Object.entries(this.config)
    return (
      <div class="props-config-form">
        {configEntries.map(([key, value]) =>
          this.renderPropFormItem(key, value)
        )}
      </div>
    )
  }
}
