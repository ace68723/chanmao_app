'use strict';

import AuthService from './AuthService'
import RestaurantModule from '../Modules/RestaurantModule/RestaurantModule';
import RestaurantAction from '../Actions/RestaurantAction';

const RestaurantService = {
    getLocation(token){
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // const initialPosition = JSON.stringify(position);
            const userloc = position.coords.latitude +','+position.coords.longitude;
            const userData ={token,userloc}
            resolve(userData)
            },
            (error) => {
              const userData ={token}
              resolve(userData)
            },
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
        );
      })

    },
    getRestaurantData(){
      AuthService.getToken()
        .then(this.getLocation)
        .then(RestaurantModule.getRestaurantData)
        .then(RestaurantAction.getRestaurantSuccess)
    },
    getMenu(rid){
      _getToken(rid)
      .then(RestaurantModule.getMenu)
      .then(RestaurantAction.getMenuSuccess)
    }
}
const _getToken = (rid)=>{
      return new Promise((resolve, reject) => {
          AuthService.getToken()
          .then(token =>{
            const reqData = {rid,token}
            resolve (reqData)
          })
          .catch(error =>{
            reject()
          })
      })

}

module.exports = RestaurantService;
