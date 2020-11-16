/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-11 19:49:25
 * @LastEditTime : 2020-11-16 15:18:02
 * @Description :
 */

import _plugins from './_plugins'
import LbpPluginController from './LbpPluginController'

const lbpPluginController = new LbpPluginController({
  plugins: _plugins
})

export default lbpPluginController
