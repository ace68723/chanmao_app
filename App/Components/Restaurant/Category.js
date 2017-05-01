import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  InteractionManager,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import Dimensions from 'Dimensions';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

// <Animated.Image                         // 基础组件: Image, Text, View
//   source={{uri: 'http://i.imgur.com/XMKOH81.jpg'}}
//   style={{
//     flex: 1,
//
//   }}
// />

// <TouchableOpacity
//   onPress={this._onPressButton.bind(this)}
//   style={styles.button}
//   >
//   <Text style={styles.welcome}
//   >
//   </Text>
// </TouchableOpacity>

export default class Category extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      bounceValueColor: new Animated.Value(0),
      bounceValue: new Animated.Value(0.95*width),
      bounceValueTop: new Animated.Value(height-0.05*width),
      bounceValueBackColor: new Animated.Value(0),
      bounceValueButtonColor: new Animated.Value(0),
      showCategory:false,
      openBook:false,
    };
    this._handleCategoryPress = this._handleCategoryPress.bind(this);
    this._renderListView = this._renderListView.bind(this);
  }
  _onPressButton(){
    if(this.state.showCategory){
      this._closeAnimation()
    }else{
      this._openAnimation()
    }
  }
  _openAnimation(){
    this.setState({showCategory:true,openBook:true})
    requestAnimationFrame(() => {
      Animated.parallel([
      Animated.timing(  // 支持: spring, decay, timing，过渡的动画方式
        this.state.bounceValue,
        {
          toValue: 0.2*width,  // 目标值
          duration:300,
        }),
      Animated.timing(  // 支持: spring, decay, timing，过渡的动画方式
        this.state.bounceValueTop,
        {
          toValue: 0.3*height,
          duration:300,
        }),
      Animated.timing(  // 支持: spring, decay, timing，过渡的动画方式
        this.state.bounceValueColor,
        {
          toValue: 150,  // 目标值
          duration:300,
        }),
      Animated.timing(  // 支持: spring, decay, timing，过渡的动画方式
        this.state.bounceValueBackColor,
        {
          toValue: 150,  // 目标值
          duration:300,
        }),
          Animated.timing(  // 支持: spring, decay, timing，过渡的动画方式
          this.state.bounceValueButtonColor,
          {
            toValue: 150,  // 目标值
            duration:300,
          }),
    ]).start();  // 开始
    })
  }
  _closeAnimation(){
    this.setState({openBook:false})
    setTimeout(() => {
      this.setState({showCategory:false})
    }, 500);
    requestAnimationFrame(() => {
      Animated.parallel([
      Animated.timing(  // 支持: spring, decay, timing，过渡的动画方式
        this.state.bounceValue,
        {
          toValue: 0.95*width,  // 目标值
          duration:300,
        }),
      Animated.timing(  // 支持: spring, decay, timing，过渡的动画方式
        this.state.bounceValueTop,
          {
            toValue: height-0.05*width,
            duration:300,
          }),
      Animated.timing(  // 支持: spring, decay, timing，过渡的动画方式
        this.state.bounceValueColor,
        {
          toValue: 0,  // 目标值
          duration:300,
        }),
      Animated.timing(  // 支持: spring, decay, timing，过渡的动画方式
        this.state.bounceValueBackColor,
        {
          toValue: 0,  // 目标值
          duration:300,
        }),
      Animated.timing(  // 支持: spring, decay, timing，过渡的动画方式
        this.state.bounceValueButtonColor,
        {
          toValue: 0,  // 目标值
          duration:300,
        }),
    ]).start();  // 开始
    })
  }
  _handleCategoryPress(category_position){
      this.props.handleCategoryPress(category_position);
      this._closeAnimation();
  }
  _renderListView(){
    if(this.props.categoryList){
        var list = this.props.categoryList;
        const _handleCategoryPress = this._handleCategoryPress;
        var cateGoryList = list.map(function (category, index) {

          return(

              <TouchableOpacity
                onPress={_handleCategoryPress.bind(null,category.category_position)}
                key={index}
                style={{ borderColor:"#e2e2e4",
                                          borderBottomWidth: 1,
                                          height:40,
                                          flex:1,}}>
              <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                <Text
                  style={{flex:0.8,color:'black',fontFamily:'FZZhunYuan-M02S',fontSize:16,}}>
                  {category.category_name}
                </Text>
                <View style={{flex:0.2,alignItems:'flex-end'}}>
                  <Text
                    style={{color:'black',fontFamily:'FZZhunYuan-M02S',fontSize:16,color:'#808080'}}>
                      {category.dishAmount}
                  </Text>
                </View>

              </View>

              </TouchableOpacity>
          )
      })
    }
    // 支持: Image, Text, View
    return(
      <Animated.View
        style={{
              position:'absolute',
              top:this.state.bounceValueTop,
              left:this.state.bounceValue,
              right:0.1*width,
              bottom:0.1*width,
              backgroundColor:'white',
            }}>
        <ScrollView showsVerticalScrollIndicator={false}
                    style={{paddingLeft:30,paddingRight:30,paddingTop:20,}}>
          {cateGoryList}
          <View style={{height:50}}/>
        </ScrollView>
      </Animated.View>
    )
  }
  _renderTouchBackground(){
    let backgroundColor=this.state.bounceValueBackColor.interpolate({
      inputRange: [0, 150],
      outputRange: ['rgba(0,0,0,0)', 'rgba(0,0,0,0.4)']
    });
    return (
      <TouchableWithoutFeedback
        onPress={this._onPressButton.bind(this)}
        style={
          {
            flex:1,
            backgroundColor:'rgba(0,0,0,0)',
          }
        }>
        <Animated.View style={
          {
            flex:1,
            backgroundColor: backgroundColor,
          }
        }>

        </Animated.View>
      </TouchableWithoutFeedback>
     )
  }

  _renderTouchButton()
  {
    if(!this.state.openBook){
      return (
        <TouchableWithoutFeedback
          onPress={this._onPressButton.bind(this)}>
          <Image  source={require('./Image/button_menu_close.png')}
                  style={
                    {
                      position:'absolute',
                      height: 0.15*width,
                      width: 0.15*width*0.9,
                      right:0.05*width,
                      bottom:0.05*width,
                    }
                  }/>
        </TouchableWithoutFeedback>
      )
    }else{
      return <TouchableWithoutFeedback
        onPress={this._onPressButton.bind(this)}>
        <Image  source={require('./Image/button_menu_open.png')}
                style={
                  {
                    position:'absolute',
                    height: 0.15*width,
                    width: 0.15*width*1.369,
                    right:0.05*width,
                    bottom:0.05*width,
                  }
                }/>
      </TouchableWithoutFeedback>
    }

  }

  render() {
    let left, right, top, bottom;
    if(this.state.showCategory){
      left = 0;
      right = 0;
      top = 0;
      bottom = 0
    }else{
      left = width - 0.15*width*1.369 - 0.05*width; //width - bookwidth - bookRight
      right = 0;
      top = height - 0.15*width - 0.05*width;//height - bookheight - bookBottom
      bottom = 0
    }
    return (
      <View style={[styles.container,{left:left,right:right,top:top,bottom:bottom,}]}>
        {this._renderTouchBackground()}
        {this._renderListView()}
        {this._renderTouchButton()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    backgroundColor:'rgba(0,0,0,0)',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color:'black',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  botton: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
});
