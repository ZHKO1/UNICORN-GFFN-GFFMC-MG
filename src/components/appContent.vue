<template>
  <div class="content">
    <layer></layer>
  </div>
</template>

<script>
import Hammer from "hammerjs"
import Layer from './Layer'
export default {
  name: 'appContent',
  data () {
    return {
      msg: 'SHIT'
    }
  },
  components: {
    Layer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
