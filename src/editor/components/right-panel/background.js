/*
 * @Author: ly525
 * @Date: 2019-12-01 18:11:49
 * @LastEditors : Please set LastEditors
 * @LastEditTime : 2020-11-12 16:43:02
 * @FilePath: /luban-h5/front-end/h5/src/components/@/editor/right-panel/background.js
 * @Github: https://github.com/ly525/luban-h5
 * @Description: Do not edit
 * @Copyright 2018 - 2020 luban-h5. All Rights Reserved
 */

import { Radio, Form } from 'ant-design-vue'
import { PAGE_MODE, PAGE_MODE_LABEL } from '@/constants/work'

export default {
  components: {
    [Form.name]: Form,
    [Form.Item.name]: Form.Item,
    [Radio.Group.name]: Radio.Group,
    [Radio.Button.name]: Radio.Button
  },
  data() {
    return {
      formLayout: 'vertical',
      PAGE_MODE: Object.freeze(PAGE_MODE),
      PAGE_MODE_LABEL: Object.freeze(PAGE_MODE_LABEL)
    }
  },
  computed: {
    pageMode: {
      get() {
        return this.work.page_mode || PAGE_MODE.SWIPPER_PAGE
      },
      set(pageMode) {
        this.updateWork({ page_mode: pageMode })
      }
    }
  },
  render() {
    return (
      <div>
        <a-form layout={this.formLayout}>
          <a-form-item label="H5类型">
            <a-radio-group v-model={this.pageMode} size="small">
              {PAGE_MODE.map((v, k) => {
                return (
                  <a-radio-button key={k} value={v}>
                    {PAGE_MODE_LABEL[k]}
                  </a-radio-button>
                )
              })}
            </a-radio-group>
          </a-form-item>
        </a-form>
      </div>
    )
  }
}
