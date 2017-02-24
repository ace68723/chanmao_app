'use strict';

const AuthConstants = require( '../AuthModule/AuthConstants');




const TheSixApi = {
    getAticleList(reqData){
      const url = AuthConstants.GET_ATICLE_LIST;
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = reqData.token;
      const author_id = reqData.author_id;
      const POST_DATA = {author_id}
      options.body = JSON.stringify(reqData)
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    getArticleAuthor(token){
      const url = AuthConstants.GET_ARTICLE_AUTHOR;
      let options = {
          method: 'GET',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = token;
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    getBroadcastAuthor(token){
      const url = AuthConstants.GET_BROADCAST_AUTHOR;
      let options = {
          method: 'GET',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = token;
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    getActivityAuthor(token){
      const url = AuthConstants.GET_ACTIVITY_AUTHOR;
      let options = {
          method: 'GET',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = token;
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    submitApplication(token,reqData){
      const url = AuthConstants.SUBMIT_APPLICATION;
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = token;
      options.body = JSON.stringify(reqData)
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    submitComment(token,reqData){
      const url = AuthConstants.SUBMIT_COMMENT;
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = token;
      options.body = JSON.stringify(reqData)
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    getCommentList(token,reqData){
      const url = AuthConstants.GET_COMMENT_LIST;
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = token;
      options.body = JSON.stringify(reqData)
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    checkUpdate(token,reqData){
      const url = AuthConstants.API_CHECK_UPDATE;
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = token;
      options.body = JSON.stringify(reqData)
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    }
}

module.exports = TheSixApi;
