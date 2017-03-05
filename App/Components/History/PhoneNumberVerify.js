import React, {
	Component,
} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
} from 'react-native';
import HistoryAction from '../../Actions/HistoryAction';

class PhoneNumberVerify extends Component{
        constructor(props) {
            super(props);
            this.state={
              getVerifyCode:false
            }
        }
      getVerifyCode(){
        this.setState({
          getVerifyCode:true
        })
        HistoryAction.getVerifyCode(this.props.orderId)
      }
      verifyPhone(){
        HistoryAction.verifyPhone(this.state.code,this.props.orderId)
      }
      render(){
        let _VerifyPhone = () => {
          if(!this.state.getVerifyCode){
            return(
              <View style={styles.firstButtonBox}>
                <TouchableHighlight
                    style={styles.button}
                    underlayColor="rgba(118,213,255,0.7)"
                    onPress={() => {this.getVerifyCode()}}>
                       <Text style={ styles.buttonText }>获取验证码  </Text>
                </TouchableHighlight>
              </View>
            )
          }else{
            return(
              <View style={{margin:10,height: 100,}}>
                <TextInput
                    style={{height: 40, borderColor: '#ff8b00', borderRadius:5,borderWidth: 1,paddingLeft:10,flex:1}}
                    onChangeText={(code) => this.setState({code})}
                    value={this.state.text}
                    placeholderTextColor={'#ff8b00'}
                    placeholder={'请输入验证码'}
                  />
                <TouchableHighlight
                    style={[styles.button,{marginTop:10}]}
                    underlayColor="rgba(118,213,255,0.7)"
                    onPress={() => {this.verifyPhone()}}>
                       <Text style={ styles.buttonText }>验证手机  </Text>
                </TouchableHighlight>
              </View>
            )
          }
        }
          return (
            <View style={styles.mainContainer}>
                {_VerifyPhone()}
              <View style={styles.messageBox}>
                  <Text style={styles.message}>请验证手机号: {this.props.phoneNumber}</Text>
              </View>
            </View>
          )
        }


}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },
    firstButtonBox:{
      flexDirection: 'row',
      margin:10,
      height: 50,
    },
    buttonText: {
      fontSize: 20,
      color: '#fff',
			fontFamily:'FZZhunYuan-M02S',
    },
    button: {
      flex:1,
      backgroundColor: '#ff8b00',
      borderColor: '#ff8b00',
      borderWidth: 1,
      borderRadius: 8,
      alignItems:'center',
      justifyContent:'center',
    },
    messageBox:{
      flexDirection: 'row',
      justifyContent:'center',
    },
    message:{
      textAlign:"center",
      fontSize:17,
      color:'#9bc8df',
    },

});
module.exports = PhoneNumberVerify;
