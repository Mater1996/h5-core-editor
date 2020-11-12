/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-12 16:41:16
 * @Description :
 */
import ShortcutButton from './shortcut-button'
import UsageTip from './usage-tip'
import LoadNpmPlugins from './load-npm-plugins.vue'
import langMixin from '@/mixins/i18n'
import dragMixin from '@/mixins/drag'
import pluginsControl from '@/plugins'
import { Row, Col } from 'ant-design-vue'

export default {
  name: 'shotcuts-panel',
  components: {
    [Row.name]: Row,
    [Col.name]: Col
  },
  mixins: [langMixin, dragMixin],
  data: () => ({
    npmPackages: []
  }),
  methods: {
    clone(shortcutItem) {
      this.$emit('add', shortcutItem)
    }
  },
  render(h) {
    return (
      <a-row style="padding-bottom: 24px">
        <UsageTip />
        {[]
          .concat(pluginsControl.getPlugins(), this.npmPackages)
          .filter(plugin => plugin.visible)
          .map(plugin => (
            <a-col span={12} style={{ marginTop: '10px' }}>
              <ShortcutButton
                clickFn={this.clone.bind(this, plugin)}
                mousedownFn={this.handleDragStartFromMixin.bind(this, plugin)}
                title={plugin.i18nTitle[this.currentLang] || plugin.title}
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
