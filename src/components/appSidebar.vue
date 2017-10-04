<template>
  <div class="appSideBar">
    <ul>
      <li v-for="item in SideLi">{{item.name}}<i class="fa fa-check"></i></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'appSideBar',
  data () {
    return {
      SideLi: [
        {id:0, name:"FIX G.F.F.N ArtWork"},
        {id:1, name:"FIX G.F.F.N Toy"},
        {id:2, name:"FIX MC  ArtWork"},
        {id:3, name:"FIX MC  Toy"},
        {id:4, name:"MG Ver.Ka  ArtWork"},
        {id:5, name:"MG Ver.Ka  Toy"},
      ]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import "./../lib/style/font-awesome/css/font-awesome.css";
.appSideBar{
  position: fixed;
  width: 250px;
  height: 80vh;
  background: rgba(255, 255, 255, 0.8);
  left: 0px;
  font-family: 'Lucida Grande','Hiragino Kaku Gothic Pro','ヒラギノ角ゴ Pro W3','ＭＳ Ｐゴシック', sans-serif;
  font-weight: normal;
  color: #222;
  z-index:2;
  ul{
    clear: left;
    margin-left: 1em;
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
      i{
        position: absolute;
        width: 35px;
        line-height: 3;
        right: 0;
        top: 0;
        text-align: center;
        color: #222;
        transition: all .3s;
        cursor: pointer;
      }
    }
  }
}
</style>
