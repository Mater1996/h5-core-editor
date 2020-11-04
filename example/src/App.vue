<!--
 * @author: Mater
 * @Email: bxh8640@gmail.com
 * @Date: 2020-11-02 09:25:51
 * @LastEditTime: 2020-11-04 10:28:09
 * @Description:
-->
<template>
  <div id="app">
    <CoreEditor :work="work" ref="editor" style="height: 100vh" />
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
        pages: [],
        is_publish: 0,
        is_template: 0,
        created_at: '2020-10-12T06:34:41.000Z',
        updated_at: '2020-10-28T01:24:23.000Z',
        page_mode: 'h5_swipper'
      }
    }
  },
  components: {}
}
</script>
