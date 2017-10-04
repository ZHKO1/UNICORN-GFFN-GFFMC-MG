<template>
  <div class="appSideBar">
    <div class="switchSideBar" style="">
      <i class="fa fa-angle-right"></i>
    </div>
    <div class="main">
      <ul>
        <li v-for="item in SideLi" @click="toggleLi(item.id)">{{item.name}}<i class="fa" :class="{'fa-check' : item.show}"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'appSideBar',
  data () {
    return {
      SideLi: [
        {id:0, name:"FIX G.F.F.N ArtWork", show: true},
        {id:1, name:"FIX G.F.F.N Toy", show: true},
        {id:2, name:"FIX MC  ArtWork"},
        {id:3, name:"FIX MC  Toy"},
        {id:4, name:"MG Ver.Ka  ArtWork"},
        {id:5, name:"MG Ver.Ka  Toy"},
      ]
    }
  },
  methods: {
    toggleLi(id) {
      var that = this;
      Vue.set(that.SideLi[id], "show", that.SideLi[id].show? (!that.SideLi[id].show): true);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../lib/style/font-awesome/css/font-awesome.css";
.appSideBar{
  .switchSideBar{
    background-color: #58b7ff;
    position: fixed;
    left: 50px;
    top: 150px;
    width: 50px;
    height: 50px;
    border-radius: 25px;
    cursor: pointer;
    opacity: .4;
    transition: .3s;
    i{
      color: #fff;
      display: block;
      line-height: 50px;
      text-align: center;
      font-size: 2.5em;
    }
  }

  .main{
    display: none;
    position: fixed;
    width: 280px;
    height: 80vh;
    background: rgba(255, 255, 255, 0.8);
    left: 0px;
    font-family: 'Lucida Grande','Hiragino Kaku Gothic Pro','ヒラギノ角ゴ Pro W3','ＭＳ Ｐゴシック', sans-serif;
    font-weight: normal;
    color: #222;
    z-index:2;
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
      }
    }
  }
}
</style>
