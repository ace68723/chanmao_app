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
  Easing,
	Keyboard,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
	TouchableWithoutFeedback,
  View,
} from 'react-native';

import Background from '../General/Background';
import CheckoutCard from './CheckoutCard';
import Address from './Address';
// import Picker from './Picker';
import CartItem from './CartItem';
import Header from '../General/Header';
import Loading from '../Helpers/Loading';
import CheckoutItem from './CheckoutItem';
import CheckoutComment from './CheckoutComment';
import RestaurantService from '../../Services/RestaurantService';
// import RestaurantStore from '../../Stores/RestaurantStore';
import RestaurantStore from '../../Stores/RestaurantStore';
import MenuStore from '../../Stores/MenuStore';
import RestaurantAction from '../../Actions/RestaurantAction';
// device(size): get device height and width
const {height, width} = Dimensions.get('window');
const deviceHeight = height;
const deviceWidth = width;


// const(refs): define comment refeneces
const COMMENT_INPUT = 'Comment_Input';
const EMPTY_CELL_HEIGHT = Dimensions.get('window').height > 600 ? 200 : 150;
class Confirm extends Component {
    constructor(props) {
        super(props);
        const cart = MenuStore.getCart()
        const total = MenuStore.getCartTotals().total
        const state={ cart,
                      total,
											rid:this.props.restaurant.rid,
                      startAmount:this.props.restaurant.start_amount,
                      viewBottom:new Animated.Value(0),
											anim: new Animated.Value(0), //for background image
											AnimatedImage:props.restaurant.imgUrl,
											renderAddress:false,
                    }
				this.state = Object.assign({},state,RestaurantStore.getCheckoutSate())
        this._onChange = this._onChange.bind(this);
        this._updateUaid = this._updateUaid.bind(this);
        this._updateDltype = this._updateDltype.bind(this);
        this._calculateDeliveryFee = this._calculateDeliveryFee.bind(this);
        this._checkout = this._checkout.bind(this);
        this._goBack = this._goBack.bind(this);
        this._goToAddressList = this._goToAddressList.bind(this);
        this._goToHistory = this._goToHistory.bind(this);
        this._doCheckout = this._doCheckout.bind(this);
        this._handleCommentChange = this._handleCommentChange.bind(this);
        this._handleSubmitComment = this._handleSubmitComment.bind(this);

    }
    componentWillMount(){
			this._gestureHandlers = {
				onResponderRelease: ()=>{
					// console.log('onResponderRelease',this.state.anim._value)
					// if(this.state.showBanner && this.state.anim._value>10 && this.state.anim._value<114){
					// 	 this._scrollView.scrollTo({y: 114});
					// 	 this.setState({
					// 		 showBanner:false,
					// 	 })
					// }
					// if(!this.state.showBanner && this.state.anim._value<110 && this.state.anim._value<114 ){
					// 	 this._scrollView.scrollTo({y: 0});
					// 	 this.setState({
					// 		showBanner:true,
					// 	})
					// }
				}
			}
    }
    componentDidMount(){
			const rid = this.state.rid;
			const pretax = this.state.total;
			const navigator = this.props.navigator;
			const startAmount = this.state.startAmount;
			setTimeout(()=>{
				RestaurantAction.beforCheckout(rid,pretax,navigator,startAmount);
				this.setState({renderAddress:true})
			}, 500);
      RestaurantStore.addChangeListener(this._onChange);
    }
    componentWillUnmount() {
      RestaurantStore.removeChangeListener(this._onChange);
    }
    _onChange(){
        this.setState(RestaurantStore.getCheckoutSate());
				console.log("Checkout State update",this.state);
				if(this.state.checkoutSuccessful){
					this._goToHistory();
				}
    }

