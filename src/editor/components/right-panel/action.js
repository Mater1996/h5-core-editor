/*
 * @author : Mater
 * @Email : bxh8640@gmail.com
 * @Date : 2020-11-02 16:12:09
 * @LastEditTime : 2020-11-04 14:27:58
 * @Description :
 */
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({}),
  computed: {
    ...mapState('editor', ['editingElement'])
  },
  methods: {
    ...mapActions('editor', ['setEditingElement'])
  },
  render() {
    const ele = this.editingElement
    if (!ele) return <span>{this.$t('editor.editPanel.common.empty')}</span>
    return <div>TODO</div>
  }
}
