import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change4422';

const ERRROR_TITLE = AppConstants.ERRROR_TITLE;
let state = {
          historylist:[],
          orderData:[],
          current:null,
          unavailable:[],
          isRefreshing:false,
        };
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
	autoRefresh(){
		// setInterval(()=>{
		// 	state = Object.assign({},state,{doRefresh:true})
		// 	HistoryStore.emitChange();
		// },30000)
	},
	getHistorySuccess(data){
		data.isRefreshing = false;
		state = Object.assign({},state,data,{doRefresh:false})
	},
  getOrders(orderData){
    state = Object.assign({},state,{orderData},{doRefresh:false})
  },
  getState(){
    return state
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
				state.verifyPhoneResult = 'SUCCESS';
		}else{
			  state.verifyPhoneResult = 'FAIL';
		}
	},
	doRefresh(){
		state = Object.assign({},state,{doRefresh:true})
	},
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
         case AppConstants.GET_ORDERS:
              HistoryStore.getOrders(action.orderData)
              HistoryStore.emitChange()
         break;

				 case AppConstants.VERIFY_PHONE:
					    HistoryStore.verifyPhone(action.data)
						 	HistoryStore.emitChange()
				 break;
				 case AppConstants.GET_HISTORY_DETAIL:
						 HistoryStore.saveHistoryDetail(action.data)
						 HistoryStore.emitChange()
				 break;
				 case AppConstants.CHECKOUT:
							HistoryStore.doRefresh()
							HistoryStore.emitChange()
			   break;
         case AppConstants.GET_HISTORY_SUCCESS:
             HistoryStore.getHistorySuccess(action.data)
             HistoryStore.emitChange()
        break;

		  }

	})

});
module.exports = HistoryStore;
