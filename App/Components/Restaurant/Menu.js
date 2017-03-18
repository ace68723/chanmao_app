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
  InteractionManager,
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
      super()
      this.state = {
        anim: new Animated.Value(0), //for background image
        showMenuAnimation: new Animated.Value(0),
        menuListCoverOpacity:new Animated.Value(1),
        HV_Top:new Animated.Value(-120),
        restaurantViewOpacity: new Animated.Value(0), // init opacity 0
        restaurantCardTop:new Animated.Value(props.py),
        restaurantCardMargin:new Animated.Value(7),
        top:props.py,
        restaurant:props.restaurant,
        renderMenuList:true,
        showHeader:false,
        renderCloseBtn:false,
        cartTotals:'',
      };
      this._closeMenuAnimation = this._closeMenuAnimation.bind(this);
      this._handleScroll = this._handleScroll.bind(this);
    }

    componentDidMount(){
      setTimeout( () =>{
        this._openMenuAnimation()
        this.setState({
          renderCloseBtn:true,
        })
      }, 100);

    }
    _openMenuAnimation(){
      	InteractionManager.runAfterInteractions(() => {
          Animated.parallel([
            Animated.timing(this.state.restaurantCardTop, {
              toValue: 0,
              duration: 400,
            }),
            Animated.timing(this.state.restaurantViewOpacity, {
              toValue:1,
              duration: 400,
            }),
            Animated.timing(this.state.restaurantCardMargin, {
              toValue:0,
              duration: 400,
            }),
            Animated.timing(this.state.showMenuAnimation, {
              toValue:1,
              duration: 400,
            })
          ]).start()
          setTimeout(()=>{
            this.setState({
              renderCloseBtn:true,
            })
          }, 400);
        })
    }

    _closeMenuAnimation(){
      this.setState({renderMenuList:false,renderCloseBtn:false,})
      InteractionManager.runAfterInteractions(() => {
        Animated.parallel([
          Animated.timing(this.state.restaurantCardTop, {
            toValue: this.state.top,
            duration: 400,
          }),
          Animated.timing(this.state.restaurantViewOpacity, {
            toValue: 0,
            duration: 400,
          }),
          Animated.timing(this.state.restaurantCardMargin, {
            toValue:7,
            duration: 400,
          }),
          Animated.timing(this.state.showMenuAnimation, {
            toValue:0,
            duration: 400,
          })
        ]).start()
        this.MenuHeader.close();
        setTimeout( ()=> {
          this.props.navigator.pop();
        }, 500);
      })




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

    }

    _renderMenuList(){
      // console.log(this.state)
      if(this.state.renderMenuList){
        return(<MenuList  restaurant={this.state.restaurant}
                          changeCartTotals={this._changeCartTotals}
                          checkOpen={this._checkOpen}
													handleScroll={this._handleScroll}
													closeMenuAnimation = {this._closeMenuAnimation}
													goToMenuSearch = {this._goToMenuSearch}
													showMenuAnimation = {this.state.showMenuAnimation}/>)
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
								<Text style={{color:"#ffffff",fontSize:16,margin:3,fontFamily:'FZZongYi-M05S',}}>${this.state.cartTotals.total}</Text>
								<View style={{margin:3,
															borderRadius:15,
															borderWidth:1,
															paddingLeft:10,
															paddingRight:10,
															paddingTop:2,
															paddingBottom:2,
															borderColor:"#ffffff"}}>
									<Text  style={{color:"#ffffff",fontSize:13,fontFamily:'FZZongYi-M05S',}}>去结账</Text>
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
    _renderClose(){
      if(this.state.renderCloseBtn){
        return(
          <TouchableOpacity style={{paddingTop:22,
                                    paddingLeft:8,
                                    paddingRight:20,
                                    paddingBottom:20,
                                    position:'absolute',
                                    top:0,
                                    left:0,}}
                            onPress={this._closeMenuAnimation}>
            <View style={{width:30,height:30,borderRadius:15,backgroundColor:"rgba(0,0,0,0.4)"}}>
              <Text style={{fontSize:25,textAlign:"center",color:"#ffffff",marginTop:-2}}>
                ×
              </Text>
            </View>
          </TouchableOpacity>

        )
      }
    }
    _renderSearch(){
      if(this.state.renderCloseBtn){
        return(
          <TouchableOpacity style={{paddingTop:22,
                                      paddingRight:20,
                                      paddingBottom:20,
                                      position:'absolute',
                                      top:0,
                                      right:0,}}
                              onPress={this.props.goToMenuSearch}>
              <Image style={{  height: 40,width:44,}}
                   source = { require('./Image/button_search.png') }/>
          </TouchableOpacity>
        )
      }
    }
    _renderRestaurantImage(){
      // return (
      // )
    }
    render(){


      // Dimensions.get('window').height   style={{flex:1,backgroundColor:'rgba(0, 0, 0,0)'}}
      //    <Header title={this.state.restaurant.name}
                //  goBack={this._closeMenuAnimation}
                //  leftButtonText={'×'}/>
                // <MenuHeader
                //    offset={this.state.anim}
                //    MIV_MTime = {this.state.MIV_MTime}
                //    start_time = {this.state.start_time}
                //    end_time = {this.state.end_time}
                //    showMenuAnimation = {this.state.showMenuAnimation}
                //    restaurant = {this.state.restaurant}/>
      return(
        <View style={{flex:1,backgroundColor:'rgba(0, 0,0,0)'}}>
          <Animated.View style={{position:'absolute',
                                 backgroundColor:"#ffffff",
                                 left:0,top:0,right:0,bottom:0,
                                 opacity:this.state.restaurantViewOpacity
                               }}>
          </Animated.View>
          <View style={{position:'absolute',
                                 backgroundColor:"#ffffff",
                                 left:0,top:this.state.top,right:0,height:254,
                               }}>
          </View>
          <Animated.View style={{top:this.state.restaurantCardTop,
                                 marginLeft:this.state.restaurantCardMargin,
                                 marginRight:this.state.restaurantCardMargin,
                               }}>
            <Background
                 minHeight={0}
                 maxHeight={230}
                 offset={this.state.anim}
                 backgroundImage={{uri:this.props.restaurant.mob_banner}}
                 backgroundShift={0}
                 backgroundColor={"rgba(0,0,0,0)"}>
             </Background>
             <MenuHeader
                ref={(MenuHeader) => { this.MenuHeader = MenuHeader; }}
                minHeight={0}
                maxHeight={230}
                offset={this.state.anim}
                restaurant = {this.state.restaurant}
                py={this.props.py}
                start_time = {this.props.restaurant.start_time}
                end_time = {this.props.restaurant.end_time}
                />
          </Animated.View>
          <View style={{position:'absolute',left:0,top:0,right:0,bottom:0,}}>
            {this._renderMenuList()}
          </View>

          {this._header()}
          {this._renderClose()}
          {this._renderSearch()}


        </View>
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
