/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-18 09:35:11
 * @LastEditTime : 2020-11-19 10:35:25
 * @Description :
 */
import ShortcutButton from './shortcut-button'
import UsageTip from './usage-tip'
import LoadNpmPlugins from './load-npm-plugins.vue'
import dragMixin from './mixins/drag'
import lbpH5Plugins from '@/plugins'
import { Row, Col } from 'ant-design-vue'

export default {
  name: 'shotcuts-panel',
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  mixins: [dragMixin],
  data: () => ({
    npmPackages: []
  }),
  methods: {
    clone (shortcutItem) {
      this.$emit('add', shortcutItem)
    }
  },
  render (h) {
    return (
      <a-row style="padding-bottom: 24px">
        <UsageTip />
        {[]
          .concat(lbpH5Plugins.getPlugins(), this.npmPackages)
          .filter(plugin => plugin.visible)
          .map(plugin => (
            <a-col span={12} style={{ marginTop: '10px' }}>
              <ShortcutButton
                clickFn={this.clone.bind(this, plugin)}
                mousedownFn={this.handleDragStartFromMixin.bind(this, plugin)}
                name={plugin.title || plugin.name}
                faIcon={plugin.icon}
                disabled={plugin.disabled}
              />
            </a-col>
          ))}
        <LoadNpmPlugins
          onLoadComplete={npmPackages => {
            this.npmPackages = npmPackages
          }}
        />
      </a-row>
    )
  }
}
