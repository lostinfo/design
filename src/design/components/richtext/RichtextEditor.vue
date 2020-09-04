<template>
  <div class="zent-design-component-line-editor">
    <div class="zent-design-editor__control-group">
      <div class="zent-design-editor__control-group-container">
        <div class="zent-design-editor__control-group-label">背景颜色:</div>
        <div class="zent-design-editor__control-group-control">
          <el-color-picker v-model="backgroundColor" @change="backgroundColorChange"></el-color-picker>
        </div>
      </div>
    </div>
    <div class="zent-design-editor__control-group">
      <div class="zent-design-editor__control-group-container">
        <div class="zent-design-editor__control-group-label">是否全屏:</div>
        <div class="zent-design-editor__control-group-control">
          <el-checkbox v-model="fullscreen" @change="fullscreenChange">全屏显示</el-checkbox>
        </div>
      </div>
    </div>
    <div class="zent-design-editor__control-group">
      <div class="zent-design-component-richtext">
        <editor :content="content" :editor-config="{initialFrameWidth: 386,initialFrameHeight: 600}"
                @change="contentChange"></editor>
      </div>
    </div>
  </div>
</template>

<script>
import editor from './editor';

export default {
  name: "RichTextEditor",
  props: {
    value: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      backgroundColor: this.value.backgroundColor || '#FFFFFF',
      fullscreen: this.value.fullscreen || false,
      content: this.value.content || '',
    }
  },
  components: {
    editor,
  },
  created() {

  },
  mounted() {

  },
  methods: {
    formatTooltip(value) {
      return value + 'px'
    },
    backgroundColorChange(value) {
      this.$emit('change', 'backgroundColor', value)
    },
    fullscreenChange(value) {
      this.$emit('change', 'fullscreen', value)
    },
    contentChange(value) {
      this.$emit('change', 'content', value)
    },
  },
}
</script>

<style scoped>

</style>