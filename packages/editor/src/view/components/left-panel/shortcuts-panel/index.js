/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-18 09:35:11
 * @LastEditTime: 2021-02-26 11:20:28
 * @Description :
 */
import lubanH5 from 'luban-h5'
import './index.scss'
import ShortcutButton from './shortcut-button'
import dragMixin from './mixins/drag'

export default {
  name: 'ShotcutsPanel',
  mixins: [dragMixin],
  methods: {
    clone (shortcutItem) {
      this.$emit('add', shortcutItem)
    }
  },
  render (h) {
    const plugins =
      lubanH5.plugin.getPlugins().filter(plugin => plugin.visible) || []
    const needEmptyButton = plugins.length % 2 !== 0
    return (
      <div class="shortcuts-panel flex flex-row flex-wrap justify-between">
        {plugins.map(plugin => (
          <ShortcutButton
            clickFn={this.clone.bind(this, plugin)}
            mousedownFn={this.handleDragStartFromMixin.bind(this, plugin)}
            name={plugin.title || plugin.name}
            faIcon={plugin.icon}
            disabled={plugin.disabled}
          />
        ))}
        {needEmptyButton && <ShortcutButton class="invisible" />}
      </div>
    )
  }
}
