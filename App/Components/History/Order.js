


'use strict'

import React, { Component } from 'react';
import {
  Alert,
  Clipboard,
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
export default class pastOrderEN extends Component {
  constructor(props){
    super(props);
    this.state={
      isCheaking:this.props.isCheaking,
      orderInfo:props.order,
    }
  }
  componentWillReceiveProps(nextProps){
    this.setState({
      orderInfo:nextProps.order,
    })
  }
  _renderFoodList(){
    return this.state.orderInfo.items.map((item,index)=>{
      return(
        <View key={index} style={{flexDirection:'row',alignItems:'center',paddingTop:12,paddingBottom:12}}>
            <View style={styles.quantityIcon}><Text style={{fontSize:10,fontFamily:'FZZhunYuan-M02S',}}>{item.qty}</Text></View>
            <Text style={{fontSize:16,paddingLeft:20,fontFamily:'FZZhunYuan-M02S',}} allowFontScaling={false}>{item.name}</Text>
            <View style={{flex:1,alignItems:'flex-end'}}>
              <Text style={{fontSize:16,paddingLeft:20,fontFamily:'FZZhunYuan-M02S',}} allowFontScaling={false}>${item.qty*item.price}</Text>
            </View>

        </View>
      )
    })
  }

  _handleWechatBtn(){
     Clipboard.setString('chanmaoweixin');
     Alert.alert(
            '已复制',
            '馋猫公众号: chanmaoweixin',
            [
              {text: 'OK', onPress: () => {}},
            ]
          )
  }

  render() {
    let statusMessage;
    let statusColor;
    switch (this.state.orderInfo.status) {
        case '0':
            statusColor = {color:'#b2b2b2'};
            statusMessage = '等待商家确认';
            break;
        case '10':
            statusColor = {color:'#33cd5f'};
            statusMessage = '商家已确认, 准备中';
            break;
        case '20':
            statusColor = {color:'#33cd5f'};
            statusMessage = '商家已确认, 准备中';
            break;
        case '30':
            statusColor = {color:'#9bc8df'};
            statusMessage = '送餐员已开始送餐';
            break;
        case '40':
            statusColor = {color:'#11c1f3'};
            statusMessage = '已送到, 满意吗？';
            break;
        case '55':
            statusColor = {color:'#886aea'};
            statusMessage = '新用户订单确认中';
            break;
        case '60':
            statusColor = {color:'#11c1f3'};
            statusMessage = '客服稍后联系您改运费';
            break;
        case '5':
            statusColor = {color:'#ef473a'};
            statusMessage = '糟糕, 有的菜没了';
            break;
        case '90':
            statusColor = {color:'#ef473a'};
            statusMessage = '订单已取消';
            break;
    }
      return(
        <View style={styles.orderContainer}>
          <View style={styles.itemContainer}>
              <View style={styles.imageContainer}>
                <Image style={{flex:1,width:deviceWidth-56,alignSelf:'center'}} source={{uri:this.state.orderInfo.mob_banner}}>
                  <View style={styles.opacityView}/>
                    <View style={styles.imageTextContainer}>
                      <Text style={styles.imageText} allowFontScaling={false}>{this.state.orderInfo.name}</Text>
                    </View>
                </Image>
              </View>
              <View style={styles.info}>
                  <Text style={[styles.infoTitle,statusColor]} allowFontScaling={false}>{statusMessage}</Text>
                  <View style={{flexDirection:'row'}}>
                    <Text style={styles.infoText} allowFontScaling={false}>订单号 #{this.state.orderInfo.oid}</Text>
                    <Text style={styles.infoText} allowFontScaling={false}>{this.state.orderInfo.created}</Text>
                  </View>
              </View>
              <View style={styles.orderList}>
                {this._renderFoodList()}
              </View>
              <View style={styles.orderTotal}>
                <Text style={{fontSize:18,marginLeft:40,fontWeight:'bold',fontFamily:'FZZhunYuan-M02S',}} allowFontScaling={false}>总价: ${this.state.orderInfo.total}</Text>
              </View>
              <View style={styles.buttonContainer}>
                  <View style={[styles.ButtonStyle,{borderRightWidth:0.5,padding:6,}]}>
                      <TouchableOpacity style={{flex:1,
                                                justifyContent:'center',
                                                alignItems:'center'}}
                                         onPress={this.props.HistoryOrderDetailVisible.bind(null,this.state.orderInfo.oid)}>
                        <Text style={{fontSize:13,color:'#666666',fontWeight:'bold',fontFamily:'FZZhunYuan-M02S',}} allowFontScaling={false}>详情</Text>
                      </TouchableOpacity>
                  </View>
                  <View style={[styles.ButtonStyle,{borderRightWidth:0.5,padding:10,}]}>
                      <TouchableOpacity style={{flex:1,
                                                flexDirection:'row',
                                                justifyContent:'center',
                                                alignItems:'center'}}
                                        onPress={this._handleWechatBtn}>
                        <Image style={{width:25,height:25}}source={require('./Image/wechat3.png')}/>
                        <Text style={{marginLeft:5,fontSize:13,color:'#666666',fontWeight:'bold',fontFamily:'FZZhunYuan-M02S',}} allowFontScaling={false}>chanmaoweixin</Text>

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
    marginTop:50,
    backgroundColor: '#e6e6e6',
  },
  orderContainer:{
    margin:10,
    backgroundColor:"#ffffff",
    shadowColor: "#000000",
    shadowOpacity: 0.2,
    shadowOffset: {
       height: 1,
       width: 1,
    },
  },
  itemContainer: {
    // backgroundColor: 'white',
    // height:500
  },
  imageContainer:{
    height:110,
    marginTop:18,
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
   fontSize: 20,
   color:'white',
   alignSelf:'center',
   fontFamily:'FZZongYi-M05S',
  },
  info:{
    flex:1,
    paddingTop:15,
    marginLeft:18,
    marginRight:18,
  },
  infoTitle:{
    paddingBottom:5,
    marginLeft:40,
    fontWeight:'bold',
    fontSize:17,
    fontFamily:'FZZhunYuan-M02S',
  },
  infoText:{
    paddingBottom:5,
    marginLeft:40,
    color:'#666666',
    fontFamily:'FZZhunYuan-M02S',
  },
  orderList:{
    flex:1,
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
    flex:1,
    paddingTop:18,
    paddingBottom:18,
    paddingLeft:18,
    paddingRight:18,
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
