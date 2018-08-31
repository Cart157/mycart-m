<template>
  <div id="app">
    <van-nav-bar title="首页" fixed left-arrow @click-left="onClickLeft" @click-right="onClickRight">
      <van-icon name="search" slot="right" />
    </van-nav-bar>

    <router-view />

    <van-tabbar v-model="active">
      <van-tabbar-item icon="shop" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="records" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="cart" to="/cart" info="5">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import Vue from 'vue'
import router from './router'
import { NavBar, Icon, Tabbar, TabbarItem } from 'vant'

Vue.use(NavBar).use(Icon).use(Tabbar).use(TabbarItem)

export default {
  data () {
    return {
      active: 0
    }
  },
  // created: function () {
  //   console.log(this)
  // },
  methods: {
    onClickLeft: function () {
      router.back()
    },
    onClickRight: function () {
      router.back()
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  height: 100%;
  padding-top: 45px;
  padding-bottom: 50px;
  overflow: hidden;
}
</style>
