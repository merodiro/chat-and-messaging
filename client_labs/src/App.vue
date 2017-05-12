<template>
  <div>
    <TopMenu></TopMenu>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import TopMenu from './components/TopMenu.vue'
  export default {
    components: {
      TopMenu
    },
    computed: {
      ...mapState({
        userStore: state => state.userStore
      })
    },
    created () {
      const userObj = JSON.parse(window.localStorage.getItem('authUser'))
      this.$store.dispatch('setUserObject', userObj)
    }
  }

</script>

<style lang="scss">
  @import './assets/css/global';
</style>
