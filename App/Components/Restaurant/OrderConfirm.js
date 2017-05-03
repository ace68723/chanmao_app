'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image

} from 'react-native';
import CMModal from 'react-native-modalbox';
const orderUser = {
    name:"qiao",
    phone: "647-895-0624",
    total: "$150.98",
    address:"Unit 1905,20 Olive Ave, North York, M2N 7G5",
}

export default class orderConfirm extends Component {
  constructor(props){
    super(props);

    this.state = {
      //  isOpen: this.props.isCheaking,
      isOpen: true,

    }
  }


  render() {



      return(


            <CMModal style={styles.modal}
                     position={"center"}
                     isOpen={this.state.isOpen}
                     onClosed={this.props.closeOrderConfirm}>
                <View style={{flex:1}}>
                      <View style={styles.modalHearder}>
                          <Text style={{fontSize:20, fontWeight:'bold'}} allowFontScaling={false}>定制运费</Text>
                      </View>
                      <View style={styles.modalContent}>
                          <View style={{flexDirection:'row',paddingTop:20,alignItems: 'center',}}>
                              <Image source={require('./Image/icon_name.png')} style={{width:25,height:25,marginRight:15,marginLeft:15}}/>
                              <Text style={styles.contentFont} allowFontScaling={false}>{this.props.selectedAddress.name}</Text>
                          </View>
                          <View style={{flexDirection:'row',paddingTop:20,alignItems: 'center',}}>

                              <Image source={require('./Image/icon_telephone.png')} style={{width:25,height:25,marginRight:15,marginLeft:15}}/>
                              <Text style={styles.contentFont} allowFontScaling={false}>{this.props.selectedAddress.tel}</Text>
                          </View>
                          <View style={{flexDirection:'row',paddingTop:20,alignItems: 'center',}}>
                              <Image source={require('./Image/icon_total.png')} style={{width:22,height:25,marginRight:15,marginLeft:15}}/>
                              <Text style={styles.contentFont} allowFontScaling={false}>{this.props.total}</Text>
                          </View>
                          <View style={{flexDirection:'row',paddingTop:20,alignItems: 'center',paddingLeft:0}}>
                              <Image source={require('./Image/icon_address.png')} style={{width:19,height:25,marginRight:15,marginLeft:15}}/>
                              <Text style={styles.contentFont} allowFontScaling={false}>{this.props.selectedAddress.addr}</Text>
                          </View>

                      </View>
                      <View style={styles.modalFooter}>
                          <View style={styles.modalButton}>
                              <TouchableOpacity style={{flex:1,
                                                        justifyContent:'center',
                                                        alignItems:'center'}}
                                                onPress={() => this.setState({isOpen: !this.state.isOpen})}>
                                <Text style={styles.buttonFont} allowFontScaling={false}>取消</Text>
                              </TouchableOpacity>
                          </View>
                          <View style={styles.modalButton}>
                              <TouchableOpacity style={{flex:1,
                                                        justifyContent:'center',
                                                        alignItems:'center'}}
                                                onPress={this.props.doCheckout}>
                                <Text style={{fontSize:18,color:'#ea7b21',}} allowFontScaling={false}>确认</Text>
                              </TouchableOpacity>
                          </View>
                      </View>
                </View>
            </CMModal>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  button:{
    justifyContent:'center',
    backgroundColor:'#ff8600',
    height:50,
    width:100,
    padding:10,
    marginTop:10,
  },

  modal: {
    justifyContent: 'center',
    height: 350,
    width: 300,

  },
  modalHearder:{
    flex:1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  modalContent:{
    flex:5,
    marginLeft:20,
    marginRight:20,
    borderTopWidth: 1,
    borderColor: '#a6a6a6',
  },
  contentFont:{
    color:'#ea7b21',
    fontSize:20,
    flex:1,
  },
  modalButton:{
    flex:1,

    justifyContent:'center',
    alignItems:'center',
    borderWidth: 1,
    borderColor:'#d9d9d9'
  },
  buttonFont:{
    fontSize:18,

  },
  modalFooter:{
    flex:1,
    flexDirection:'row',
  }

});
