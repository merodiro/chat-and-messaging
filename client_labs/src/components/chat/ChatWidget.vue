<template>
  <div id="chat-widget-wrapper">
    <div
      :class="{'sender': checkCurrentUser(chat)}"
      class="conversation"
      v-for="(chat, index) in chatStore.conversation"
    >
      <div class="sender-data clearfix">
        <div class="name">{{ checkCurrentUser(chat) ? 'You' : chat.sender.name}}</div>
        <div class="time">
          {{ moment(chat.created_at).add(zone, 'm').fromNow() }}
        </div>
        <!-- <div class="time">{{chat.created_at}}</div> -->
      </div>
      <div class="chat-body">
        {{chat.chat}}
      </div>
    </div>
  </div>
</template>

<script>
  window.moment = require('moment')
  import {mapState} from 'vuex'
  export default {
    data () {
      return {
        zone: window.moment().utcOffset()
      }
    },
    computed: {
      ...mapState({
        chatStore: state => state.chatStore,
        userStore: state => state.userStore
      })
    },
    methods: {
      moment (...args) {
        return window.moment(...args)
      },
      checkCurrentUser (chat) {
        return chat.sender.email === this.userStore.authUser.email
      }
    }
  }
</script>


<style lang="scss">
@import './../../assets/css/variables.scss';
.conversation {
    border-bottom: 1px solid $border-color;
    padding-bottom: 5px;
    margin-bottom: 10px;
    .sender-data .name {
        float: left;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;
        font-size: 1.1em;
    }
    .sender-data .time {
        font-size: 0.8em;
        float: left;
        margin-left: 10px;
        line-height: 21px;
    }
    &:last-child {
        border-bottom: none;
        padding-bottom: 6em;
    }
}
.sender {
color: #158cba;
// transform: translate(100px, 0);
}
</style>
