'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import AppString from '../../Constants/AppString';
import AuthAction from '../../Actions/AuthAction';
import AuthStore from '../../Stores/AuthStore';

import InputAnimation from './InputAnimation';

const {width,height} = Dimensions.get('window');
// const(refs): define view refeneces
const USERNAME_INPUTREF = 'Username_Input';
const PASSWORD_INPUTREF = 'Password_Input';
const SUBMIT_BUTTON = 'Submit_Button';

var WeChat = require('react-native-wechat');
const scope = 'snsapi_userinfo';
const state = 'wechat_sdk_demos';
const appid = 'wx20fd1aeb9b6fcf82';

export default class LogoAnimationView extends Component {
  constructor(){
    super()
		this.state = AuthStore.loginState()
    this._handleLogin 		= this._handleLogin.bind(this);
		this._handleUsername 	= this._handleUsername.bind(this);
	  this._handlePassword 	= this._handlePassword.bind(this);
		this._handleWechatLogin = this._handleWechatLogin.bind(this);
		this._handleLogin 		= this._handleLogin.bind(this);
		this._onChange 				= this._onChange.bind(this);
  }
	_viewOpacity =  new Animated.Value(1);
	async componentDidMount() {
		const registerResult = await WeChat.registerApp(appid);
		const  isWXAppInstalled = await WeChat.isWXAppInstalled()
		this.setState({
			isWXAppInstalled:isWXAppInstalled
		})
		AuthStore.addChangeListener(this._onChange);
	}
	componentWillUnmount(){
		AuthStore.removeChangeListener(this._onChange);
	}
	_onChange(){
      this.setState(AuthStore.loginState())
      //!Importment for the logout  AuthStore.removeChangeListener( this._onChange )
			if(this.state.loginSuccess){
				Animated.timing(this._viewOpacity, {
						toValue: 0,
						delay: 1000,
						duration: 2500,
				}).start()
				this.props.goToHome();
			}
  }
	_handleUsername(username){
  	this.setState({
			username:username
		})
  }
	_handlePassword(password){
		this.setState({
			password:password
		})
  }
  _handleLogin(){
		this.setState({
			showLoading:true,
		})
		setTimeout(() => {
			const {username,password} = this.state;
			const io_data							= {username,password}
			AuthAction.doLogin(io_data)
		}, 300);

  }
	async _handleWechatLogin(event){
		try {
		 const version = await WeChat.getApiVersion();
		 const result = await WeChat.sendAuthRequest(scope, state);
		 const resCode = result.code;
		 const deviceToken = this.state.deviceToken;
		 const data = {resCode,deviceToken};
		 AuthAction.doWechatAuth(data);
		//  AuthService.doWechatAuth(data);

	 } catch (e) {
		 if(e == '-2'){
			 console.log(e)
		 }else{
			 console.error(e);
		 }

	 }
  }
  render(){
    return(
      <Animated.View style={[styles.container,{opacity:this._viewOpacity}]}>
        <View style={styles.bgImageWrapper}>
						 <Image source={require('./Image/background.png')}
										style={styles.backgroundImage}/>
				</View>

				<InputAnimation	is_username = {AppString('username')}
												is_password = {AppString('password')}
												is_login = {AppString('login')}
											  is_register = {AppString('register')}
											  is_forgot = {AppString('forgot')}
												is_wechat = {AppString('wechat')}
												ib_isWXAppInstalled = {this.state.isWXAppInstalled}
												is_copyright = {AppString('copyright')}
												is_version = {"2.3.1"}
												ib_loginSuccess = {this.state.loginSuccess}
												ib_showLoading = {this.state.showLoading}
											  if_handleLogin = {this._handleLogin}
												ir_USERNAME_INPUTREF = {USERNAME_INPUTREF}
												ir_PASSWORD_INPUTREF = {PASSWORD_INPUTREF}
												ir_SUBMIT_BUTTON = {SUBMIT_BUTTON}
												if_handleUsername = {this._handleUsername}
												if_handlePassword = {this._handlePassword}
												if_handleWechatLogin = {this._handleWechatLogin}/>

      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
		position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
  },
  bgImageWrapper: {
    position: 'absolute',
    top: 0, bottom: 0, left: 0, right: 0,
  },
  backgroundImage:{
    width:width,
    height:height,
  },

});


// <View ref={SUBMIT_BUTTON}style={{marginTop:15}}>
//   <FirstButton   handleLogin = {this._handleLogin}/>
// </View>
// <LoginWechat handleWechatLogin = {this.handleWechatLogin.bind(this)}/>
// <View style={{position:'absolute',bottom:5,width:width,alignItems:'center',backgroundColor:"rgba(0,0,0,0)"}}>
//   <Text allowFontScaling={false} style={{color:"#ffffff",marginBottom:5}}>
//     v2.3.0
//   </Text>
//   <Text allowFontScaling={false} style={{color:"#ffffff",fontSize:11}}>
//     {AppString('copyright')}
//
//   </Text>
// </View>
