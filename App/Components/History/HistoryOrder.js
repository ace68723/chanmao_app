// import {default as React,Component} from 'react';
// import {
//   View,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
// } from 'react-native';
// import moment from 'moment';
//
// export default (props) => {
//  // props.order.created = moment(props.order.created).format("MMM Do YYYY");
//     return (
//       <TouchableOpacity onPress={props.HistoryOrderDetailVisible.bind(null,props.order.oid)}>
//         <View style={styles.container}>
//           <Text style={[styles.order,{flex:0.2,fontFamily:'FZZhunYuan-M02S',}]}>
//             # {props.order.oid}
//           </Text>
//           <Text style={[styles.order,{flex:0.5,fontFamily:'FZZhunYuan-M02S',}]} numberOfLines={2}>
//             {props.order.rrname}
//           </Text>
//           <Text style={[styles.time,{flex:0.3,fontFamily:'FZZhunYuan-M02S',}]}>
//             {props.order.created}
//           </Text>
//         </View>
//       </TouchableOpacity>
//     )
// }
//
//
//
//
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: 'row',
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         height:50,
//         borderBottomColor:'#ddd',
//         borderBottomWidth:1,
//     },
//     order:{
//       marginLeft:15,
//       fontSize:13,
//       fontWeight:"500",
//       color:"#808080",
//     },
//     time:{
//       flex:1,
//       textAlign:"right",
//       marginRight:15,
//       fontSize:12,
//       color:"#b3b3b3",
//     }
//
// });








'use strict'

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import Modal from 'react-native-modalbox';

const {height, width} = Dimensions.get('window');
const deviceWidth = width;
const deviceHeight = height;

const orderInfo = {
    statue:"订单已派送",
    time:"2017年 02月 25日, 8:36 PM",
    orderID:"66A34",
    food:[
      {
        name:"芝士玉米",
        quantity: 1,
      },
      {
        name:"葱油鸡",
        quantity: 1,
      }
    ],
    total:"$42.28",

}

export default class pastOrderEN extends Component {
  constructor(props){
    super(props);
    this.state={
      isCheaking:this.props.isCheaking,
    }
  }
  _renderFoodList(){
    return orderInfo.food.map((item,index)=>{
      return(
        <View key={index} style={{flexDirection:'row',alignItems:'center',paddingTop:12,paddingBottom:12}}>
            <View style={styles.quantityIcon}><Text style={{fontSize:10}}>{item.quantity}</Text></View>
            <Text style={{fontSize:16,paddingLeft:20}} allowFontScaling={false}>{item.name}</Text>
        </View>
      )
    })
  }
  // <Image style={{flex:1,width:deviceWidth-36}} source={require('../img/food.jpg')}>
  //   <View style={styles.opacityView}/>
  //     <View style={styles.imageTextContainer}>
  //       <Text style={styles.imageText} allowFontScaling={false}>K-Pocha</Text>
  //     </View>
  // </Image>
  render() {
      return(
        <View style={styles.container}>
          <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>

              </View>
              <View style={styles.info}>
                  <Text style={styles.infoTitle} allowFontScaling={false}>{orderInfo.statue}</Text>
                  <Text style={styles.infoText} allowFontScaling={false}>{orderInfo.time}</Text>
                  <Text style={styles.infoText} allowFontScaling={false}>订单号 #{orderInfo.orderID}</Text>
              </View>
              <View style={styles.orderList}>
                {this._renderFoodList()}
              </View>
              <View style={styles.orderTotal}>
                <Text style={{fontSize:18,marginLeft:40,fontWeight:'bold'}} allowFontScaling={false}>总价: {orderInfo.total}</Text>
              </View>
              <View style={styles.buttonContainer}>
                  <View style={[styles.ButtonStyle,{borderRightWidth:0.5}]}>
                      <TouchableOpacity style={{flex:1,
                                                justifyContent:'center',
                                                alignItems:'center'}}>
                        <Text style={{fontSize:12,color:'#666666',fontWeight:'bold'}} allowFontScaling={false}>收据</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={[styles.ButtonStyle,{borderRightWidth:0.5}]}>
                      <TouchableOpacity style={{flex:1,
                                                justifyContent:'center',
                                                alignItems:'center'}}>
                        <Text style={{fontSize:12,color:'#666666',fontWeight:'bold'}} allowFontScaling={false}>帮助</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </View>
        </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#e6e6e6',
  },
  itemContainer: {

    paddingTop:80,
    backgroundColor: 'white',
    height:500
  },
  imageContainer:{
    height:110,

    marginLeft:18,
    marginRight:18,
    justifyContent: 'center',
  },

  opacityView:{
    flex:1,
    opacity: 0.3,
    backgroundColor:'#000000'
  },
  imageTextContainer:{
    position:'absolute',
    left:0,
    top:0,
    right:0,
    bottom:0,
    backgroundColor:'rgba(0,0,0,0)',
    //flex:1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageText: {
   fontSize: 22,
   color:'white',
   alignSelf:'center',

  },
  info:{
    flex:2,
    paddingTop:15,
    marginLeft:18,
    marginRight:18,
  },
  infoTitle:{
    paddingBottom:5,
    marginLeft:40,
    fontWeight:'bold',
    fontSize:17,
  },
  infoText:{
    paddingBottom:5,
    marginLeft:40,
    color:'#666666'
  },
  orderList:{
    flex:2,
    borderTopWidth:1,
    borderBottomWidth:1,
    borderColor:'#d9d9d9',
    marginLeft:18,
    marginRight:18,
    paddingBottom:5,

  },
  quantityIcon:{
    borderColor:'#d9d9d9',
    borderWidth:1,
    alignItems:'center',
    justifyContent:'center',
    height:18,
    width:18,
  },
  orderTotal:{
    flex:2,
    marginLeft:18,
    marginRight:18,
    justifyContent:'center'
  },
  buttonContainer:{
    flex:1,

    flexDirection:'row',
  },
  ButtonStyle:{
    flex:1,
    backgroundColor:'#f9f9f9',
    borderTopWidth: 1,
    borderBottomWidth:1,


    borderColor:'#d9d9d9'
  },



});
