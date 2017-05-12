<template>
  <div class="PrivateMessage PrivateMessage-Inbox">
    <section class="header">
      <h1 class="page-title">Compose Message <small>Send a private message.</small></h1>
    </section>

    <section class="content">
      <div class="row">
        <div class="col-sm-2 col-with-right-border">
          <private-message-sidebar></private-message-sidebar>
        </div>
        <div class="col-sm-8">
          <form @submit.prevent="handleFormSubmit">
            <div class="form-group">
              <label> Select a user</label>
              <multiselect
                v-model="pm.userSelected"
                :options="userStore.users"
                :searchable="true"
                :close-on-select="true"
                :show-labels="false"
                track-by="id"
                label="name"
                placeholder="Select a user"
              />
            </div>

            <div class="form-group">
              <label>Subject</label>
              <input type="text" v-model="pm.subject" class="form-control" placeholder="Enter subject">
            </div>

            <div class="form-group">
              <label>Message</label>
              <textarea v-model="pm.message" class="form-control" placeholder="Enter message"></textarea>
            </div>
            <button class="btn btn-primary"><i class="fa fa-save">Send</i></button>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import PrivateMessageSidebar from './PrivateMessageSidebar.vue'
import { mapState } from 'vuex'

export default {
  components: {
    'private-message-sidebar': PrivateMessageSidebar
  },
  computed: {
    ...mapState({
      pmStore: state => state.privateMessageStore,
      userStore: state => state.userStore
    })
  },
  created () {
    this.$store.dispatch('getUserList')
  },
  data () {
    return {
      pm: {
        userSelected: null,
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    handleFormSubmit () {
      // this.$logger('info', 'pm', this.pm)
      let postData = {
        'receiver_id': this.pm.userSelected.id,
        'message': this.pm.message,
        'subject': this.pm.subject
      }
      this.$store.dispatch('sendPrivateMessage', postData)
        .then(response => {
          this.$router.push({name: 'my-sent-pms'})
        })
    }
  }
}
</script>
