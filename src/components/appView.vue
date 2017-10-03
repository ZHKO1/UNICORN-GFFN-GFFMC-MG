<template>
  <div class="appView">
    <div>{{msg}}</div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'appView',
  data () {
    return {
      msg: 'view'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.appView{
  position: relative;
  z-index: 2;
}
</style>
