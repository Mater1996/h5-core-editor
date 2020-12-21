/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-16 15:11:01
 * @LastEditTime : 2020-11-19 11:03:20
 * @Description :
 */

import LbpPlugin from './LbpPlugin'

class LbpPluginController {
  constructor ({ plugins = [] } = []) {
    this._plugins = []
    this._pluginsMap = {}
    plugins.forEach(v => this.registerPlugin(v))
  }

  register (option = {}) {
    // TODO support system-js module register
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
    // TODO system import and cache plugin
    // typeof this.getPluginsMap()[name].component === url
    // trans component field to system.import(url) and resolve plugin option
    return this.getPluginsMap()[name]
  }
}

export default new LbpPluginController()
