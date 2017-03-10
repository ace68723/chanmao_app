'use strict'
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Dimensions,
  Image,
  Alert,
  Linking,
  ScrollView,
  Clipboard,
} from 'react-native';

const {height, width} = Dimensions.get('window');
const deviceWidth = width;
const deviceHeight = height;
import Header from '../General/Header';
export default class InfoPage extends Component {
  constructor(){
    super();

    this._goBack = this._goBack.bind(this);
  }

  contact(num,type){
    if(type == "phone"){
      Alert.alert("拨打号码",num,[{
       text: 'OK',
       onPress: () => {
         return Linking.openURL('tel:'+num);
       }
     },
      {
       text: 'Cancel',
       style: 'cancel',
      }]);
    }
    else if(type == "email"){
      Alert.alert("发送邮件",num,[{
       text: 'OK',
       onPress: () => {
         return Linking.openURL('mailto:'+num);
       }
     },
      {
       text: 'Cancel',
       style: 'cancel',
      }]);
    }
  }
  _goBack(){
    this.props.navigator.pop();
  }
  render() {

    // <Text style={styles.centerFont} onPress={()=>{
    //   this.contact("647-515-6699","phone");
    // }} allowFontScaling={false}>客服电话：647-515-6699</Text>
    return (
      <View style={styles.container}>
        <Header title={'关于我们'} goBack={this._goBack}/>
        <ScrollView style={{flex:1,  marginTop:64,paddingLeft:20,paddingRight:20}}>

            <View style={styles.fontContainer}>
                <Text style={styles.headerFont} allowFontScaling={false} >
                  这是一个致力于打造多伦多最佳订餐平台，为自己理想奋斗的热血团队。我们愿真诚的接纳您的意见，也邀请志同道合的你加入我们。
                </Text>
            </View>
                <View style={styles.centerContent}>
                          <View style={styles.imgContainer} >
                            <Image source={require('./Image/cmQRcode.jpeg')} style={{width: 140, height: 140}} />
                          </View>
                          <View style={styles.centerFontContainer}>
                              <Text style={styles.centerFontWEIXIN}
                                    selectable={true}
                                    allowFontScaling={false}>
                                    微信客服：chanmaoweixin
                              </Text>
                              <Text style={styles.centerFont} onPress={()=>{
                                this.contact("647-205-6668","phone");
                              }} allowFontScaling={false}>商务合作：647-205-6668</Text>
                              <Text style={styles.centerFont} onPress={()=>{
                                this.contact("info@chanmao.ca","email");
                              }} allowFontScaling={false}>E-mail：info@chanmao.ca</Text>
                          </View>
                </View>
        </ScrollView>
        <View style={styles.footer}>
            <Text style={styles.footerFont} allowFontScaling={false}>
              Chanmao Inc. 版权所有
            </Text>
            <Text style={styles.footerFont} allowFontScaling={false}>

            </Text>
            <Text style={styles.footerFont} allowFontScaling={false}>
              版本号：V 2.3
            </Text>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  fontContainer:{
    flex:1,
    padding:20,
  },
  headerFont: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight:20
  },
  centerContent:{
    flex:1,
    backgroundColor: '#ffffff',

    justifyContent: 'center',
    shadowColor:'#bfbfbf',
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
  },
  centerFontContainer:{
    paddingTop:20,
    paddingBottom:25,
    alignItems: 'center',
  },
  centerFont:{
    paddingBottom:20,
    fontSize:16
  },
  centerFontWEIXIN:{
    paddingBottom:20,
    fontSize:16,
    color:'#0080ff'
  },

  footer:{
    alignSelf:'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding:10,
    width: deviceWidth-50,
    borderTopWidth: 1,
    borderColor: '#d9d9d9',
  },
  footerFont:{
    fontSize:15,
  },
  imgContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    padding:30

  }

});
