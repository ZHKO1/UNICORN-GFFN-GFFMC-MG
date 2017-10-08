<template>
  <div class="content">
    <layer v-for="item in Side" v-if="item.show" :pic="item.pic" :START_X="item.x" :START_Y="item.y" :zIndex="item.id" :key="item.id"></layer>
  </div>
</template>

<script>
import Hammer from "hammerjs"
import Layer from './Layer'
export default {
  name: 'appContent',
  data () {
    return {
    }
  },
  props: {
    Side: Array,
  },
  components: {
    Layer
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content{
    width: 90vw;
    height: 80vh;
    margin-top:calc(10vh - 30px);
    margin-left:5vw;
    position: relative;
    z-index: 1;
  }
</style>
