/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Alert,
  Dimensions,
  Image,
  ListView,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';


import MenuList from './MenuList';
import Header from '../General/Header';
import Background from '../General/Background';
import MenuHeader from './MenuHeader';

const {width,height} = Dimensions.get('window');
const EMPTY_CELL_HEIGHT = Dimensions.get('window').height > 600 ? 200 : 150;
class Menu extends Component {
    constructor(props){
      super();
      this.state = {
				anim: new Animated.Value(0), //for background image
        showMenuAnimation: new Animated.Value(0),
        left: new Animated.Value(7),
        right: new Animated.Value(7),
        height: new Animated.Value(200),
        MIV_Left: new Animated.Value(0),
        MIV_Right: new Animated.Value(0),
        MIV_RText: new Animated.Value(1),//restaurant info text init opactiy 1
        MIV_MText: new Animated.Value(0),//menu info text init opactiy 0
        MIV_MTime: new Animated.Value(0),//menu info time init opactiy 0
        menuListCoverOpacity:new Animated.Value(1),
        menuListLoading: new Animated.Value(0),
        HV_Top:new Animated.Value(-120),
        restaurantViewOpacity: new Animated.Value(1), // init opacity 0
        top:props.py,
        restaurantCardTop:props.py,
        restaurant:props.restaurant,
        renderMenuList:false,
        showMenuList:false,
        showHeader:false,
        scrollEnabled:false,
        cartTotals:'',
      };
      this._openMenuAnimation()
      this.showMenuInfoTime = this.showMenuInfoTime.bind(this);
      this._closeMenuAnimation = this._closeMenuAnimation.bind(this);
			this._goToMenuSearch = this._goToMenuSearch.bind(this);
      this._changeCartTotals = this._changeCartTotals.bind(this);
      this._goToCheckout = this._goToCheckout.bind(this);
      this._checkOpen = this._checkOpen.bind(this);
			this._handleScroll = this._handleScroll.bind(this);
    }
    componentDidMount(){
      const timeCovert = () => {
        if(this.state.restaurant.end_time<'05:00'){
          this.state.end_time = this.state.restaurant.end_time +' AM'
        }else{
          this.state.end_time = this.state.restaurant.end_time +' PM'
        }
        if(this.state.restaurant.start_time >= '12:00'){
          this.state.start_time = this.state.restaurant.start_time + ' PM'
        }else{
          this.state.start_time = this.state.restaurant.start_time + ' AM'
        }
      }
      timeCovert()
      const renderMenuList = () => {
        this.setState({
          renderMenuList:true,
        })
      }
      setTimeout(function () {
        renderMenuList()
      }, 600);

      const menuListLoading = () => {
        Animated.timing(this.state.menuListLoading, {
          toValue: 0.8,
          duration: 600,
        }).start();
      }
      setTimeout(function () {
        menuListLoading()
      }, 800);
      const scrollEnable = () => {
        this.setState({
          scrollEnabled:true
        })
      }
      setTimeout(function () {
        scrollEnable()
      }, 1500);

      const menuListCoverOpacity = () => {
        Animated.timing(this.state.menuListCoverOpacity, {
          toValue: 0,
          duration: 400,
        }).start();
      }
      setTimeout(function () {
        menuListCoverOpacity()
      }, 1500);

      const showMenuList = () => {
        this.setState({
          showMenuList:true
        })
      }
      setTimeout(function () {
        showMenuList()
      }, 1900);
    }
    _openMenuAnimation(){
      this.startAnimation = this.startAnimation.bind(this)
      const startAnimation = this.startAnimation;

      const hideRestaurantView = ()=>{
        Animated.timing(
          this.state.restaurantViewOpacity,
          {toValue: 0,
           duration: 400,
          }
        ).start();
      }
      const hideAnimatedView = ()=>{
        this.setState({
          showAnimatedView:false
        })
      }
      const showMenu = () =>{
        this.setState({
          showMenu:true
        })
      };
      setTimeout(function () {
        hideRestaurantView()
      }, 200);
      setTimeout(function () {
        // requestAnimationFrame(startAnimation)
        startAnimation()
      }, 200);
      setTimeout(function () {
        showMenu()
      },600)
    }
    startAnimation(){
      Animated.timing(this.state.showMenuAnimation, {
        toValue: 1,
        duration: 300,
      }).start();
      const showMenuInfoTime = this.showMenuInfoTime
      setTimeout(function () {
        showMenuInfoTime()
      }, 300);
      // Animated.timing(this.state.top, {
      //   toValue: 0,
      //   duration: 300,
      // }).start();
      // Animated.timing(this.state.left, {
      //   toValue: 0,
      //   duration: 300,
      // }).start();
      // Animated.timing(this.state.right, {
      //   toValue: 0,
      //   duration: 300,
      // }).start();
      // Animated.timing(this.state.height, {
      //   toValue: Dimensions.get('window').height,
      //   duration: 300,
      // }).start();
      // Animated.timing(this.state.MIV_Left, {
      //   toValue: 20,
      //   duration: 300,
      // }).start();
      // Animated.timing(this.state.MIV_Right, {
      //   toValue: 20,
      //   duration: 300,
      // }).start();
      // Animated.timing(this.state.MIV_RText, {
      //   toValue: 0,
      //   duration: 300,
      // }).start();
      // Animated.timing(this.state.MIV_MText, {
      //   toValue: 1,
      //   duration: 300,
      // }).start();

    }
    showMenuInfoTime(){
      Animated.timing(this.state.MIV_MTime, {
        toValue: 1,
        duration: 200,
      }).start();
    }
    _closeMenuAnimation(){
      if(this.props.message == 'FromHome'){
          this.props.navigator.pop();
      }else{
        this.setState({
          renderMenuList:false,
        })
        Animated.timing(this.state.showMenuAnimation, {
          toValue: 0,
          duration: 300,
        }).start();
        // Animated.timing(this.state.top, {
        //   toValue: this.state.restaurantCardTop,
        //   duration: 400,
        // }).start();
        // Animated.timing(this.state.left, {
        //   toValue: 7,
        //   duration: 400,
        // }).start();
        // Animated.timing(this.state.right, {
        //   toValue: 7,
        //   duration: 400,
        // }).start();
        // Animated.timing(this.state.height, {
        //   toValue: 200,
        //   duration: 400,
        // }).start();
        // Animated.timing(this.state.MIV_Left, {
        //   toValue: 0,
        //   duration: 400,
        // }).start();
        // Animated.timing(this.state.MIV_Right, {
        //   toValue: 0,
        //   duration: 400,
        // }).start();
        // Animated.timing(this.state.MIV_RText, {
        //   toValue: 1,
        //   duration: 400,
        // }).start();
        // Animated.timing(this.state.MIV_MText, {
        //   toValue: 0,
        //   duration: 400,
        // }).start();
        this.props.closeMenu();
      }
    }
		_goToMenuSearch(){
			this.props.navigator.push({
				 id: 'MenuSearch',
				 restaurant:this.state.restaurant,
			 })
		}
		_goToCheckout(){
			if(Number(this.state.cartTotals.total)>0){
				if(Number(this.state.cartTotals.total)>=Number(this.state.restaurant.start_amount)){
					this.props.navigator.push({
						id: 'Checkout',
						restaurant:this.state.restaurant,
					})
				}else{
					Alert.alert(
						'馋猫订餐提醒您',
						'不足'+this.state.restaurant.start_amount+'只能自取哦～',
						[
							{text: '取消', onPress: () => {}, style: 'cancel'},
							{text: '好哒', onPress: () => {
									 this.props.navigator.push({
											id: 'Checkout',
											restaurant:this.state.restaurant,
										})
									}
							},
						],
					);
				}

			}
		}
    _handleScroll( e: any) {
			return(
	      Animated.event(
	          [{nativeEvent: {contentOffset: {y: this.state.anim}}}]
	        )
	    )
			// if(e.nativeEvent.contentOffset.y < 300){
			// 	this.state.anim.setValue(e.nativeEvent.contentOffset.y);
			// 	const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
			// }
      // if(!this.state.showHeader && e.nativeEvent.contentOffset.y > 300){
      //   this.setState({
      //     showHeader:true
      //   })
      //   Animated.timing(this.state.HV_Top, {
      //     toValue: 0,
      //     duration: 200,
      //   }).start();
      // }else if(this.state.showHeader && this.state.cartTotals.total==0 && e.nativeEvent.contentOffset.y < 300){
      //   this.setState({
      //     showHeader:false
      //   })
      //   Animated.timing(this.state.HV_Top, {
      //     toValue: -70,
      //     duration: 200,
      //   }).start();
      // }
      // y = Math.min(e.nativeEvent.contentOffset.y, height);
    }

