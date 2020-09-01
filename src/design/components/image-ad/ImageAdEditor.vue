<template>
  <div>
    ImageAdEditor
  </div>
</template>

<script>
export default {
  name: "ImageAdEditor",
  props: {
    value: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      images: this.value.images || []
    }
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