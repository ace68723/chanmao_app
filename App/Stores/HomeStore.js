import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change';

let HomeState = {
		updatePosition:false,
		currentTab:1,
		bannerList:[],
		areaList:[],
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
  saveHomeData(res){
		 const bannerList = res.homeData.zone1;
		 const advertisement = res.homeData.zone2;
		 const areaList = res.areaList;
		 HomeState = Object.assign({},HomeState,{bannerList,advertisement,areaList})
  },
  getHomeState(){
    return HomeState
  },
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case AppConstants.GET_HOME_DATA:
					   HomeStore.saveHomeData(action.res)
             HomeStore.emitChange()
					break;

		  }

	})

});
module.exports = HomeStore;
