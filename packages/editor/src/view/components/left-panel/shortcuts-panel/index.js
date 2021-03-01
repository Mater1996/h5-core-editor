/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-18 09:35:11
 * @LastEditTime: 2021-03-01 18:40:40
 * @Description :
 */
import lubanH5 from 'luban-h5'
import './index.scss'
import ShortcutButton from './shortcut-button'

export default {
  name: 'ShotcutsPanel',
  mounted () {

  },
  methods: {
    _handleDragEnd (e, plugin) {
      this.$emit('add', {
        pluginName: plugin.name,
        style: {
          left: e.screenX,
          top: e.screenY
        }
      })
      document.removeEventListener('dragover', this._preventDrop, false)
    },
    _handleDragStart () {
      document.addEventListener('dragover', this._preventDrop, false)
    },
    _preventDrop (event) {
      event.preventDefault()
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
            draggable="true"
            // clickFn={this.clone.bind(this, plugin)}
            name={plugin.title || plugin.name}
            faIcon={plugin.icon}
            disabled={plugin.disabled}
            onDragstart={this._handleDragStart}
            onDragend={(e) => this._handleDragEnd(e, plugin)}
          />
        ))}
        {needEmptyButton && <ShortcutButton class="invisible" />}
      </div>
    )
  }
}
