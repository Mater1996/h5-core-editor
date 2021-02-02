/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-18 09:35:11
 * @LastEditTime: 2021-01-21 10:08:20
 * @Description :
 */
import { LbpPlugin } from 'luban-h5'
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
    return (
      <div class="shortcuts-panel">
        {LbpPlugin.getPlugins()
          .filter(plugin => plugin.visible)
          .map(plugin => (
            <ShortcutButton
              clickFn={this.clone.bind(this, plugin)}
              mousedownFn={this.handleDragStartFromMixin.bind(this, plugin)}
              name={plugin.title || plugin.name}
              faIcon={plugin.icon}
              disabled={plugin.disabled}
            />
          ))}
      </div>
    )
  }
}