    menuList(){
      if(this.state.renderMenuList){
        return(<MenuList  restaurant={this.state.restaurant}
                          changeCartTotals={this._changeCartTotals}
                          checkOpen={this._checkOpen}
													handleScroll={this._handleScroll}
													closeMenuAnimation = {this._closeMenuAnimation}
													goToMenuSearch = {this._goToMenuSearch}

													MIV_MTime = {this.state.MIV_MTime}
													start_time = {this.state.start_time}
													end_time = {this.state.end_time}
													showMenuAnimation = {this.state.showMenuAnimation}

													animatedImage={this.props.restaurant.imgUrl}/>)
      }
    }
    menuListCover(){
      if(!this.state.showMenuList){
        return(<Animated.View style={{backgroundColor:'#f4f4f7',
                              left:0,
                              right:0,
                              bottom:0,
                              top:0,
                              flex:1,
                              opacity:this.state.menuListCoverOpacity,
                              position:'absolute',}}>
                              <Animated.View style={{alignItems: 'center',
                                            top:30,
                                            opacity:this.state.menuListLoading}}>
                  						  <Image
                  							style={{  height: 40,width:44,}}
                  							source = { require('./Image/chanmao_logo.gif') }
                  						  />
                  						  <Text style={{fontSize:11}}>快到碗里来 </Text>
                  					  </Animated.View>
                </Animated.View>)
      }
    }
    _changeCartTotals(cartTotals){
      this.setState({
        cartTotals:cartTotals
      })
      if(cartTotals.total>0 ){
        this.setState({
          showHeader:true
        })
        Animated.timing(this.state.HV_Top, {
          toValue: 0,
          duration: 200,
        }).start();
      }else if(this.state.showHeader){
        this.setState({
          showHeader:false
        })
        Animated.timing(this.state.HV_Top, {
          toValue: -120,
          duration: 200,
        }).start();
      }
    }
    _checkOpen(open){
      if(open == 1){
        this.setState({
          close:false
        })
      }else{
        this.setState({
          close:true
        })
      }
    }

