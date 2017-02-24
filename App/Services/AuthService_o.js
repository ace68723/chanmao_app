'use strict';
import AppConstants from '../Constants/AppConstants';
import Api from './Api';

import StorageSystem from '../Stores/StorageSystem';


const ERROR_STORE = AppConstants.ERROR_STORE;
const ERROR_NETWORK = AppConstants.ERROR_NETWORK;
const ERROR_PASSWORD = AppConstants.ERROR_PASSWORD;
const ERROR_AUTH = AppConstants.ERROR_AUTH;
const FAIL = AppConstants.FAIL;
const SUCCESS_LOGIN = AppConstants.SUCCESS_LOGIN;
const TOKEN = AppConstants.TOKEN;
const UID = AppConstants.UID;
const STARTED = AppConstants.STARTED;

let loginStarted = false;
let authStarted = false;
const AuthService = {
    getAuthInfo(){
      return new Promise((resolve, reject) => {
        StorageSystem.getData([TOKEN, UID])
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
          AuthService.getAuthInfo()
            .then((data) => {

              let token = data.userToken;
              Api.auth(token)
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
    login(username,password){
        return new Promise((resolve, reject) => {
          if(!loginStarted){
              loginStarted = true;
              Api.login(username,password)
                  .then((res)=>{
                      if(res.result == FAIL){
                          loginStarted = false;
                          reject (ERROR_PASSWORD);
                       }else{
                          let la_data = [
                            [TOKEN, res.token],
                            [UID, res.uid]
                          ]
                          StorageSystem.saveData(la_data)
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

    }

}
module.exports = AuthService;
