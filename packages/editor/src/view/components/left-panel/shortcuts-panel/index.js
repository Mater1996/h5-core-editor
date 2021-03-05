/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-18 09:35:11
 * @LastEditTime: 2021-03-05 16:39:32
 * @Description :
 */
import lubanH5 from 'luban-h5'
import './index.scss'
import Collapse from '../../../../components/collapse'
import ShortcutButton from './shortcut-button'

export default {
  name: 'ShotcutsPanel',
  props: {
    dropTarget: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      canDrop: false
    }
  },
  mounted () {
    const $dropTarget = this.$dropTarget = document.querySelector(this.dropTarget)
    $dropTarget.addEventListener('dragleave', this._handleDragLeave)
    $dropTarget.addEventListener('dragover', this._preventDrop)
  },
  beforeDestroy () {
    const $dropTarget = this.$dropTarget
    $dropTarget.removeEventListener('dragleave', this._handleDragLeave)
    $dropTarget.removeEventListener('dragover', this._preventDrop)
  },
  methods: {
    _handleDragLeave (e) {
      if (!(e.path.indexOf(this.$dropTarget) > -1)) this.canDrop = false
    },
    _triggerAdd (data) {
      this.$emit('add', data)
    },
    _handleDragEnd (e, plugin) {
      if (this.canDrop) {
        const $dropTarget = this.$dropTarget
        const { left, top } = $dropTarget.getBoundingClientRect()
        const { clientX, clientY, target } = e
        this._triggerAdd({
          pluginName: plugin.name,
          style: {
            left: clientX - left - target.clientWidth / 2,
            top: clientY - top - target.clientHeight / 2
          }
        })
      }
      this.canDrop = false
      document.removeEventListener('dragover', this._preventDrop, false)
    },
    _preventDrop (event) {
      this.canDrop = true
      event.preventDefault()
    }
  },
  render () {
    const plugins =
      lubanH5.plugin.getPlugins().filter(plugin => plugin.visible) || []
    return (
      <div class="shortcuts-panel">
        <Collapse>
          <Collapse.Item title="普通" show={true}>
            <div class="flex flex-row flex-wrap justify-between">
              {plugins.map(plugin => (
                <ShortcutButton
                  draggable="true"
                  name={plugin.title || plugin.name}
                  icon={plugin.icon}
                  disabled={plugin.disabled}
                  onClick={() => this._triggerAdd({ pluginName: plugin.name })}
                  onDragend={(e) => this._handleDragEnd(e, plugin)}
                />
              ))}
              {plugins.length % 2 !== 0 && <ShortcutButton class="invisible" />}
            </div>
          </Collapse.Item>
        </Collapse>

      </div>
    )
  }
}
