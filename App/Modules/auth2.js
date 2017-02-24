'use strict';

const  AuthApi = require( './AuthApi');
const  AuthConstants = require( './AuthConstants');
const  AuthStore = require( './AuthStore');
const  AppConstants = require('../../Constants/AppConstants')
const  DeviceInfo = require('react-native-device-info');

// version
const VERSION         = AppConstants.CMVERSION;
//constants
const ERROR_STORE     = AuthConstants.ERROR_STORE;
const ERROR_NETWORK   = AuthConstants.ERROR_NETWORK;
const ERROR_PASSWORD  = AuthConstants.ERROR_PASSWORD;
const ERROR_AUTH      = AuthConstants.ERROR_AUTH;
const FAIL            = AuthConstants.FAIL;
const SUCCESS_LOGIN   = AuthConstants.SUCCESS_LOGIN;
const TOKEN           = AuthConstants.TOKEN;
const UID             = AuthConstants.UID;
const STARTED         = AuthConstants.STARTED;

let loginStarted = false;
let authStarted = false;
const AuthService = {
    // let la_data = [
    //   [TOKEN, ''],
    //   [UID, ''],
    //   [CMVERSION, ''],
    //   [CMUUID, ''],
    //   [CMOS, '']
    // ]
    // initUserInfo(){
    //   AuthStore.saveData(la_data)
    //     .then((res) => {
    //
    //     })
    //     .catch((error) =>{
    //
    //     })
    // }
    getToken(){
      return new Promise((resolve, reject) => {
        AuthStore.getData([TOKEN, UID])
          .then((data) => {
             resolve(data)
          })
          .catch((error) =>{
            reject (ERROR_STORE);
          })
       })
    },
    doAuth(){
      return new Promise((resolve, reject) => {
        if(!authStarted){
          authStarted = true;
          AuthService.getToken()
            .then((data) => {
                const userInfo = Object.assign({},{
                  os:  DeviceInfo.getModel() +" | " +
                         DeviceInfo.getSystemName() +" | " +
                         DeviceInfo.getSystemVersion() +" | " +
                         DeviceInfo.getDeviceName(),
                  token: data.userToken,
                  uuid: DeviceInfo.getUniqueID(),
                  version : VERSION
                });
            })
            .then((userInfo){
                AuthApi.AppAuth(userInfo)
                  .then((res)=>{
                  })
                  .catch((error) => {
                  })
                authStarted = false;
                resolve(SUCCESS_LOGIN)
            })
            .catch((error) =>{
                authStarted = false;
                reject(ERROR_NETWORK)
            })
        }
      })
    },
    AppLogin(username,password){
        return new Promise((resolve, reject) => {
          if(!loginStarted){
              loginStarted = true;
              AuthApi.AppLogin(username,password)
                  .then((res)=>{
                      if(res.result == FAIL){
                          loginStarted = false;
                          reject (ERROR_PASSWORD);
                       }else{
                          let la_data = [
                            [TOKEN, res.token],
                            [UID, res.uid]
                          ]
                          AuthStore.saveData(la_data)
                            .then((res) => {
                              loginStarted = false;
                              resolve (SUCCESS_LOGIN);
                            })
                            .catch((error) =>{
                              loginStarted = false;
                              reject (ERROR_STORE);
                            })
                       }
                  })
                  .catch((error)=>{
                      loginStarted = false;
                      reject (ERROR_NETWORK);
                  })
            }else{
              reject (STARTED);
            }

        })

    },



}
module.exports = AuthService;
