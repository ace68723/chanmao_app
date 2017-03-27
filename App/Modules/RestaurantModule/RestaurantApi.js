'use strict';

const AuthConstants = require( '../AuthModule/AuthConstants');
import AppConstants from '../../Constants/AppConstants';
const ERROR_NETWORK   = AuthConstants.ERROR_NETWORK;

let getOptiopns = {
    method: 'GET',
    mode:'cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}
const RestaurantApi = {
    getRestaurantData(userData){
      const url = AuthConstants.API_RESTAURANTLIST
      let options = {
          method: 'GET',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = userData.token;
      if(userData.userloc){
          options.headers.userloc = userData.userloc
      }else{
          options.headers.userloc = "000000,000000"
      }
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    getMenu(reqData){
      const url = AuthConstants.API_MENU
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      options.headers.authortoken = reqData.token;
      const rid = reqData.rid
      options.body =  JSON.stringify({rid})
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    beforCheckout(reqData){
      const url = AuthConstants.API_BEFOR_CHECKOUT
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      const rid = reqData.rid
      const pretax = reqData.pretax
      const POST_DATA = {rid,pretax}
      options.headers.authortoken = reqData.token;
      options.body =  JSON.stringify(POST_DATA)
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    calculateDeliveryFee(reqData){
      const url = AuthConstants.API_CALCULATE_DELIVERY_FEE
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }

      const code= reqData.code;
      const dltype= reqData.dltype;
      const pretax= reqData.pretax;
      const rid= reqData.rid;
      const uaid = reqData.uaid;
      const POST_DATA = {code,dltype,pretax,rid,uaid}

      options.headers.authortoken = reqData.token;
      options.body =  JSON.stringify(POST_DATA);
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    checkout(reqData){
      const url = AuthConstants.API_CHECKOUT;
      let options = {
          method: 'POST',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }

      const dltype  = reqData.dltype;
      const pretax  = reqData.pretax;
      const rid     = reqData.rid;
      const uaid    = reqData.uaid;
      const dlexp   = reqData.dlexp;
      const items   = reqData.items;
      const comment = reqData.comment;
      const version = AppConstants.CM_VERSION;
      const channel = '1';
      const POST_DATA = {dltype,pretax,rid,uaid,dlexp,items,version,channel,comment}
      options.headers.authortoken = reqData.token;
      options.body =  JSON.stringify(POST_DATA);
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    }


}

module.exports = RestaurantApi;
