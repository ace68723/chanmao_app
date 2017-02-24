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

const HomeApi = {
    getHomeData(token){
      const url = AuthConstants.API_HOME;
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
    getAreaList(reqData){
      const url = AuthConstants.API_AREALIST;
      let options = {
          method: 'GET',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = reqData.token;
      if(reqData.userloc){
          options.headers.userloc = reqData.userloc
      }else{
          options.headers.userloc = "000000,000000"
      }
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },

}

module.exports = HomeApi;
