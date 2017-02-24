import AppConstants from '../Constants/AppConstants';
import RestaurantAction from '../Actions/RestaurantAction';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

const  Realm = require('realm');
let realm = new Realm();

const ERRROR_TITLE = AppConstants.ERRROR_TITLE;
let predictionsData;
let la_address;
let lo_addrInfo;
let state;
let props;

let addressList = realm.objects('Address');
// let selectedUaid;
// addressList.forEach((address)=>{
// 	if(address.type == "S"){
// 		selectedUaid = address.uaid;
// 	}
// })
let addressListState = Object.assign({},
	{ addressList:[],
	  predictionsData:[],
		placeId:"",
		showAddInfo:false,
		addressType:"",
		formattedAddress:"",
		searchAddress:""
	},
		{addressList},
	)
const _updateDataSource = () => {
		let addressList = realm.objects('Address');
		let selectedUaid;
		addressList.forEach((address)=>{
			if(address.type == "S"){
				selectedUaid = address.uaid;
			}
		})
		addressListState = Object.assign({},addressListState,{addressList},{selectedUaid});
		// AddressStore.emitChange();
}
const AddressStore = Object.assign({},EventEmitter.prototype,{
	emitChange(){
			this.emit( CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
			realm.addListener('change', () => {
	        _updateDataSource();
	    });
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
			// realm.removeAllListeners();
	},

	getPredictionsSuccess(autocompleteData){
		predictionsData = autocompleteData.predictions;
	},
	getPredictionsData(){
    return predictionsData
  },
	getLoadState(){
		return loaded
	},
	getAddressListState(){
		let selectedUaid;
		addressList.forEach((address)=>{
			if(address.selected){
				selectedUaid = address.uaid;
			}
		})
		addressListState = Object.assign({},addressListState,{selectedUaid})
		return addressListState
	},
	closeAddInfo(selectedUaid){
		addressListState.selectedUaid = selectedUaid;
		addressListState.showAddInfo = false;
	},
	showAddInfo(placeId){
		addressListState.placeId = placeId;
		addressListState.showAddInfo = true;
	},
  saveAddress(ia_address){
		// addressListState.addressList = ia_address;
  },
	updateAddresslist(){
		setTimeout(function () {
			RestaurantAction.updateAdderss();
		}, 100);
	},
  getAddress(){
    return la_address;
  },
	formatAddress(io_addrInfo){
		addressListState = Object.assign({},addressListState,{formattedAddress:io_addrInfo,showAddInfo:true})
	},
	getFormatAddress(){
		return lo_addrInfo;
	},
	getState(){
		return state;
	},
	getProps(){
		return props;
	},
	submitAddress(){
		state = Object.assign({},{
			 backToAddressList: true,
		})
	},
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case AppConstants.PREDICTIONS_SUCCESS:
					   AddressStore.getPredictionsSuccess(action.autocompleteData)
             AddressStore.emitChange()
					break;
        case AppConstants.GET_ADDRESSES:
             AddressStore.saveAddress(action.addressList)
             AddressStore.emitChange()
          break;
				case AppConstants.FORMAT_ADDRESS:
             AddressStore.formatAddress(action.addrInfo)
             AddressStore.emitChange()
          break;
				case AppConstants.SUBMIT_ADDRESS:
             AddressStore.submitAddress()
             AddressStore.emitChange()
          break;
				case AppConstants.COLSE_ADDINFO:
						 AddressStore.closeAddInfo(action.selectedUaid)
						 AddressStore.emitChange()
					break;
				case AppConstants.SHOW_ADDINFO:
						 AddressStore.showAddInfo(action.placeId)
						 AddressStore.emitChange()
					break;
				case AppConstants.UPDATA_ADDRESSLIST:
						 AddressStore.updateAddresslist()
						 AddressStore.emitChange()
					break;
        default:
         // do nothing
		  }

	})

});
module.exports = AddressStore;
