'use strict';

const AuthConstants = require( '../AuthModule/AuthConstants');

const ERROR_NETWORK   = AuthConstants.ERROR_NETWORK;
let postOptiopns = AuthConstants.postOptiopns
let getOptiopns = {
    method: 'POST',
    mode:'cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}

const HistoryApi = {
    getHistoryData(token){
      const url = AuthConstants.API_HISTORYLIST
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = token;
      // options.body = JSON.stringify({channel:1});
      options.body = JSON.stringify({channel: 1})
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    getHistoryDetail(reqData){
      const url = AuthConstants.API_GETHISTORYDETAIL
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = reqData.token;
      const oid = reqData.iv_oid
      options.body =  JSON.stringify({oid})
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    getVerifyCode(reqData){
      const url = AuthConstants.API_GETVERIFYCODE
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = reqData.token;
      const iv_oid = reqData.iv_oid
      options.body =  JSON.stringify({iv_oid})
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    verifyPhone(reqData){
      const url = AuthConstants.API_VERIFYCODE
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = reqData.token;
      const iv_oid = reqData.iv_oid;
      const iv_code = reqData.iv_code;
      options.body =  JSON.stringify({iv_oid,iv_code});
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },

}

module.exports = HistoryApi;
