<template>
  <div id="chat-add-widget">
    <form @submit.prevent="handleAddChat()">
      <div class="form-group">
        <input
          v-if="chatStore.currentChatUser"
          type="text"
          :placeholder="sending ? 'sending...' :'Enter your text'"
          class="form-control"
          v-model="message"
          :disabled="sending"
          v-focus="focused"
          @focus="focused = true"
          @blur="focused = false">

      </div>
    </form>
  </div>
</template>

<script>
  import { focus } from 'vue-focus'
  import Pusher from 'pusher-js'
  import {mapState} from 'vuex'

  export default {
    directives: { focus: focus },
    created () {
      this.pusher = new Pusher('d2bcb891ca32dd44da0a', {
        encrypted: true,
        cluster: 'mt1'
      })
      let that = this
      this.channel = this.pusher.subscribe('chat_channel')
      this.channel.bind('chat_saved', function (data) {
        that.$emit('incoming_chat', data)
      })
      this.$on('incoming_chat', function (chatMessage) {
        this.incomingChat(chatMessage)
      })
    },
    computed: {
      ...mapState({
        chatStore: state => state.chatStore,
        userStore: state => state.userStore
      })
    },
    data () {
      return {
        message: null,
        pusher: null,
        channel: null,
        sending: false,
        focused: true
      }
    },
    methods: {
      handleAddChat () {
        if (this.message) {
          let postData = {
            'receiver_id': this.chatStore.currentChatUser.id,
            'chat': this.message
          }
          this.message = null
          this.sending = true
          this.$store.dispatch('addNewChatToConversation', postData)
            .then(response => {
              let element = document.getElementById('chat-widget-wrapper')
              this.sending = false
              this.focused = true
              element.scrollIntoView(false)
            })
        }
      },
      incomingChat (chatMessage) {
        if (parseInt(this.chatStore.currentChatUser.id) === parseInt(chatMessage.message.sender_id)) {
          if (chatMessage.message.receiver.email === this.userStore.authUser.email) {
            this.$store.dispatch('newIncomingChat', chatMessage.message)
              .then(res => {
                let element = document.getElementById('chat-widget-wrapper')
                element.scrollIntoView(false)
              })
          } else {
            console.log('message for some other user by the selected user')
          }
        }
      }
    }
}
</script>

<style lang="scss">
  #chat-add-widget {
    position: fixed;
    bottom: 0;
    width: 80%;
  }
</style>
