'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
	Easing,
  Image,
	Keyboard,
  StyleSheet,
  Text,
	TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import LoginButton from './LoginButton';
import AuthStore from '../../Stores/AuthStore';

const {width,height} = Dimensions.get('window');
export default class InputAnimation extends Component {
	  static propTypes = {
			is_username :  React.PropTypes.string.isRequired,
			is_password :  React.PropTypes.string.isRequired,
			is_login :  React.PropTypes.string.isRequired,
			is_register :  React.PropTypes.string.isRequired,
			is_forgot :  React.PropTypes.string.isRequired,
			is_wechat :  React.PropTypes.string.isRequired,
			is_copyright :  React.PropTypes.string.isRequired,
			is_version :  React.PropTypes.string.isRequired,

			ir_USERNAME_INPUTREF : React.PropTypes.string.isRequired,
			ir_PASSWORD_INPUTREF : React.PropTypes.string.isRequired,
			ir_SUBMIT_BUTTON : React.PropTypes.string.isRequired,

			if_handleLogin : React.PropTypes.func.isRequired,
			if_handleUsername : React.PropTypes.func.isRequired,
			if_handlePassword : React.PropTypes.func.isRequired,
			if_handleWechatLogin : React.PropTypes.func.isRequired,
	  }
	  constructor(){
	    super()
	    this.state={
	      	viewBottom:new Animated.Value(0),
	        logoOpacity:new Animated.Value(1),
	        lineLeft:0,
	        lineTop:0,
	        lineWidth: new Animated.Value(0),
	        viewOpacity: new Animated.Value(1),
					transitionTop:new Animated.Value(0),
					transitionLeft:new Animated.Value(width*0.46),
					transitionWidth:new Animated.Value(0),
					transitionHight:new Animated.Value(0),
					transitionRadius:new Animated.Value(30),
	    }
			this._hideKeyboard = this._hideKeyboard.bind(this);
	    this._keyboardWillShow = this._keyboardWillShow.bind(this);
	    this._keyboardWillHide = this._keyboardWillHide.bind(this);
			this._onChange 				= this._onChange.bind(this);
	  }
	  componentWillMount(){
      //System(Gesture):  handle view Gesture Response
       this._gestureHandlers = {
         onStartShouldSetResponder: ()=>{
           this._hideKeyboard();
         }
       }

       //Event(Keybaord): hanlde keybord event, add keyabord event listener
        this._keyboardWillShowSubscription = Keyboard.addListener('keyboardWillShow', (e) => this._keyboardWillShow(e));
        this._keyboardWillHideSubscription = Keyboard.addListener('keyboardWillHide', (e) => this._keyboardWillHide(e));
				this._handleLogin = this._handleLogin.bind(this);

    }
    componentDidMount(){
			 AuthStore.addChangeListener(this._onChange);
		}
    componentWillUnmount() {
      // Event(Keybaord): remove keybaord event
      this._keyboardWillShowSubscription.remove();
      this._keyboardWillHideSubscription.remove();
    }
		_onChange(){
			if(AuthStore.loginState().loginSuccess){
				setTimeout( () => {
					this._transition()
				}, 10)
			}
	  }
		_keyboardWillShow(e) {
        // keyboard(e.endCoordinates.height): get keyboard height
        const keyboardHeight = e.endCoordinates.height;

			  // submitButton(position): get submitButton position
        this.refs[this.props.ir_SUBMIT_BUTTON].measure((ox, oy, width, objectHeight, px, py) =>{
            // submitButton(marginBottom)
            const submitButton = height - py - objectHeight;
            // if true, submitButton has covered by keyboard
            if(keyboardHeight>submitButton ){
              //View(bottom): add enough space for keyboard appear

              Animated.timing(this.state.viewBottom, {
                  toValue: keyboardHeight-submitButton + 60,
                  easing: Easing.out(Easing.quad),
                  duration: 300,
              }).start()
              // View(logo): logo fadeout;
              Animated.timing(this.state.logoOpacity, {
                  toValue: 0,
                  easing: Easing.out(Easing.quad),
                  duration: 300,
              }).start()

            }
         });
         this._onFocus()


    }
    _keyboardWillHide(e) {
      //View(bottom): init viewBottom to default
      Animated.timing(this.state.viewBottom, {
          toValue: 0,
          easing: Easing.out(Easing.quad),
          duration: 300,
        }).start()
        Animated.timing(this.state.logoOpacity, {
            toValue: 1,
            easing: Easing.out(Easing.quad),
            duration: 300,
        }).start()
        // view(inputLine)
        Animated.sequence([
            Animated.delay(100),
            Animated.timing(this.state.lineWidth, {
                toValue: 0,
                duration: 300,
              })
        ]).start()
    }
		_hideKeyboard(){
      // keyboar(hide): hide keyboard by blur input
      this.refs[this.props.ir_USERNAME_INPUTREF].blur()
      this.refs[this.props.ir_PASSWORD_INPUTREF].blur()
    }
    _onFocus(){
        this.refs[this.props.ir_USERNAME_INPUTREF].measure((ox, oy, width, height, px, py) =>{
          this.renderAnimationLine(ox,oy,width,height)
        });
    }
		_handleLogin(){
			this.props.if_handleLogin();
			this._hideKeyboard();
		}
		_transition(){
			this.refs[this.props.ir_SUBMIT_BUTTON].measure((ox, oy, objectWidth, objectHeight, px, py) =>{
					this.state.transitionTop.setValue(oy);
					Animated.parallel([
							Animated.timing(this.state.transitionTop, {
									toValue: -200,
									duration: 600,
							}),
							Animated.timing(this.state.transitionLeft, {
									toValue: -250,
									duration: 600,
							}),
							Animated.timing(this.state.transitionWidth, {
									toValue: height+400,
									duration: 600,
							}),
							Animated.timing(this.state.transitionHight, {
									toValue: height+400,
									duration: 600
							}),
							Animated.timing(this.state.transitionRadius, {
									toValue: height+400,
									duration: 600,
							}),
					]).start()
			 });
		}
    renderAnimationLine(lineLeft,lineTop,lineWidth,objectHeight){
      // console.log(lineWidth,lineTop)
      this.setState({
        lineLeft:lineLeft,
        lineTop:lineTop+objectHeight,
        // lineWidth:lineWidth,
      })
      Animated.sequence([
          Animated.delay(100),
          Animated.timing(this.state.lineWidth, {
              toValue: lineWidth,
              duration: 300,
            })
      ]).start()

    }
		_renderTransitionView(){



				return(
					<Animated.View style={{
												position:"absolute",
												top:this.state.transitionTop,
												left:this.state.transitionLeft,
												width:this.state.transitionWidth,
												height:this.state.transitionHight,
												borderRadius:this.state.transitionRadius,
												backgroundColor:"#ff8b00",}}>
					</Animated.View>
				)

		}
		_renderWechat(){
			if(this.props.ib_isWXAppInstalled){
				return(
					<TouchableOpacity
						style={styles.wechatView}
						onPress = { this.props.if_handleWechatLogin }>
						<Image source={require('./Image/wechat.png')} style={styles.wechatButton} >
							<Text style={styles.wechatButtonText}>
								 {this.props.is_wechat}
							</Text>
						</Image>
				 </TouchableOpacity>
				)
			}
		}
	  render(){

	    return(
	      <Animated.View style={{flex:1,paddingLeft:width*0.1562,paddingRight:width*0.1562,bottom:this.state.viewBottom}} {...this._gestureHandlers}>


							<Animated.View style={{opacity:this.state.logoOpacity,marginTop:height*0.1042}}>
							<View style={styles.logoBox}>
									<Image source={require('./Image/logo.png')} style={{width:240,height:80}} />
						 </View>
							</Animated.View>

	            <TextInput
	                  style={[styles.input,{marginTop:height*0.068}]}
	                  placeholder={this.props.is_username}
	                  placeholderTextColor={'#ffffff'}
	                  selectionColor={'#ea7b21'}
	                  keyboardType = { 'url'}
	                  autoCorrect= { false}
	                  returnKeyType={'next'}
	                  ref={this.props.ir_USERNAME_INPUTREF}
	                  onChangeText={this.props.if_handleUsername}
	              />
	             <View style={{height:1,
	                           backgroundColor:'#ffffff',}}>
	             </View>
	            <TextInput
	                    style={styles.input}
	                    placeholder={this.props.is_password}
	                    placeholderTextColor={'#ffffff'}
	                    selectionColor={'#ea7b21'}
	                    keyboardType = { 'email-address'}
	                    autoCorrect= { false}
	                    returnKeyType={'next'}
	                    secureTextEntry={true}
	                    ref={this.props.ir_PASSWORD_INPUTREF}
	                    onChangeText={this.props.if_handlePassword}
	                />
								<View ref={this.props.ir_SUBMIT_BUTTON} >
									<LoginButton is_login = {this.props.is_login}
															 is_register = {this.props.is_register}
															 is_forgot = {this.props.is_forgot}
															 if_handleLogin = {this._handleLogin}
															 if_openAdView = {this.props.if_openAdView}
															 ib_showLoading = {this.props.ib_showLoading}
															 />
								</View>
								{this._renderWechat()}

							 <View style={{position:'absolute',bottom:5,width:width,alignItems:'center',backgroundColor:"rgba(0,0,0,0)"}}>
	                  <Text allowFontScaling={false} style={{color:"#ffffff",marginBottom:5}}>
	                    {this.props.is_version}
	                  </Text>
	                  <Text allowFontScaling={false} style={{color:"#ffffff",fontSize:11}}>
											{this.props.is_copyright}

	                  </Text>
	              </View>

	              <Animated.View style={{position:'absolute',
	                                     left:this.state.lineLeft,
	                                     top:this.state.lineTop,
	                                     width:this.state.lineWidth,
	                                     height:2,
	                                     backgroundColor:'#ff8b00',}}>
	              </Animated.View>
								{this._renderTransitionView()}

	        </Animated.View>
	    )
	  }
}
const styles = StyleSheet.create({
  container: {
    alignItems:'center',
  },
	logoBox: {
      flexDirection: 'row',
      height: 100,
      alignSelf: 'center',
  },
  loginText: {
    fontSize: 22,
    color: '#fff',
    backgroundColor:'rgba(0,0,0,0)',
    marginTop:-3,
  },
	input:{
    fontSize: 18,
    borderRadius: 8,
    color: '#ffffff',
    height:40,
    marginTop:5,
  },
  button:{
    width:width*0.6876,
    height:height*0.0765,
    alignItems:'center',
    justifyContent:'center',
  },
  registerView:{
    flexDirection:"row",
    width:width*0.6576,
    marginTop:5,
    backgroundColor:"rgba(0,0,0,0)"
  },
  registerText:{
    flex:1,
    fontSize:15,
    fontWeight:"500",
    color:"#ffffff",
    marginBottom:5
  },
  forgotText:{
    flex:1,
    fontSize:15,
    fontWeight:"500",
    color:"#ffffff",
    marginBottom:5,
    textAlign:"right"
  },
	wechatView:{
    position:'absolute',
    right:0,
    left:0,
    bottom:height*0.08,
    alignItems:'center',
  },
  wechatButtonText: {
    marginLeft:width*0.4782*0.3,
    fontSize: 18,
    color: '#71be43',
    backgroundColor:'rgba(0,0,0,0)'
  },
  wechatButton:{
    width:width*0.4782,
    height:width*0.4782*0.3828,
    alignItems:'center',
    justifyContent:'center',
  },
});
