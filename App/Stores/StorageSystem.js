
import AppConstants from '../Constants/AppConstants';
import React, {
	Component,
} from 'react';
import {
  AsyncStorage
} from 'react-native';

const StorageSystem = {
   getData(ia_keys){
     return new Promise((resolve, reject) => {
         AsyncStorage.multiGet(ia_keys,(err,val) => {

           if(err){
             reject (AppConstants.ERROR_STORE);
           }
           if(!val){
             reject (AppConstants.ERROR_STORE);
           }
             let eo_data = {};
             val.forEach((value)=>{
                  eo_data[value[0]] = value[1];
             })
             resolve (eo_data);
         })
       })
   },
   saveData(ia_data){
     return new Promise((resolve, reject) => {
         AsyncStorage.multiSet(ia_data,(err) => {
             if(err){
               reject (AppConstants.ERROR_STORE);
             }
             resolve (AppConstants.SUCCESS_LOGIN);
         })
      })
   }
}
module.exports = StorageSystem;
