<!--
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2020-11-02 09:25:51
 * @LastEditTime: 2021-01-15 11:23:50
 * @Description:
-->
<template>
  <div id="app">
    <!-- <lbp-h5-preview :data="work"></lbp-h5-preview> -->
    <lbp-h5-editor :data="work" ref="editor" style="height: 100vh;" />
  </div>
</template>

<script>
// @ is an alias to /src";

export default {
  name: 'app',
  data() {
    return {
      work: {
        id: '3c31d1a0-0c91-4448-bf0a-9510b5b34be3',
        title: '标题',
        description: '描述',
        cover_image_url: null,
        pages: [
          {
            title: '',
            elements: [
              {
                pluginName: 'lbp-picture',
                props: {
                  imgSrc:
                    'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg!0x0.webp',
                  isRem: false,
                },
                style: {
                  fillType: 'contain',
                  top: 0,
                  left: 0,
                  width: 186,
                  height: 292,
                  textAlign: 'center',
                  color: '#000000',
                  backgroundColor: 'rgba(255, 255, 255, 0)',
                  fontSize: 14,
                },
              },
            ],
          },
        ],
        is_publish: 0,
        is_template: 0,
        created_at: '2020-10-12T06:34:41.000Z',
        updated_at: '2020-10-28T01:24:23.000Z',
        page_mode: 'h5_swipper',
      },
    }
  },
  components: {},
}
</script>
