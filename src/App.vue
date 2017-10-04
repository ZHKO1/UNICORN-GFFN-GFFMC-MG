<template>
  <div id="app">
    <app-nav></app-nav>
    <app-view>
      <app-sidebar></app-sidebar>
      <app-content></app-content>
    </app-view>
    <div class="bg" style="background-position-y: 0px;"></div>
  </div>
</template>

<script>
  import Hammer from "hammerjs"
  import appNav from './components/appNav'
  import appView from './components/appView'
  import appSidebar from './components/appSidebar'
  import appContent from './components/appContent'
  export default {
    methods: {

    },
    components: {
      appNav,
      appView,
      appSidebar,
      appContent
    },

  }
</script>

<style lang="less">
  body {
    margin: 0px;
    padding: 0px;
    min-widh: 840px;
    min-height: 600px;
  }
  .bg {
    background: url(./images/bg.png) no-repeat center top;
    position: fixed;
    height: 100%;
    bottom: 10%;
    right: 0;
    left: 0;
    top: 0;
    z-index: 0;
  }

  .main {
    position: relative;
    width: 100%;
    margin: 0px;
    padding: 0px;
    #origin {
      position: absolute;
      width: 1024px;
      top: 0px;
      z-index: 1;
      img {
        width: 100%;
        display: block;
      }
    }
    #gffn {
      position: absolute;
      width: 464px;
      top: 0px;
      left: 22px;
      z-index: 2;
      opacity: 1;
      img {
        width: 100%;
        display: block;
      }
    }
    #mc {
      display: none;
      position: absolute;
      width: 1024px;
      img {
        width: 100%;
        display: block;
      }
    }
  }
</style>
