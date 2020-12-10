/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-11 19:49:25
 * @LastEditTime : 2020-12-03 15:07:48
 * @Description :
 */
import PropTypes from './PropTypes'
import _plugins from './plugins/_plugins'
import LbpPluginController from './LbpPluginController'

const lbpPluginController = new LbpPluginController({
  plugins: _plugins
})

export { PropTypes }
export default lbpPluginController
