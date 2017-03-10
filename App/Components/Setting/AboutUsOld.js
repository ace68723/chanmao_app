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
  Dimensions,
  Image,
  StyleSheet,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import Header from '../General/Header';

class Setting extends Component {
    constructor(props) {
        super(props);
        this._goBack = this._goBack.bind(this);
        this._joinUs = this._joinUs.bind(this);
        this.state = {
          imageWidth:(Dimensions.get('window').width-26)/3,
          imageHeight:(Dimensions.get('window').width-26)/3,
          theta: new Animated.Value(45),
        }
        this._animate = this._animate.bind(this);
    }
    componentDidMount() {
      this._animate();
    }
    _animate() {
      //  this.state.theta.setValue(0);
       Animated.timing(this.state.theta, {
         toValue: 180,
         duration: 5000,
       }).start(this._animate);
     }
    _goBack(){
      this.props.navigator.pop();
    }
    _joinUs(){
      this.props.navigator.push({
        id: 'JoinUs',
        category:3,
      })
    }
    render(){
      return(
        <View style={styles.mainContainer}>
            <Header title={'关于我们'} goBack={this._goBack}/>
            <ScrollView style={styles.scrollView}>
              <Text style={styles.introduction}>
                馋猫订餐，多伦多最大的网上订餐平台，为自己理想奋斗的热血团队，我们是专业不高冷，逗逼却又认真的馋猫小分队。
              </Text>
              <TouchableOpacity
                 style={styles.button}
                 activeOpacity={0.4}
                 onPress={this._joinUs}>
                  <Text style={styles.buttonText}>
                    加入我们
                  </Text>
              </TouchableOpacity>
                <View style={{height:1,marginLeft:30,marginRight:30,backgroundColor:'#b3b3b3'}}/>
                  <View style={{flex:1,
                                height:600,
                                flexWrap:'wrap',
                                flexDirection:'row',
                                padding:10}}>
                    <Image style={[styles.image,{height: this.state.imageHeight,width:this.state.imageWidth,}]}
                            source={require('./Image/kathy.jpg')}/>
                    <Image style={[styles.image,{height: this.state.imageHeight,width:this.state.imageWidth,}]}
                            source={require('./Image/kathy.jpg')}/>
                            <Image style={[styles.image,{height: this.state.imageHeight,width:this.state.imageWidth,}]}
                                    source={require('./Image/kathy.jpg')}/>
                            <Image style={[styles.image,{height: this.state.imageHeight,width:this.state.imageWidth,}]}
                                    source={require('./Image/kathy.jpg')}/>
                                    <Image style={[styles.image,{height: this.state.imageHeight,width:this.state.imageWidth,}]}
                                            source={require('./Image/kathy.jpg')}/>
                                    <Image style={[styles.image,{height: this.state.imageHeight,width:this.state.imageWidth,}]}
                                            source={require('./Image/kathy.jpg')}/>
                     <View >
                          <Animated.View style={[
                               styles.flipCard,
                               { backfaceVisibility: 'hidden',
                                 transform: [
                                 {perspective: 850},
                                 {rotateX: this.state.theta.interpolate({
                                   inputRange: [0, 180],
                                   outputRange: ['0deg', '180deg']
                                 })},
                               ]}]}>
                               <Image style={[styles.image,{height: this.state.imageHeight,width:this.state.imageWidth,}]}
                                       source={require('./Image/kathy.jpg')}/>
                           </Animated.View>
                          <Animated.View style={[styles.flipCard, {
                               backfaceVisibility: 'hidden',
                               position: 'absolute',
                               top: 0,
                               transform: [
                                 {perspective: 850},
                                 {rotateX: this.state.theta.interpolate({
                                   inputRange: [0, 180],
                                   outputRange: ['180deg', '360deg']
                                 })},
                               ]}]}>
                               <View style={[styles.image,
                                            {height: this.state.imageHeight,
                                             width:this.state.imageWidth,
                                             justifyContent:'center'}]}>
                                         <Text style={{justifyContent:'center'}}>
                                            爱工作爱生活的一只馋猫
                                         </Text>
                                </View>
                          </Animated.View>
                    </View>
                    </View>
            </ScrollView>
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
    marginTop:64,
    backgroundColor:'white',
  },
  introduction:{
    color:'#666666',
    marginLeft:40,
    marginRight:40,
    marginTop:30,
    marginBottom:20,
    fontWeight: '500',
    lineHeight: 20,
  },
  button: {
      height: 30,
      width:100,
      backgroundColor: '#fff',
      borderColor: '#ff8b00',
      borderWidth: 1,
      borderRadius: 8,
      alignItems:'center',
      alignSelf:'center',
      justifyContent:'center',
      marginBottom:10,
  },
  buttonText: {
      fontSize: 17,
      color:'#ff8b00',
  },
  image:{
    margin:1,
  },
  flipCardContainer: {
    marginVertical: 40,

  },
  flipCard: {
    backfaceVisibility: 'hidden',
  },
});

module.exports = Setting;
