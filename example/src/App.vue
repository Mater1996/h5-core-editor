<!--
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2020-11-02 09:25:51
 * @LastEditTime: 2020-11-03 10:12:43
 * @Description:
-->
<template>
  <div id="app">
    <CoreEditor :work="work" ref="editor" style="height: 100vh"/>
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
            uuid: 1602484481828,
            title: '',
            elements: [
              {
                name: 'lbp-background',
                uuid: 1602484481828,
                pluginProps: {
                  uuid: 1602484481828,
                  imgSrc: '',
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                },
                commonStyle: {
                  top: 100,
                  left: 100,
                  width: 100,
                  height: 40,
                  textAlign: 'center',
                  color: '#000000',
                  backgroundColor: 'rgba(255, 255, 255, 0)',
                  fontSize: 14
                },
                events: [],
                animations: [],
                isRem: false
              },
              {
                name: 'lbp-video',
                uuid: 1602484483861,
                pluginProps: {
                  uuid: 1602484483861,
                  src:
                    'http://localhost:1337/uploads/419a4b0c60f9488c9d44c398dc987471.mp4',
                  disabled: false,
                  useIframe: false,
                  iframeSrc: '按钮'
                },
                commonStyle: {
                  top: 100,
                  left: 100,
                  width: 100,
                  height: 40,
                  textAlign: 'center',
                  color: '#000000',
                  backgroundColor: 'rgba(255, 255, 255, 0)',
                  fontSize: 14
                },
                events: [],
                animations: [],
                isRem: false
              },
              {
                name: 'lbp-picture',
                uuid: 1602484484973,
                pluginProps: {
                  uuid: 1602484484973,
                  imgSrc: '',
                  fillType: 'contain'
                },
                commonStyle: {
                  top: 140,
                  left: 57,
                  width: 186,
                  height: 292,
                  textAlign: 'center',
                  color: '#000000',
                  backgroundColor: 'rgba(255, 255, 255, 0)',
                  fontSize: 14
                },
                events: [],
                animations: [],
                isRem: false
              }
            ]
          }
        ],
        is_publish: 0,
        is_template: 0,
        created_at: '2020-10-12T06:34:41.000Z',
        updated_at: '2020-10-28T01:24:23.000Z',
        height: 568,
        page_mode: 'h5_swipper'
      }
    }
  },
  components: {}
}
</script>
