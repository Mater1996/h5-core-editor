/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-10-28 09:30:06
 * @LastEditTime : 2020-11-02 10:46:49
 * @Description :
 */
import { Dropdown, Menu, Icon } from 'ant-design-vue'

export default {
  components: {
    [Dropdown.name]: Dropdown,
    [Menu.name]: Menu,
    [Menu.Item.name]: Menu.Item,
    [Icon.name]: Icon
  },
  render () {
    const addPageText = this.$t('editor.pageManager.action.add')
    const copyPageText = this.$t('editor.pageManager.action.copy')
    const deletePageText = this.$t('editor.pageManager.action.delete')
    return (
      <a-dropdown trigger={['hover']} placement="bottomCenter">
        <a class="ant-dropdown-link" href="#" class="ml-2">
          <a-icon type="down" />
        </a>
        <a-menu
          slot="overlay"
          onClick={({ key }) => this.$emit('selectMenuItem', key)}
        >
          <a-menu-item key="add">
            <a-icon type="plus" />
            {addPageText}
          </a-menu-item>
          <a-menu-item key="copy">
            <a-icon type="copy" />
            {copyPageText}
          </a-menu-item>
          <a-menu-item key="delete">
            <a-icon type="delete" />
            {deletePageText}
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    )
  }
}
