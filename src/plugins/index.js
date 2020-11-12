/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-11 19:49:25
 * @LastEditTime : 2020-11-12 16:43:34
 * @Description :
 */

import LbpPlugin from '../editor/models/plugin'
import plugins from './_plugins'

class PluginController {
  constructor() {
    this._plugins = []
    this._pluginsMap = {}
  }

  registerPlugin(option = {}) {
    if (!option.name) return
    const plugin = new LbpPlugin(option)
    this._plugins.push(plugin)
    this._pluginsMap[plugin['name']] = plugin
  }

  getPlugins() {
    return this._plugins
  }

  getPluginsMap() {
    return this._pluginsMap
  }

  getPlugin(name) {
    return this.getPluginsMap()[name]
  }
}

const pluginController = new PluginController()

plugins.forEach(v => pluginController.registerPlugin(v))

export default pluginController
