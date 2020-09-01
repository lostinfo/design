<template>
  <div :style="{backgroundColor: backgroundColor, height: height + 'px'}"></div>
</template>

<script>
export default {
  name: "WhiteSpacePreview",
  props: {
    backgroundColor: {
      type: String,
      required: true,
    },
    height: {
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