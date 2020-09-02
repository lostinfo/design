<template>
  <div>
    <div class="zent-design-component-image-ad-preview"
         :class="size == 1 ? 'zent-design-component-image-ad-preview--large' : 'zent-design-component-image-ad-preview--small'">
      <a class="zent-design-component-image-ad-preview__image" target="_blank" rel="noopener noreferrer"
         v-for="(item, index) in images" :key=index>
        <div class="zent-design-component-image-ad-preview__image-img">
          <img
              :src="item.imageUrl" alt="hhhh">
          <div class="zent-design-component-image-ad-preview__image-title">{{ item.linkTitle }}</div>
        </div>
      </a>
    </div>
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
      required: true,
    },
    size: {
      type: Number,
      required: true,
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