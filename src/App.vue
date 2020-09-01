<template>
  <div id="app">
    <Design></Design>
  </div>
</template>

<script>
import Design from "@/design"

export default {
  name: 'App',
  components: {
    Design
  }
}
</script>

<style>
@import "design/styles/index.css";
@import "design/styles/config.css";
</style>
