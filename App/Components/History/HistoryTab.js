/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
	Component,
} from 'react';
import {
  Alert,
	AppState,
  Image,
  RefreshControl,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  NativeAppEventEmitter,
  View,

} from 'react-native';

import Order from './Order';
import HistoryAction from '../../Actions/HistoryAction';
import HistoryStore from '../../Stores/HistoryStore';
import Header from '../General/Header';
import HistoryOrderDetail from './HistoryOrderDetail';
import Modal from 'react-native-modalbox';

// const historyData = () => {
//   return HistoryStore.getHistoryData()
// }
class HistoryTab extends Component {
    constructor(props) {
        super(props);
        this.state = Object.assign({},HistoryStore.getState(),{showHistoryOrderDetail:false});
        this._onChange = this._onChange.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._doAutoRefresh = this._doAutoRefresh.bind(this);
        this._initVerifyPhoneResult = this._initVerifyPhoneResult.bind(this);
        this._HistoryOrderDetailVisible = this._HistoryOrderDetailVisible.bind(this);
        this._reorder = this._reorder.bind(this);
				this._handleAppStateChange = this._handleAppStateChange.bind(this);
    }
    componentDidMount(){
      setTimeout( () =>{
				const _doAutoRefresh = this._doAutoRefresh;
	      HistoryStore.addChangeListener(this._onChange);
	      this._doAutoRefresh();
				HistoryStore.autoRefresh();
	      const currentRoutes = this.props.navigator.getCurrentRoutes();
				AppState.addEventListener('change', this._handleAppStateChange);
      }, 4000);
    }
    componentWillUnmount() {
         HistoryStore.removeChangeListener(this._onChange);
				 AppState.removeEventListener('change', this._handleAppStateChange);
    }
    _onChange(){
				const state = Object.assign({},this.state,HistoryStore.getState())
        this.setState(state)
				console.log(HistoryStore.getState())
        if(this.state.verifyPhoneResult === 'FAIL'){
          this._initVerifyPhoneResult();
          Alert.alert(
            '验证码错误',
            '请检查您输入的验证码',
            [
              {text: '确认', onPress: () => {}},
            ],
          );
        }else if(this.state.verifyPhoneResult === 'SUCCESS'){
            this._initVerifyPhoneResult();
            this._doAutoRefresh();
        }
				if(this.state.doRefresh){
					this._doAutoRefresh();
				}

    }
		_handleAppStateChange(currentAppState) {
			if(currentAppState === 'active'){
				HistoryAction.getOrderData()
			}
		}
    _initVerifyPhoneResult(){
        this.setState({
          verifyPhoneResult:''
        });
    }
    _doAutoRefresh(){
      const currentRoutes = this.props.navigator.getCurrentRoutes();
      if(currentRoutes.length == 1 && currentRoutes[0].name == 'Home'){
        this.setState({
          isRefreshing: true,
        })
        HistoryAction.getOrderData()
      }


    }
    _onRefresh(){
      this.setState({
        isRefreshing: true,
      })
      HistoryAction.getOrderData()
    }
    _HistoryOrderDetailVisible(oid){
				this.setState({
					showHistoryOrderDetail: !this.state.showHistoryOrderDetail,
					historyDetailOid:oid,
				})
				setTimeout( () =>{
					if(this.state.showHistoryOrderDetail){
						this.props.hideTabBar();
					}else{
						this.props.showTabBar();
					}
				}, 400);
    }
    _HistoryOrderDetail(){
      if(this.state.showHistoryOrderDetail){
        return(
          <HistoryOrderDetail historyDetailOid = {this.state.historyDetailOid}/>
        )
      }

    }
    _reorder(reorderItems){
      // const restaurant = RestaurantStore.getRestaurantWithRid(this.state.rid);
      // this.props.navigator.push({
      //   id: 'Menu',
      //   restaurant: restaurant,
      //   // reorderItems:reorderItems,
      // })
    }
 // <Text style={{alignSelf:'center',color:'#ff8b00',fontFamily:'FZZhunYuan-M02S',}}> 订单状态每30秒会自动刷新</Text>
    render(){
			let orderList = this.state.orderData.map( order => {
				return <Order key={ order.oid } order={order} HistoryOrderDetailVisible = {this._HistoryOrderDetailVisible}/>
			});
      return(
         <View style={styles.mainContainer}>
             <Header title={'我的订单'} />
             <ScrollView style={styles.scrollView}
                         refreshControl={
                           <RefreshControl
                             refreshing={this.state.isRefreshing}
                             onRefresh={this._onRefresh}
                             tintColor="#ff8b00"
                             title="正在刷新啦..."
                             titleColor="#ff8b00"
                           />
                         }
                         ref='_scrollView'
                         >


               { orderList }
             </ScrollView>
						 <Modal style={styles.modal}
						 				position={"center"}
						 				isOpen={this.state.showHistoryOrderDetail}
										onClosed={this._HistoryOrderDetailVisible}
						 				swipeToClose={false}>
						 			{this._HistoryOrderDetail()}
						 </Modal>
         </View>
      )



    }

}




let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollView:{
    flex: 1,
    marginTop: 64,
  },

  orderTitleContainer:{
    height:40,
    backgroundColor: '#ff8b00',
    alignItems: 'center',
    justifyContent:"center",
    borderBottomColor:'#ddd',
    borderBottomWidth:1,
  },
  orderTitle:{
    color: "#fff",
    fontSize:20,
		fontFamily:'FZZongYi-M05S',
  },
	modal: {
		justifyContent: 'center',
		height: 400,
		width: 300,
	},

});

module.exports = HistoryTab;
