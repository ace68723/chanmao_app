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

import HistoryOrder from './HistoryOrder';
import CurrentOrder from './CurrentOrder';
import HistoryService from '../../Services/HistoryService';
import HistoryStore from '../../Stores/HistoryStore';
import Header from '../General/Header';
import HistoryOrderDetail from './HistoryOrderDetail';

// const historyData = () => {
//   return HistoryStore.getHistoryData()
// }
class HistoryTab extends Component {
    constructor(props) {
        super(props);
        this.state = HistoryStore.getState();
        this._onChange = this._onChange.bind(this);
        this._onRefresh = this._onRefresh.bind(this);
        this._doAutoRefresh = this._doAutoRefresh.bind(this);
        this._initVerifyPhoneResult = this._initVerifyPhoneResult.bind(this);
        this._HistoryOrderDetailVisible = this._HistoryOrderDetailVisible.bind(this);
        this._reorder = this._reorder.bind(this);
    }
    componentDidMount(){

      const _doAutoRefresh = this._doAutoRefresh;
      HistoryStore.addChangeListener(this._onChange);
      this._doAutoRefresh();
			HistoryStore.autoRefresh();
      const currentRoutes = this.props.navigator.getCurrentRoutes();
    }
    componentWillUnmount() {
         HistoryStore.removeChangeListener(this._onChange);
    }
    _onChange(){
        this.setState(HistoryStore.getState())
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
    _initVerifyPhoneResult(){
        this.setState({
          verifyPhoneResult:''
        });
    }
    _doAutoRefresh(checkoutSuccessful){
      const currentRoutes = this.props.navigator.getCurrentRoutes();
      if(currentRoutes.length == 1 && currentRoutes[0].name == 'Home' || checkoutSuccessful){
        this.setState({
          isRefreshing: true,
        })
        HistoryService.getHistoryData()
      }


    }
    _onRefresh(){
      this.setState({
        isRefreshing: true,
      })
      HistoryService.getHistoryData()
    }

    _HistoryOrderDetailVisible(){
      this.setState({
        showHistoryOrderDetail: !this.state.showHistoryOrderDetail,
      })
    }
    _HistoryOrderDetail(){
      if(this.state.showHistoryOrderDetail){
        return(
          <HistoryOrderDetail modalVisible={this.state.showHistoryOrderDetail} HistoryOrderDetailVisible = {this._HistoryOrderDetailVisible}/>
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

    render(){

      let historylist = this.state.historylist.map( order => {
        return <HistoryOrder key={ order.oid } order={order} HistoryOrderDetailVisible = {this._HistoryOrderDetailVisible}/>
      });
      let current = ()=>{
        if(this.state.current){
          return(
            <View style={styles.orderContainer}>
                <View style={styles.orderTitleContainer}>
                      <Text style={styles.orderTitle}>
                        ORDER PASS
                      </Text>
                </View>
                <CurrentOrder current={this.state.current}
                              unavailable={this.state.unavailable}
                              reorder={this._reorder}
                              HistoryOrderDetailVisible = {this._HistoryOrderDetailVisible}/>
            </View>
          )
        }
      }
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
               <Text style={{alignSelf:'center',color:'#ff8b00'}}> 订单状态每30秒会自动刷新</Text>
               {current()}
               <View style={styles.orderContainer}>

                   <View style={styles.orderTitleContainer}>
                         <Text style={styles.orderTitle}>
                           历史订单
                         </Text>
                   </View>
                   { historylist }
               </View>
             </ScrollView>
             {this._HistoryOrderDetail()}
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
  orderContainer:{
    margin:10,
    backgroundColor:"#fff",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
       height: 1,
       width: 1,
    },
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

  }

});

module.exports = HistoryTab;
