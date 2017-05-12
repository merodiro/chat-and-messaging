<template>
  <div class="PrivateMessage PrivateMessage-Inbox">
    <section class="header">
      <h1 class="page-title">View message <small>View the message details.</small></h1>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-sm-2 col-with-right-border">
          <private-message-sidebar></private-message-sidebar>
        </div>
        <div class="col-sm-8">
          <h3>{{ pmStore.message.subject }}</h3>
          <p>From: {{ pmStore.message.sender.email }} <span class="pull-right"> {{ pmStore.message.created_at }}</span></p>
          <div class="message">
            {{ pmStore.message.message }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import PrivateMessageSidebar from './PrivateMessageSidebar.vue'
export default {
  components: {
    'private-message-sidebar': PrivateMessageSidebar
  },
  computed: {
    ...mapState({
      pmStore: state => state.PrivateMessageStore
    })
  },
  created () {
    this.$store.dispatch('getPrivateMessageById', this.$route.params.id)
  },
  destroyed () {
    this.$store.dispatch('clearMessageView')
  }
}
</script>
