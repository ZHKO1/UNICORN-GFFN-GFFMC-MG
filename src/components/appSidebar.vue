<template>
  <div class="appSideBar" ref="sideBar">
    <div class="switchSideBarButton" :class="{'hide' : showSide}" @click.prevent="toggleSideBar">
      <img src="./../images/sideBar.gif" alt="" />
    </div>
    <div class="main" :class="{'show' : showSide}">
      <ul id="List">
        <li v-for="(item, index) in SideLi">{{item.name}}<i class="fa"  @click.prevent="toggleLi(index)" :class="{'fa-check' : item.show}"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import {mapMutations, mapState, mapGetters} from 'vuex'
import slipjs from 'slipjs'

export default {
  name: 'appSideBar',
  data () {
    return {
      showSide: false,
    }
  },
  methods: {
    toggleSideBar(){
      this.showSide = !this.showSide;
    },
    toggleLi(id) {
      this.$store.commit('toggleSide', id)
    },
    ...mapMutations([
      'toggleSide'
    ])
  },
  computed: {
    ...mapState({
      SideLi: state => state.SideService.SideLi,
    })
  },
  mounted () {
    var that = this;
    document.addEventListener('click', (e) => {
      if (!that.$refs.sideBar.contains(e.target)){
        that.showSide = false;
      }
    });
    var ol = document.getElementById('List');
    ol.addEventListener('slip:beforereorder', function(e){
      if (/demo-no-reorder/.test(e.target.className)) {
        e.preventDefault();
      }
    }, false);
    ol.addEventListener('slip:beforeswipe', function(e){
      if (e.target.nodeName == 'INPUT' || /demo-no-swipe/.test(e.target.className)) {
        e.preventDefault();
      }
    }, false);
    ol.addEventListener('slip:beforewait', function(e){
      if (e.target.className.indexOf('instant') > -1) e.preventDefault();
    }, false);
    ol.addEventListener('slip:afterswipe', function(e){
      e.target.parentNode.appendChild(e.target);
    }, false);
    ol.addEventListener('slip:reorder', function(e){
      that.$store.commit('reorderSide', {
        originalIndex: e.detail.originalIndex,
        spliceIndex: e.detail.spliceIndex,
      });

      // And update the DOM:
      //e.target.parentNode.insertBefore(e.target, e.detail.insertBefore);
      return false;
    }, false);

    new Slip(ol);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped rel="stylesheet/less" lang="less">
@import "./../lib/style/font-awesome/css/font-awesome.css";
.appSideBar{
  position: relative;
  z-index: 3;
  .switchSideBarButton{
    position: fixed;
    left: 0px;
    top: 150px;
    width: 180px;
    height:50px;
    cursor: pointer;
    opacity: 1;
    transition: .3s;
    img{
      display: block;
      width: 100%;
    }
    &.hide{
       opacity: 0;
    }
  }

  .main{
    transition: .3s;
    position: fixed;
    width: 280px;
    height: 80vh;
    background: rgba(255, 255, 255, 0.8);
    left: -280px;
    font-family: 'Lucida Grande','Hiragino Kaku Gothic Pro','ヒラギノ角ゴ Pro W3','ＭＳ Ｐゴシック', sans-serif;
    font-weight: normal;
    color: #222;
    ul{
      clear: left;
      margin: 1em;
      padding: 0 0 1px;
      li{
        position: relative;
        user-select: none;
        -moz-user-select: none;
        -webkit-user-select: none;
        cursor: default;
        display: block;
        border: 1px solid black;
        background: white;
        margin: 0;
        padding: 0 1em;
        border-radius: 3px;
        margin-bottom: -1px;
        max-width: 100%;
        line-height: 3;
        vertical-align: middle;
        cursor: pointer;
        i{
          position: absolute;
          width: 35px;
          line-height: 3;
          right: 0;
          top: 0;
          text-align: center;
          color: #222;
          transition: all .3s;
        }
        &.slip-reordering{
          background: yellow;
        }
      }
    }
    &.show{
      left:0px;
    }
  }
}
</style>
