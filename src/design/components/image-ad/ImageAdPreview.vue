<template>
  <div>
    <img :src="item" alt="" v-for="(item, index) in images" :key="index" style="width: 100%;height: auto;">
    <div v-if="images.length < 1"
         class="zent-design-component-image-ad-preview zent-design-component-image-ad-preview--no-data">点击编辑图片广告
    </div>
  </div>
</template>

<script>
export default {
  name: "ImageAdPreview",
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  data() {
    return {}
  },
  created() {

  },
  mounted() {

  },
  methods: {},
}
</script>

<style scoped>

</style>