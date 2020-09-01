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
        <div class="zent-design-editor__control-group-label">空白高度:</div>
        <div class="zent-design-editor__control-group-control">
          <el-slider v-model="height" :min="1" :max="200" :step="1" @format-tooltip="formatTooltip"
                     @change="heightChange"></el-slider>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WhiteSpaceEditor",
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      backgroundColor: this.value.backgroundColor || '#FFFFFF',
      height: this.value.height || 20,
    }
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
    heightChange(value) {
      this.$emit('change', 'height', value)
    }
  },
}
</script>

<style scoped>

</style>