/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-16 15:11:01
 * @LastEditTime : 2020-11-16 15:18:21
 * @Description :
 */

import LbpPlugin from './LbpPlugin'

class LbpPluginController {
  constructor ({ plugins = [] } = []) {
    this._plugins = []
    this._pluginsMap = {}
    plugins.forEach(v => this.registerPlugin(v))
  }

  registerPlugin (option = {}) {
    if (!option.name) return
    const plugin = new LbpPlugin(option)
    this._plugins.push(plugin)
    this._pluginsMap[plugin.name] = plugin
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

export default LbpPluginController
