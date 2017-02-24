import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import _forEach from 'lodash/forEach'
import AddressModule from '../Modules/AddressModule/AddressModule';
import AuthModule from '../Modules/AuthModule/Auth';
import AuthService from '../Services/AuthService';
import RestaurantAction from './RestaurantAction';
export default {
    async getAddress(){
      try{
        const token = await AuthModule.getToken();
        const addressList = await AddressModule.getAddress(token);
        dispatch({
            actionType: AppConstants.GET_ADDRESSES, addressList
        })
      }catch(error){
        console.log(error)
      }

      // AuthService.getToken()
      // .then(AddressModule.getAddress)
      // .then(ia_address=>{
        // dispatch({
        //     actionType: AppConstants.GET_ADDRESSES, ia_address
        // })
      // })
      // .catch(error=>{
      // })
    },
    getPredictionsSuccess(autocompleteData){
      dispatch({
          actionType: AppConstants.PREDICTIONS_SUCCESS, autocompleteData
      })
    },
    getPredictions(text){
      const url = "https://maps.googleapis.com/maps/api/place/autocomplete/" +
      "json?input="+ text +
      "&language=en" +
      "&types=address" +
      "&key=AIzaSyA-DNIURR8yEk2wbSKYZ_44qzzCNhLWhVA"
      let options = {
          method: 'GET',
          mode:'cors',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }
      fetch(url,options)
        .then((res) => res.json())
        .then((res)=>{
            if(res.status == "ok"){
              const autocompleteData = res
              dispatch({
                  actionType: AppConstants.PREDICTIONS_SUCCESS, autocompleteData
              })
            }else{
              throw error
            }
        })
        .catch((error) => {throw error})

    },
    formatAddress(placeId){
        const url = "https://maps.googleapis.com/maps/api/place/details/" +
        "json?placeid="+ placeId +
        "&key=AIzaSyA-DNIURR8yEk2wbSKYZ_44qzzCNhLWhVA"
        let options = {
            method: 'GET',
            mode:'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        fetch(url,options)
          .then((res) => res.json())
          .then((res)=>{
            if(res.status == "OK"){
              const placeDetails = res.result;

              let addrInfo = {};
              addrInfo.latitude 	= placeDetails.geometry.location.lat;
							addrInfo.longitude 	= placeDetails.geometry.location.lng;
              _forEach(placeDetails.address_components, function(component, key) {
                  _forEach(component.types, function(type, key) {
                    switch(type) {
                      case "postal_code":
                        addrInfo.postalCode = component.long_name;
                        break;
                      case "locality":
                        addrInfo.city = component.long_name;
                        break;
                      case "sublocality":
                        addrInfo.city = component.long_name;
                        break;
                      case "neighborhood":
                        addrInfo.city = component.long_name;
                      break;
                    }
                  });
              });
              if(!addrInfo.city){
                addrInfo.city = 'GTA';
              }
              addrInfo.address = placeDetails.formatted_address
              dispatch({
                  actionType: AppConstants.FORMAT_ADDRESS, addrInfo
              })
            }else{
              throw 'error'
            }
          })
          .catch((error) => {throw error})
    },
    async submitAddress(userInfo){
      try {
        const token = await AuthService.getToken();
        userInfo.token = token;
        const res = await AddressModule.submitAddress(userInfo)
        const selectedUaid = res.addr.uaid;
        dispatch({
            actionType: AppConstants.COLSE_ADDINFO, selectedUaid
        })
      } catch (e) {
        console.log(e)
      }

      // AuthService.getToken()
      // .then((token)=>{
      //   userInfo.token = token;
      //   return userInfo
      // })
      // .then(AddressModule.submitAddress)
      // .then((res)=>{
      //   dispatch({
      //       actionType: AppConstants.SUBMIT_ADDRESS, res
      //   })
      // })
      // .catch(error =>{
      //
      // })

    },
    async deleteAddress(address){
      const token = await AuthService.getToken();
      const result = await AddressModule.deleteAddress(token,address);
      dispatch({
          actionType: AppConstants.UPDATA_ADDRESSLIST
      })
    },
    selectAddress(address){
      AddressModule.selectAddress(address);
      dispatch({
          actionType: AppConstants.UPDATA_ADDRESSLIST
      })
    },
    closeAddInfo(selectedUaid){
        dispatch({
            actionType: AppConstants.COLSE_ADDINFO, selectedUaid
        })
    },
    showAddInfo(placeId){
       dispatch({
           actionType: AppConstants.SHOW_ADDINFO,placeId
       })
     }
}
