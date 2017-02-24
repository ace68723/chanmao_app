import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

const ERRROR_TITLE = AppConstants.ERRROR_TITLE;
let historyData;
let HistoryDetailData;
const HistoryStore = Object.assign({},EventEmitter.prototype,{
	emitChange(){
			this.emit( CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
	},

	getHistorySuccess(data){
		data.isRefreshing = false;
		historyData = Object.assign({},data)
	},
  getHistoryData(){
    return historyData
  },
	saveHistoryDetail(data){
		HistoryDetailData = Object.assign({},data);
	},
	getHistoryDetail(){
		return HistoryDetailData
		HistoryDetailData = {};

	},
	verifyPhone(data){
		if(data.result === 0){
				historyData.verifyPhoneResult = 'SUCCESS';
		}else{
			  historyData.verifyPhoneResult = 'FAIL';
		}
	},
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				 case AppConstants.GET_HISTORY_SUCCESS:
					    HistoryStore.getHistorySuccess(action.data)
						 	HistoryStore.emitChange()
				 break;
				 case AppConstants.VERIFY_PHONE:
					    HistoryStore.verifyPhone(action.data)
						 	HistoryStore.emitChange()
				 break;
				 case AppConstants. GET_HISTORY_DETAIL:
						 HistoryStore.saveHistoryDetail(action.data)
						 HistoryStore.emitChange()
				break;



		  }

	})

});
module.exports = HistoryStore;
