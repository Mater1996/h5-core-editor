/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-16 15:11:01
 * @LastEditTime: 2021-03-03 14:34:24
 * @Description :
 */

import LubanPlugin from './LubanPlugin'

class LubanPluginController {
  constructor ({ plugins = [] } = []) {
    this._plugins = []
    this._pluginsMap = {}
    plugins.forEach(v => this.registerPlugin(v))
  }

  register (option = {}) {
    // TODO support system-js module register
    const plugin = new LubanPlugin(option)
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

const lubanPluginController = new LubanPluginController()

export default lubanPluginController
