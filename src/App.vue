<template>
  <div id="app">
    <app-nav></app-nav>
    <app-view>
      <app-sidebar :SideLi="SideLi"></app-sidebar>
      <app-content :Side="SideLi"></app-content>
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
    data () {
      return {
        showSide: false,
        SideLi: [
          {id:0, name:"FIX G.F.F.N ArtWork", pic:"./static/images/content/GFFN_ArtWork.jpg", show: true},
          {id:1, name:"FIX G.F.F.N Toy", pic:"./static/images/content/GFFN.png", show: true},
          {id:2, name:"FIX MC  ArtWork", pic:"./static/images/content/MC_ArtWork.jpg"},
          {id:3, name:"FIX MC  Toy", pic:"./static/images/content/MC.jpg"},
          {id:4, name:"MG Ver.Ka  ArtWork"},
          {id:5, name:"MG Ver.Ka  Toy"},
        ]
      }
    },
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
    min-width: 900px;
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
