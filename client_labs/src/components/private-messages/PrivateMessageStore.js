import Vue from 'vue'
import _ from 'lodash'
import {
  getUserPrivateMessages,
  getHeader,
  getUserPrivateMessagesSent,
  getPrivateMessageById,
  sendPrivateMessageUrl,
  getUserPMNotifications
} from './../../config'

const state = {
  notifications: [],
  messagesRec: [],
  messagesSent: [],
  message: {
    subject: '',
    message: '',
    sender: ''
  }
}

const mutations = {
  SET_USER_PM_NOTIFICATIONS (state, notifications) {
    state.notifications = notifications
  },
  SET_MESSAGES_REC (state, messages) {
    state.messagesRec = messages
  },
  SET_MESSAGES_SENT (state, messages) {
    state.messagesSent = messages
  },
  SET_MESSAGE_VIEW (state, message) {
    state.message = message
  },
  CLEAR_MESSAGE_VIEW (state) {
    state.message = {
      subject: '',
      message: '',
      sender: ''
    }
  },
  SEND_PRIVATE_MESSAGE (state, message) {
    state.messagesSent.push(message)
  },
  NEW_PM_NOTIFICATION (state, message) {
    state.notifications.unshift(message)
    state.messagesRec.unshift(message)
  },
  MESSAGE_READ_NOTIFICATION (state, message) {
    _.forEach(state.messagesRec, function (value, key) {
      if (message.id === value.id) {
        state.messagesRec[key] = value
      }
    })
    console.log('message' + message.id)
    _.forEach(state.notifications, function (value, key) {
      if (message.id === value.id) {
        state.notifications.splice(key, 1)
      }
    })
  }
}

const actions = {
  getUserNotifications: ({commit}) => {
    let postData = {}
    return Vue.http.post(getUserPMNotifications, postData, {headers: getHeader()})
      .then(response => {
        Vue.$logger('info', 'getUserNotifications response', response)
        commit('SET_USER_PM_NOTIFICATIONS', response.body.data)
      })
  },
  setUserMessagesRec: ({commit}) => {
    let postData = {}
    return Vue.http.post(getUserPrivateMessages, postData, {headers: getHeader()})
      .then(response => {
        Vue.$logger('info', 'setUserMessagesRec response', response)
        commit('SET_MESSAGES_REC', response.body.data)
      })
  },
  setUserMessagesSent: ({commit}) => {
    let postData = {}
    return Vue.http.post(getUserPrivateMessagesSent, postData, {headers: getHeader()})
      .then(response => {
        Vue.$logger('info', 'setUserMessagesSent response', response)
        commit('SET_MESSAGES_SENT', response.body.data)
      })
  },
  getPrivateMessageById: ({commit}, id) => {
    let postData = {'id': id}
    return Vue.http.post(getPrivateMessageById, postData, {headers: getHeader()})
      .then(response => {
        Vue.$logger('info', 'getPrivateMessageById response', response)
        commit('SET_MESSAGE_VIEW', response.body.data)
      })
  },
  clearMessageView: ({commit}) => {
    commit('CLEAR_MESSAGE_VIEW')
  },
  sendPrivateMessage: ({commit}, postData) => {
    return Vue.http.post(sendPrivateMessageUrl, postData, {headers: getHeader()})
      .then(response => {
        commit('SEND_PRIVATE_MESSAGE', response.body.data)
        return response.body.data
      })
  },
  newMessageNotification: ({commit}, message) => {
    commit('NEW_PM_NOTIFICATION', message)
  },
  messageReadNotification: ({commit}, message) => {
    commit('MESSAGE_READ_NOTIFICATION', message)
  }
}

export default {
  state,
  mutations,
  actions
}
