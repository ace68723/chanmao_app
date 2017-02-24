'use strict';

import AuthService from './AuthService';
import AddressModule from '../Modules/AddressModule/AddressModule';
import AddressAction from '../Actions/AddressAction';

const AddressService = {

    
    getAddress(){
      AuthService.getToken()
      .then(AddressModule.getAddress)
    },
    searchAddress(input){
        AddressModule.searchAddress(input)
        .then(AddressAction.getPredictionsSuccess)
    }
}



module.exports = AddressService;
