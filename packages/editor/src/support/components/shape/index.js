/*
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2021-02-25 14:31:56
 * @Description: 组件盒模型编辑器，例如width，height，padding，border，outline，margin等
 */

export default {
  name: 'LubanSupportShape',
  props: {
    value: {
      type: Object,
      default: () => ({})
    }
  },
  render () {
    return <div>
      <div class="margin">
        <div class="outline">
          <div class="border">
            <div class="padding">
              <div class="box"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}
