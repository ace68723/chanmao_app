import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change';

let state = {
  tabBarPosition:'bottom',
  showTabBar:true,
};
const HomeStore = Object.assign({},EventEmitter.prototype,{
	emitChange(){
			this.emit(CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
	},
  getState(){
    return state
  },
	dispatcherIndex: register(function(action) {
	  //  switch(action.actionType){
		// 		case AppConstants.GET_HOME_DATA:
		// 			   HomeStore.saveHomeData(action.res)
    //          HomeStore.emitChange()
		// 			break;
     //
		//   }

	})

});
module.exports = HomeStore;
