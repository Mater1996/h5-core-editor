/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-16 15:11:01
 * @LastEditTime : 2020-11-19 11:03:20
 * @Description :
 */

import { propsType } from 'luban-h5-plugins'
import LbpPlugin from './LbpPlugin'

class LbpPluginController {
  constructor ({ plugins = [] } = []) {
    this._plugins = []
    this._pluginsMap = {}
    plugins.forEach(v => this.registerPlugin(v))
  }

  registerPlugin (option = {}) {
    const plugin = new LbpPlugin(option)
    if (plugin) {
      this._plugins.push(plugin)
      this._pluginsMap[plugin.getName()] = plugin
    }
  }

  getPlugins () {
    return this._plugins
  }

  getPluginsMap () {
    return this._pluginsMap
  }

  getPlugin (name) {
    return this.getPluginsMap()[name]
  }
}

LbpPluginController.propsType = propsType

export default LbpPluginController
