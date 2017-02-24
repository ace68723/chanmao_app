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
  AlertIOS,
  Image,
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import Loading from '../Helpers/Loading';
import Header from '../General/Header';

import AddressAction from '../../Actions/AddressAction';
// import AddressStore from '../../Stores/AddressStore';

const _getFormatAddress = () =>{
  return AddressStore.getFormatAddress()
}
const _getSate = () =>{
  return AddressStore.getState()
}
const _getProps = () =>{
  return AddressStore.getProps()
}
class AddInfo extends Component {
    constructor(props) {
        super(props);
        this.state={
          // placeId: props.placeId,
          formattedAddress:props.formattedAddress,
          name:"",
          phoneNumber:"",
          apartmentNumber:"",
          buzzCode:"",
          isLoading: false,
          backToAddressList:false,
        }

        // this._onChange = this._onChange.bind(this);
        this._submitAddress = this._submitAddress.bind(this);
        this._chooseType = this._chooseType.bind(this);
    }
    componentWillMount() {
      this._animatedChooseType = new Animated.Value(0);
    }
    componentDidMount(){
      // if(this.props.placeId){
        // const placeId = this.props.placeId
        // AddressAction.formatAddress(placeId);
        // AddressStore.addChangeListener(this._onChange);
      // }


    }
    componentWillUnmount(){
      // AddressStore.removeChangeListener(this._onChange);
    }
    // _onChange(){
    //     this.setState(_getSate);
    //     // if(this.state.backToAddressList){
    //     //   this.setState({
    //     //     backToAddressList:false,
    //     //   })
    //     //
    //     //   setTimeout(function () {
    //     //       AddressAction.getAddress();
    //     //   }, 500);
    //     // }
    // }
    showLoading(){
      if(this.state.isLoading)
        return(<Loading />)
    }
    _handleNameChange(text){
      this.setState({
         name: text
      });
    }
    _handlePhoneNumberChange(tel){
      let value = tel.toString().trim().replace(/[()-]/g , '');
      if(value.length==4 ){
        tel = value.replace(/(\d\d\d)(\d)/, "($1)$2");
      }
      if(value.length == 7){
        tel = value.replace(/(\d\d\d)(\d\d\d)(\d)/, "($1)$2-$3");
      }
      this.setState({
         phoneNumber: tel
      });
    }
    _handleApartmentNumberChange(text){
      this.setState({
         apartmentNumber: text
      });
    }
    _handleBuzzCodeChange(text){
      this.setState({
         buzzCode: text
      });
    }
    _submitAddress(){
      const  phoneNumber = this.state.phoneNumber.toString().trim().replace(/[()-]/g , '');
      if(phoneNumber.length != 10){
        AlertIOS.alert(
          '馋猫订餐提请您',
          '请输入10位电话号码'
        )
      }else{
        this.setState({
          isLoading: true,
        })
      const  name = this.state.name;
      const  formattedAddress = this.state.formattedAddress;
      const  apartmentNumber = this.state.apartmentNumber;
      const  buzzCode = this.state.buzzCode;
      let    type;
      if(this.state.choosedType == "Home"){
        type = "H"
      }else if(this.state.choosedType == "Work"){
        type = "W"
      }else{
        type = "O"
      }
      const userInfo = {name,phoneNumber,apartmentNumber,buzzCode,formattedAddress,type};
        AddressAction.submitAddress(userInfo)
      }
    }
    _chooseType(){
      if(this._animatedChooseType._value == 100 && (this.state.choosedType =="Other" || !this.state.choosedType)){
        Animated.timing(this._animatedChooseType, {
            toValue: 0,
            duration: 200,
        }).start()
      }else{
        Animated.timing(this._animatedChooseType, {
            toValue: 100,
            duration: 200,
        }).start()
      }
    }
    _renderChooseType(){
      let typeListData=[{
                          text:"Home",
                          backgroundColor:"#fff",
                          textColor:"#999999",
                          borderColor:"#999999",
                        },{
                          text:"Work",
                          backgroundColor:"#fff",
                          textColor:"#999999",
                          borderColor:"#999999",
                        },{
                          text:"Other",
                          backgroundColor:"#fff",
                          textColor:"#999999",
                          borderColor:"#999999",
                        }]
      let TypeList = typeListData.map((type,index) => {
          if(this.state.choosedType == type.text){
            type.backgroundColor = "#ff8b00";
            type.textColor = "#FFF";
            type.borderColor = "#ff8b00";
          }
          return (
            <TouchableWithoutFeedback
                key={index}
                onPress={()=>{
                  this.setState({choosedType:type.text})
                    if(type.text=="Other"){
                      setTimeout(()=> {
                        this._chooseType()
                      }, 10);
                    }
              }}>
              <View style={{flex:1,
                            alignItems:"center",
                            backgroundColor:type.backgroundColor,
                            borderColor:type.borderColor,
                            borderWidth:1,
                            borderRadius:15,
                            marginLeft:5,
                            marginRight:5,
                            padding:5
                          }}>
                <Text style={{color:type.textColor}}>
                  {type.text}
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
    // value={this.state.phoneNumber}

    render(){
        const interpolatedRotateAnimation = this._animatedChooseType.interpolate({
           inputRange: [0, 100],
           outputRange: ['0deg', '90deg']
         });
         const interpolatedMarginTop = this._animatedChooseType.interpolate({
            inputRange: [0, 100],
            outputRange: [0, -50]
          });

        return(
          <View style={styles.mainContainer}>
          <Header title={"地址"}
	                goBack={this.props.goBack}
	                leftButtonText={'×'}/>
            <ScrollView scrollEnabled={true}
                        keyboardShouldPersistTaps="always"
                        keyboardDismissMode={'on-drag'}
                        style={styles.scrollView}>
                <View style={styles.inputForm}>
                    <View style={styles.addressBox}>
                      <Text style={styles.inputText}>
                        {this.state.formattedAddress.address}
                      </Text>
                    </View>
                    <View style= {styles.separator}/>
                    <View style={styles.inputBox}>
                      <Text style={styles.inputText}>
                        联系人:
                      </Text>
                        <TextInput
                            blurOnSubmit={false}
                            autoFocus={true}
                            style={styles.fistInput}
                            placeholder="Name"
                            keyboardType = { 'default'}
                            autoCorrect= { false}
                            returnKeyType={'next'}
                            onChangeText={(text) => this._handleNameChange(text)}
                        />

                    </View>
                    <View style= {styles.separator}/>
                    <View style={styles.inputBox}>
                      <Text style={styles.inputText}>
                        电话: ＋1:
                      </Text>
                      <TextInput
                          blurOnSubmit={false}
                          style={styles.fistInput}
                          placeholder="Phone Number"
                          value={this.state.phoneNumber}
                          keyboardType = { 'phone-pad'}
                          autoCorrect= { false}
                          maxLength= {13}
                          returnKeyType={'next'}
                          onChangeText={(text) => this._handlePhoneNumberChange(text)}
                      />
                    </View>
                    <View style= {styles.separator}/>
                    <View style={styles.inputBox}>
                      <Text style={styles.inputText}>
                        Unit / Apt No:
                      </Text>
                      <TextInput
                          blurOnSubmit={false}
                          style={styles.fistInput}
                          placeholder="Optional(选填)"
                          keyboardType = { 'numbers-and-punctuation'}
                          autoCorrect= { false}
                          returnKeyType={'next'}
                          onChangeText={(text) => this._handleApartmentNumberChange(text)}
                      />
                    </View>
                    <View style= {styles.separator}/>
                    <View style={styles.inputBox}>
                      <Text style={styles.inputText}>
                          Buzz Code:
                      </Text>
                      <TextInput
                          blurOnSubmit={false}
                          style={styles.fistInput}
                          placeholder="Optional(选填)"
                          keyboardType = { 'numbers-and-punctuation'}
                          autoCorrect= { false}
                          returnKeyType={'next'}
                          onChangeText={(text) => this._handleBuzzCodeChange(text)}
                      />
                    </View>
                    <View style= {styles.separator}/>
                    <TouchableWithoutFeedback onPress={this._chooseType}>
                      <View style={[styles.inputBox,{overflow:"hidden",height:40}]}>
                        <Animated.Image source={require("./Image/button_enter.png")}
                                        style={{marginLeft:16,
                                                width:25,
                                                height:28,
                                                transform: [{rotate: interpolatedRotateAnimation}]}}/>
                        <Animated.View style={{flexDirection:"column",flex:1,marginTop:interpolatedMarginTop}}>
                            <Text style={{marginLeft:10,marginTop:12}}>
                              设置为默认地址(选填)
                            </Text>
                            {this._renderChooseType()}

                        </Animated.View>
                      </View>
                    </TouchableWithoutFeedback>




                </View>


                <View style={styles.firstButtonBox}>
                    <TouchableOpacity  style={styles.button}
                                       activeOpacity={0.7}
                                       onPress={this._submitAddress}>
                        <Text style={ styles.buttonText }>添加地址 </Text>
                    </TouchableOpacity>
               </View>

            </ScrollView>
          </View>

        )
    }
}
// {this.showLoading()}



let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:'#ffffff',
  },
  scrollView:{
    flex: 1,
    marginTop: 64,
  },
  inputForm:{
    margin:10,
    flex: 1,
    // borderColor: '#ddd',
    // borderWidth: 1,
    // borderRadius: 8,
  },
  addressBox:{
      flex: 1,
      marginTop:15,
      marginBottom:15,
      // height:60,
  },
  inputBox: {
      flex: 1,
      flexDirection: 'row',
      alignItems:'center',
      backgroundColor:'white',
      // borderColor: '#ddd',
      // borderWidth: 1,
      borderRadius: 8,
  },
  inputText:{
    fontSize:18,
    marginLeft:20,
    marginRight:10,
  },
  fistInput:{
    // marginLeft:10,
    // flexDirection: 'row',
    flex: 1,
    height:50,
    fontSize: 18,
    borderRadius: 8,
    color: '#000'
  },
  secondInput:{
    marginLeft:10,
    flexDirection: 'row',
    flex: 1,
    height:50,
    fontSize: 23,
    borderRadius: 8,
    color: '#000'
  },
  separator: {
    height: 1,
    backgroundColor: '#E4E4E4',
    flex: 1,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
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
  firstButtonBox:{

    flexDirection: 'row',
    // marginTop:20,
    margin:10,
    height: 50,
    // backgroundColor: '#aaaaaa'
  },

});

module.exports = AddInfo;
