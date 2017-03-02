import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change';

let state = {
  tabBarPosition:'bottom',
  showTabBar:true,
  goToHistory:false,
};
const TabsStore = Object.assign({},EventEmitter.prototype,{
	emitChange(){
			this.emit(CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
      setTimeout( () => {
        this.emit(CHANGE_EVENT)
      }, 10000);
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
	},
  GO_TO_HISTORY(){
    state = Object.assign({},state,{goToHistory:true})

  },
  getState(){
    setTimeout(() => {
      state = Object.assign({},state,{goToHistory:false})
    }, 500);
    return state
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case AppConstants.CHECKOUT:
					   TabsStore.GO_TO_HISTORY()
             TabsStore.emitChange()
					break;

		  }

	})

});
module.exports = TabsStore;
