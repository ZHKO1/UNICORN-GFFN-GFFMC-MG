<template>
  <header class="Navbar">
    <div class="Navbar-logo-wrapper">
      <img src="./../images/h1.png" alt="">
    </div>
    <div class="Navbar-title">
    </div>
    <div class="Navbar-functionality">
      <img src="./../images/h2.png" alt="">
    </div>
  </header>
</template>

<script>
  export default {
    name: 'appNav',
    data () {
      return {
        msg: 'nav'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .Navbar{
    contain: layout;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    height: 59px;
    width: 100%;
    border-bottom: 1px solid transparent;
    border-color: rgba(0, 0, 0, .08);
    color: #808080;
    background: rgba(255, 255, 255, .97);
    z-index: 2;
    position: relative;
  }
  .Navbar-logo-wrapper{
    position: absolute;
    top: 0;
    left: 0;
    height: 58px;
    -ms-flex-item-align: stretch;
    align-self: stretch;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    width:300px;
    img{
      margin-top: 4px;
      display: block;
      height:50px;
      padding-left:50px;
    }
  }
  .Navbar-title{
    margin: 0 auto;
    width: 460px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    white-space: nowrap;
  }
  .Navbar-functionality {
    position: absolute;
    right: 0px;
    top: 0px;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    flex-direction: row;
    height: 58px;
    -webkit-box-align: center;
    align-items: center;
    align-self: stretch;
    img{
      margin-top: 22px;
      display: block;
      height:14px;
      padding-right: 50px;
    }
  }
</style>
