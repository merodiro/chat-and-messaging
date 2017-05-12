<template>
  <div class="wrapper" id="chat-wraper">
    <section class="header">
      <h1 class="page-title">Chat <small>Get connected with your friends.</small></h1>
    </section>

    <section class="content">
      <div class="col-md-2" id="user-list-col">
        <user-list></user-list>
      </div>
      <div class="col-md-10" id="chat-content-wrapper">
        <div class="chat-block">
          <chat-block></chat-block>
        </div>
        <div class="add-chat-block">
          <add-chat></add-chat>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import ChatUserList from './../components/chat/ChatUserList.vue'
import ChatWidget from './../components/chat/ChatWidget.vue'
import ChatAddWidget from './../components/chat/ChatAddWidget.vue'
export default {
  components: {
    'user-list': ChatUserList,
    'chat-block': ChatWidget,
    'add-chat': ChatAddWidget
  },
  computed: {
    ...mapState({
      chatStore: state => state.chatStore
    })
  },
  created () {
    this.$store.dispatch('setUserList')
    let that = this
    setInterval(function () {
      if (that.chatStore.currentChatUser) {
        that.$store.dispatch('updateConversation')
      }
    }, 1000 * 10)
  },
  destroyed () {
    this.$store.dispatch('clearCurrentConversation')
  }
}
</script>

<style lang="scss">
  @import './../assets/css/variables.scss';
  #user-list-col {
      border-right: 1px solid $border-color;
  }

  .add-chat-block {
    position: relative;
  }
</style>
