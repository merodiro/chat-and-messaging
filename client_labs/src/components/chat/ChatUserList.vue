<template>
  <div class="wrapper" id="chat-user-list-wrapper">
    <ul class="list-group">
      <li
        v-for="user in chatStore.userList"
        v-if="user.name !== userStore.authUser.name"
        @click="changeChatUser(user)"
        class="list-group-item pointer"
        :class="[{active: userActiveStyle(user)}]"
      >{{user.name}}</li>
    </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      chatStore: state => state.chatStore,
      userStore: state => state.userStore
    })
  },
  methods: {
    changeChatUser (user) {
      this.$store.dispatch('setCurrentChatUser', user)
    },
    userActiveStyle (user) {
      if (this.chatStore.currentChatUser === null) {
        return false
      }
      if (this.chatStore.currentChatUser.id === user.id) {
        return true
      }
      return false
    }
  }
}
</script>
