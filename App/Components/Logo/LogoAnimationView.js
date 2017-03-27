'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  Image,
	InteractionManager,
	StyleSheet,
  Text,
	TouchableOpacity,
  View,
} from 'react-native';
import Auth from '../../Modules/AuthModule/Auth';
import Advertisement from './Advertisement';
import AdLogo from './AdLogo';
import Copyright from './Copyright';
import AdView from '../General/AdView';

const {width,height} = Dimensions.get('window');
export default class LogoAnimationView extends Component {
  static propTypes = {
      unmount: React.PropTypes.func.isRequired,
  }
  constructor() {
    super();
    this.state = {
      firstTime:true,
      stage: 0,
      timeout:1500,
			showLogoView:true,
      logoOpacity:new Animated.Value(1),
			viewOpacity:new Animated.Value(1),
    }
		this._getAd = this._getAd.bind(this);
		this._openAdView = this._openAdView.bind(this);

  }
  async componentDidMount(){


				InteractionManager.runAfterInteractions(() => {
					if(this.props.shortLogo){
						this.setState({
							stage:4
						})
						this._startShortAnimation();
						setTimeout( ()=> {
							this._getAd();
						}, 3000);
					}else{
						this._startLongAnimation();
					}
				})

  }
  _startShortAnimation(){
    // fade out LogoAnimationView
    setTimeout(() =>{
			InteractionManager.runAfterInteractions(() => {
	      Animated.timing(this.state.logoOpacity, {
	        toValue: 0,
	        duration: 400,
	      }).start();
			})
    }, 5500);
		setTimeout(() =>{
			this.setState({
				showLogoView:false,
			})
		}, 6000);

		setTimeout(() =>{
			Animated.timing(this.state.viewOpacity, {
				toValue: 0,
				duration: 400,
			}).start();
		}, 8500);

		setTimeout(() =>{
			if(!this.state.renderAdWebview){
				this.props.unmount();
			}
		}, 9000);

  }
  _startLongAnimation(){
    const chageStage = () => {
      if(this.state.stage == 3){
        clearInterval(interval);
      }
      this.setState({
        stage:this.state.stage+1,
      })
    }
    const interval = setInterval(function () {
      chageStage()
    }, this.state.timeout);

    // fade out LogoAnimationView
    setTimeout(() =>{
      Animated.timing(this.state.viewOpacity, {
        toValue: 0,
        duration: 400,
      }).start();
    }, 12000);
    // fade out LogoAnimationView end

    // unmount view
    setTimeout(() =>{
      this.props.unmount();
    }, 12500);

  }
	_getAd(){
		const url = "https://chanmao.ca/index.php?r=MobAd10/AdLaunch";
		let options = {
				method: 'GET',
				mode:'cors',
				headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
				}
		}
		fetch(url,options)
			.then((res) => res.json())
			.then((res)=>{
				if(res.result == 0 ){
					// res.image = '';

					if(res.image){
						this.setState({
							AdImage: res.image,
							AdUrl: res.navigation,
							showAd:true,
						})
					}else{
						this.setState({
							showAd:false,
						})
					}
				}else{
					this.setState({
						showAd:false,
					})
					// AuthService.doAuth()
				}
			})
			.catch((error) => {throw error})
	}
	_openAdView(){
		InteractionManager.runAfterInteractions(() => {
			this.setState({
				renderAdWebview:true,
			})
			this.props.navigator.push({
				id: 'AdView',
				url:this.state.AdUrl,
			})
		})
	}
	_renderAnimation(){
      switch (this.state.stage) {
        case 1:
          return(<Image style={{
                         width:300,
                         height:300,
                         position:'absolute',
                         bottom:0,
                         right:0,
                        }}
                 source={require('./Image/1.gif')} />)
          break;
          case 2:
            return(<Image style={{
                           width:300,
                           height:300,
                           position:'absolute',
                           bottom:0,
                           left:0,}}
                   source={require('./Image/2.gif')} />)
            break;
          case 3:
            return(<Image style={{
                           width:300,
                           height:300,
                           position:'absolute',
                           top:0,
                           right:0,}}
                   source={require('./Image/3.gif')} />)
            break;
            case 4:
						  // AuthService.doAuth();
              return(
									<Image style={{
                             width:300,
                             height:300,
                             alignSelf:'center'}}
                     source={require('./Image/4.gif')} />)

              break;
        default:

      }
    }
	_renderLogoView(){
		if(this.state.showLogoView){
			return(
				<Animated.View style={{ position:'absolute',
														left:0,
														right:0,
														top:0,
														bottom:0,
														backgroundColor:'#ffffff',
														opacity:this.state.logoOpacity,
														justifyContent:'center'}}>

					{this._renderAnimation()}
				</Animated.View>
			)
		}
	}
	_renderAdView(){
		if(this.state.showAd){
			return(
				<View style={[styles.mainContainer,{backgroundColor:'#ffffff'}]}>
						<Advertisement AdImage = {this.state.AdImage} openAdView = {this._openAdView}/>
						<TouchableOpacity style={{position:'absolute',
																			top:30,
																			right:20,
																			padding:6,
																			backgroundColor:'rgba(151,151,151,0.5)',
																			borderRadius:5}}
															onPress={this._closeAd}>
							<Text style={{color:'#ffffff',fontSize:16,fontWeight:'600'}}>
								跳过
							</Text>
						</TouchableOpacity>
						<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
								<AdLogo width={180} height={60}/>
						</View>
						<Copyright />
				</View>
			)
		}
	}
	render(){
      return(
				<Animated.View style={{position:'absolute',
														left:0,
														right:0,
														top:0,
														bottom:0,
													  opacity:this.state.viewOpacity,}}>

					{this._renderAdView()}
					{this._renderLogoView()}
				</Animated.View>


      )
    }
}
const styles = StyleSheet.create({
  mainContainer: {
    position:'absolute',
    top:0,left:0,right:0,bottom:0,
  },
});
