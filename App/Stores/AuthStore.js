import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';
const CHANGE_EVENT = 'change';

const ERRROR_TITLE = AppConstants.ERRROR_TITLE;

let isAuthed = false;
let errorMessage= ''

const loginState = {
			username:'ace68723',
			password:'ace68723',
			showLoading:false,
			isAuthed:false,
	}

const AuthStore = Object.assign({},EventEmitter.prototype,{
	emitChange(){
			this.emit( CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
	},
	loginState (){
		return loginState
	},
	doLogin(login){

		// login.setState({
		// 	 showLoading:  true
		// });
		const username = login.state.username;
		const password = login.state.password;
		// AuthService.login(username,password)
		// 	.then((res) => {
		// 		loginState.showLoading=false;
		//
		// 	})
		// 	.catch((error) => {
		// 		loginState.showLoading=false;
		// 	})
	},
	loginSuccess(){
			loginState.showLoading = false;
			loginState.isAuthed = true;
			loginState.loginSuccess = true;
			loginState.errorMessage = null;
	},
	loginFail(errorMessage){
			errorMessage = errorMessage;
			loginState.showLoading = false;
			loginState.isAuthed = false;
			loginState.errorMessage = 'errorMessage';
	},
	logout(){
		loginState.isAuthed = false;
		loginState.username = '';
		loginState.password = '';
	},
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case AppConstants.DO_LOGIN:
						AuthStore.doLogin(action.login)
						AuthStore.emitChange()
					break;
				case AppConstants.LOGIN_SUCCESS:
						AuthStore.loginSuccess(action.loginSuccess)
						AuthStore.emitChange()
					break;
					case AppConstants.LOGIN_FAIL:
							AuthStore.loginFail(action.errorMessage)
							AuthStore.emitChange()
					break;
					case AppConstants.LOGOUT:
						AuthStore.logout()
						AuthStore.emitChange()
						break;
		  }

	})

});
module.exports = AuthStore;
