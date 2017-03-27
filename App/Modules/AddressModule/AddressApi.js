'use strict';

const AuthConstants = require( '../AuthModule/AuthConstants');

const ERROR_NETWORK   = AuthConstants.ERROR_NETWORK;

let getOptiopns = {
    method: 'GET',
    mode:'cors',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
}


const AddressApi = {

    getAddress(token){
      const url = AuthConstants.API_ADDRESS
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
    // searchAddress(input){
    //   const url = "https://maps.googleapis.com/maps/api/place/autocomplete/" +
    //   "json?input="+ input +
    //   "&language=en" +
    //   "&types=address" +
    //   "&key=AIzaSyA-DNIURR8yEk2wbSKYZ_44qzzCNhLWhVA"
    //   let options = {
    //       method: 'GET',
    //       mode:'cors',
    //       headers: {
    //           'Accept': 'application/json',
    //           'Content-Type': 'application/json'
    //       }
    //   }
    //   return fetch(url,options)
    //           .then((res) => res.json())
    //           .catch((error) => {throw error})
    // },
    submitAddress(userInfo,token){
      const url = AuthConstants.API_CREATE_ADDRESS
      const options = Object.assign({},{
        method: 'POST',
        mode:'cors',
        headers:Object.assign({},{
          Accept: 'application/json',
          'Content-Type':'application/json',
           authortoken : token
        })
      })
      options.body = JSON.stringify(userInfo)
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    },
    deleteAddress(token,uaid){
      const url = AuthConstants.API_DELET_ADDRESS
      const options = Object.assign({},{
        method: 'POST',
        mode:'cors',
        headers:Object.assign({},{
          Accept: 'application/json',
          'Content-Type':'application/json',
           authortoken : token
        })
      })
      const del = '1'
      options.body = JSON.stringify({uaid,del})
      return fetch(url,options)
              .then((res) => res.json())
              .catch((error) => {throw error})
    }
}

module.exports = AddressApi;
