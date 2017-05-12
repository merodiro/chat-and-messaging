<template lang="html">
  <div class="wrapper" id="dashboard-wrapper">
    <section class="header">
      <h1 class="page-title">Dashboard <small>A glimpse of your data.</small></h1>
      <div class="row">
        <div class="col-md-8 col-md-push-2">
          <h2 class="text-center">Welcome {{userStore.authUser.name}}</h2>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      userStore: state => state.userStore
    })
  }
}
</script>
