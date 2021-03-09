<!--
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2020-11-02 09:25:51
 * @LastEditTime: 2021-03-09 15:51:27
 * @Description:
-->
<template>
  <div id="app">
    <LubanH5Editor :h5="work" ref="editor" style="height: 100vh;" />
  </div>
</template>

<script>
// @ is an alias to /src";
import lubanH5 from 'luban-h5'
export default {
  name: 'app',
  data() {
    return {
      work: lubanH5.create(
        {
          id: '3c31d1a0-0c91-4448-bf0a-9510b5b34be3',
          title: '标题',
          description: '描述',
          pages: [
            {
              title: '',
              elements: [
                {
                  pluginName: 'lbp-picture',
                  props: {
                    fillType: 'contain',
                    imgSrc:
                      'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg!0x0.webp',
                    isRem: false,
                  },
                  style: {
                    top: 0,
                    left: 0,
                    width: 186,
                    height: 292,
                  },
                },
                {
                  pluginName: 'lbp-rate',
                  subDataSource: ['rateComponentDataSource.rate'],
                  props: {
                    fillType: 'contain',
                    imgSrc:
                      'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg!0x0.webp',
                    isRem: false,
                  },
                  style: {
                    top: 0,
                    left: 0,
                  },
                },
              ],
            },
          ],
        },
        {
          data: {
            rateComponentDataSource: {
              rate: 1,
            },
          },
        }
      ),
    }
  },
  components: {},
}
</script>