    _updateUaid(address){

      if(address && address.uaid){
        const uaid = address.uaid;
        this.setState({
          uaid:uaid,
        })
        this._calculateDeliveryFee()
      }
    }
    _updateDltype(deliverType){
			this.setState({dltype:deliverType.type})
			const dltype = deliverType.type
			RestaurantAction.updateDltype(dltype);
    }
    _calculateDeliveryFee(){
        RestaurantAction.calculateDeliveryFee()
    }
    _doCheckout(){
      this.setState({
        isLoading:true,
      })
      RestaurantAction.checkout();
    }
    _checkout(){
      let dldec;
      switch (this.state.dltype) {
        case 0:
          dldec = '自取'
        break;
        case 1:
          dldec = '送餐'
        break;
        case 2:
          dldec = '定制运费'
        break;
      }

      Alert.alert(
        dldec,
        '  税后总价: $' + this.state.total + '\n' +
        '确认就不可以修改了哟～' ,
        [ {text:'取消',onPress:() => {}, style: 'cancel'},
          {text: '确认', onPress: () => this._doCheckout()},
        ],
      );
    }
    _goBack(){
      this.props.navigator.pop();
    }
    _goToAddressList(){
      this.props.navigator.push({
        id: 'AddressList',
      });
    }
    _goToHistory(){
      this.props.navigator.popToTop();
    }
    showLoading(){
      if(this.state.isLoading)
        return(<Loading />)
    }
    _handleCommentChange(comment){
      this.setState({
        comment:comment,
      });
    }
    _handleSubmitComment(commentInput){
      this.commentInput = commentInput;
      commentInput.blur();
      if(this.state.comment.length>0){
        const pid = this.state.pid;
        const comment = this.state.comment;
        const view = 'comment';
        const data = {pid,comment,view};
        TheSixAction.submitComment(data);
      }
    }
		_goBack(){
			this.props.navigator.pop();
		}
		_handleScroll( e: any) {
      if(e.nativeEvent.contentOffset.y < 300){
        this.state.anim.setValue(e.nativeEvent.contentOffset.y);
        const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
      }
    }
		renderCheckoutButton(){
			//  && this.state.dltype!= -1
			// <View style={{alignItems:'center'}}>
			// 	<Text style={{textAlign:'center',color:'#9c9ea1',}}>
			// 				*以上费用均未含小费{"\n"}
			// 	</Text>
			//
			//
			// </View>
      if(this.state.selectedAddress && this.state.selectedAddress.hasOwnProperty("uaid")){
        return(

            <TouchableOpacity style={styles.acceptButton}
                              activeOpacity={0.4}
                              onPress={this._checkout}>
                <Text style={styles.acceptText}>
                   结账
                </Text>
            </TouchableOpacity>


        )
      }else{
        return(
          <View style={{alignItems:'center'}}>
            <Text style={{color:'#9c9ea1',}}>请在上方选择配送地址</Text>
          </View>

        )
      }
    }
		_renderRestaurant(){
			return(
				<View>
					<Text style={{color:'#363646',
												fontSize:25,
												fontWeight:'500',
												textAlign:'center',
												marginTop:20,
											}}>
				 		{this.props.restaurant.name}
					</Text>
					<Text style={{color:'#ababb0',
												fontSize:13,
												fontWeight:'400',
												marginTop:10,
												textAlign:'center',}}>
						{this.props.restaurant.desc}
					</Text>
					<View style={{height:2,
												marginTop:10,
												marginBottom:10,
												width:40,
												backgroundColor:"#ff8b00",
												alignSelf:"center"}}/>
				</View>
			)
		}
		_renderAddress(){
			if(this.state.renderAddress && this.state.selectedAddress && this.state.selectedAddress.hasOwnProperty("uaid")){
				return(
						<Address selectedAddress = {this.state.selectedAddress}
										 goToAddressList = {this._goToAddressList}/>
				)
			}else{
				return(
					<TouchableOpacity onPress={()=>{this._goToAddressList()}}>
							<View style={{height:100,width:100,}} />
					</TouchableOpacity>
				)
			}
		}
		_renderDeliverFee(){
			if(this.state.dltype == '0') return
			if(this.state.dlexp > 0){
				return(
					<CartItem icon={require('./Image/delivery-2.png')}
										title={'运费'}
										value={'$'+this.state.dlexp}/>
				)
			}else if(this.state.dltype == '2'){
				return(
					<CartItem icon={require('./Image/delivery-2.png')}
										title={'运费'}
										value={'客服将稍后与您联系确认运费'}/>
				)
			}

		}
		_renderDeliverType(){
      let typeListData=[{
                          text:"送餐",
													type:'1',
                          backgroundColor:"#fff",
                          textColor:"#999999",
                          borderColor:"#999999",
                        },{
                          text:"自取",
													type:'0',
                          backgroundColor:"#fff",
                          textColor:"#999999",
                          borderColor:"#999999",
                        }]
			if(this.state.dltype != '0'){
				typeListData[0].backgroundColor = "#ff8b00";
				typeListData[0].textColor = "#FFF";
				typeListData[0].borderColor = "#ff8b00";
			}else{
				typeListData[1].backgroundColor = "#ff8b00";
				typeListData[1].textColor = "#FFF";
				typeListData[1].borderColor = "#ff8b00";
			}
      let TypeList = typeListData.map((deliverType,index) => {
          return (
            <TouchableWithoutFeedback
                key={index}
                onPress={this._updateDltype.bind(null,deliverType)}>
              <View style={{flex:1,
                            alignItems:"center",
                            backgroundColor:deliverType.backgroundColor,
                            borderColor:deliverType.borderColor,
                            borderWidth:1,
                            borderRadius:15,
                            marginLeft:5,
                            marginRight:5,
                            padding:5
                          }}>
                <Text style={{color:deliverType.textColor}}>
                  {deliverType.text}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })
      return(
        <View style={{flexDirection:"row",marginTop:25}}>
            {TypeList}
        </View>
      )
    }
    render(){
      let cartList = this.state.cart.map((item,index) => {

          const dish = item;
          return(
            <CheckoutItem key={index}
                      ds_name = {dish.ds_name}
                      dish = {dish}
                      qty = {dish.qty}/>
          )
      })
      // <CartItem icon={require('./Image/money-1.png')}
      //           title={'原始税前'}
      //           value={this.state.pretax_ori}/>

      // =======================================
      // <Text>
      //   运费类型{this.state.dltype}
      // </Text>
      // <View style={ [{flex:1,alignItems: 'center',margin:20,borderWidth:1.5,borderColor:'#cbcbcb',borderStyle:'dashed',borderRadius:10}] }>
      //     <TextInput
      //       style={{height: 110,flex:1, padding:10,}}
      //       placeholder ={'有什么特别要嘱咐的？辣度？葱姜蒜香菜？'}
      //       onChangeText={(comment) => {this.setState({comment:comment})}}
      //       multiline={true}
      //     />
      // </View>
      // <CheckoutComment submitComment={this._handleSubmitComment}
      //               commentChange = {this._handleCommentChange}
      //               hideCommentButton = {true}/>
      // =======================================

			// =======================================
			// <View style={ [{flex:1,alignItems: 'center',margin:20,borderWidth:1.5,borderColor:'#cbcbcb',borderStyle:'dashed',borderRadius:10}]}>
			// 	 <TextInput
			// 		 style={{height: 110,flex:1, padding:10,}}
			// 		 placeholder ={'有什么特别要嘱咐的？辣度？葱姜蒜香菜？'}
			// 		 onChangeText={(comment) => {this.setState({comment:comment})}}
			// 		 multiline={true}
			// 		 ref={COMMENT_INPUT}
			// 	 />
			// </View>
			// =======================================
			const margin = this.state.anim.interpolate({
				inputRange: [0, 100],
				outputRange: [10, 0],
				extrapolate: 'clamp',
			});
      return(
        <View style={styles.mainContainer}>
					<Background
							 minHeight={0}
							 maxHeight={230}
							 offset={this.state.anim}
							 backgroundImage={this.state.AnimatedImage}
							 backgroundShift={0}
							 backgroundColor={"rgba(0,0,0,0)"}>
					 </Background>

          <ScrollView ref={(scrollView) => { this._scrollView = scrollView; }}
											style={styles.scrollView}
											scrollEventThrottle= {16}
											showsVerticalScrollIndicator={false}
											onScroll={ (e) => this._handleScroll(e)}
											{...this._gestureHandlers}>
						<View style={{backgroundColor:"#000000",marginTop:200,}}>
							<Animated.View style={{
																		 bottom:this.state.viewBottom,
																		 marginLeft:margin,
																		 marginRight:margin,
																	   backgroundColor:"#ffffff",
																		 marginTop:-20,
																		 paddingBottom:200,
																	 }}>
								<View style={{width:width-20,alignSelf:"center"}}>
									{this._renderRestaurant()}
									{this._renderAddress()}
									{cartList}
									{this._renderDeliverType()}
									<CartItem icon={require('./Image/money-1.png')}
														title={'税前价格'}
														value={'$'+this.state.pretax}/>

									{this._renderDeliverFee()}
									<CartItem icon={require('./Image/money-2.png')}
														title={'税后总价'}
														value={'$'+this.state.total}/>


								</View>

	            </Animated.View>
						</View>

          </ScrollView>
					{this.renderCheckoutButton()}
					<TouchableOpacity style={{paddingTop:22,
																		paddingLeft:8,
																		paddingRight:20,
																		paddingBottom:20,
																		position:'absolute',
																		top:0,
																		left:0,}}
														onPress={this._goBack}>
						<View style={{width:30,height:30,borderRadius:15,backgroundColor:"rgba(0,0,0,0.4)"}}>
							<Text style={{fontSize:25,textAlign:"center",color:"#ffffff",marginTop:-2}}>
								×
							</Text>
						</View>
					</TouchableOpacity>


        </View>
      )

    }

}


// {this.showLoading()}

let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:"white",
  },
  scrollView:{
    flex: 1,
    // marginTop: 64,
		// backgroundColor:"#000000",
  },
  orderContainer:{
    margin:10,
    backgroundColor:"#fff",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: {
       height: 0.5,
       width: 0.5,
    },
  },
  orderTitleContainer:{
    height:60,
    backgroundColor: "#ff8b00",
    alignItems: 'center',
    justifyContent:"center",
    borderColor:"#e2e2e4",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  orderTitle:{
    color: "#fff",
    fontSize:25,
  },
  acceptButton:{
    width:width,
    height:40,
    backgroundColor:'#ea7b21',
		justifyContent:'center',
  },
  acceptText: {
    textAlign: 'center',
    color: '#ffffff',
    marginBottom: 5,
    fontSize:20,
  },


});

module.exports = Confirm;