    _header(){

        if(!this.state.close){
          const _rightButtonText = '$'+this.state.cartTotals.total+'结账';
          return(
            <Animated.View style={{top:this.state.HV_Top,
                                  position:'absolute',left:0,right:0,
                                }}>
              <Header title={this.state.restaurant.name}
                      goBack={this._closeMenuAnimation}
                      leftButtonText={'×'}/>
							<TouchableOpacity onPress={this._goToMenuSearch}
											 style={{position:"absolute",top:30,right:15,}}>
								<Image style={{width:18,height: 20,}}
											 source={require('./Image/icon_search_input.png')}/>
							</TouchableOpacity>
							<TouchableOpacity onPress={this._goToCheckout}
													style={{backgroundColor:"rgba(234,123,33,0.9)",
														width:width,
														height:50,
														position:'absolute',
												    top:64,
														flexDirection:"row",
														alignItems:"center",
														justifyContent:"center",
													}}>
								<Text style={{color:"#ffffff",fontSize:16,margin:3}}>${this.state.cartTotals.total}</Text>
								<View style={{margin:3,
															borderRadius:15,
															borderWidth:1,
															paddingLeft:10,
															paddingRight:10,
															paddingTop:2,
															paddingBottom:2,
															borderColor:"#ffffff"}}>
									<Text  style={{color:"#ffffff",fontSize:13,}}>去结账</Text>
								</View>

							</TouchableOpacity>

            </Animated.View>
          )
        }else{
          const _rightButtonText = '商家休息了';
          return(
            <Header title={this.state.restaurant.name}
                    goBack={this._closeMenuAnimation}
                    leftButtonText={'×'}
                    rightButton={() => {}}
                    rightButtonText={_rightButtonText}/>
          )
        }

    }
    render(){
      // Dimensions.get('window').height
      return(
        <Animated.View style={{top:this.state.showMenuAnimation.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [this.state.top,0],
                                  }),
                              position:'absolute',left:0,right:0,
                              marginLeft:this.state.showMenuAnimation.interpolate({
                                                          inputRange: [0, 1],
                                                          outputRange: [7,0],
                                                        }),
                              marginRight:this.state.showMenuAnimation.interpolate({
                                                          inputRange: [0, 1],
                                                          outputRange: [7,0],
                                                        }),
                              height:this.state.showMenuAnimation.interpolate({
                                                          inputRange: [0, 1],
                                                          outputRange: [200,Dimensions.get('window').height],
                                                        }),
                              overflow:'hidden',
                            }}>
					<Background
							 minHeight={0}
							 maxHeight={230}
							 offset={this.state.anim}
							 backgroundImage={this.props.restaurant.imgUrl}
							 backgroundShift={0}
							 backgroundColor={"rgba(0,0,0,0)"}>
					 </Background>

					 <MenuHeader
					 		offset={this.state.anim}
	 						MIV_MTime = {this.state.MIV_MTime}
	 						start_time = {this.state.start_time}
	 						end_time = {this.state.end_time}
	 						showMenuAnimation = {this.state.showMenuAnimation}
	 						restaurant = {this.state.restaurant}/>

					 {this.menuList()}

					 {this._header()}


        </Animated.View>
      )
    }
}
// {this.menuListCover()}

// <ScrollView style={[styles.container]}
// 						scrollEventThrottle= {16}
// 						onScroll={ (e) => this._handleScroll(e)}
// 						ref='_scrollView'
// 						scrollEnabled={this.state.scrollEnabled}>
// </ScrollView>

let styles = StyleSheet.create({
  rightButton:{
    position:'absolute',
    top:0,
    right:10,
    height:20,
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#363646',
    borderWidth:2,
    borderRadius:8,
    paddingLeft:5,
    paddingRight:5,
  },
  rightButtonText:{
    fontSize:16,
    color:'#363646',
  },
});

module.exports = Menu;
