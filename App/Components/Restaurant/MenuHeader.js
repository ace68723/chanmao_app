'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const {width,height} = Dimensions.get('window');
export default class LoginButton extends Component {

  constructor(){
    super();
		this.state = {
		}

  }
	componentDidMount(){
	}
	_renderStartMount(){
		if(Number(this.props.restaurant.start_amount)==0){
			return(
				<Animated.Text style={{textAlign:'center',
															 marginTop:7,
															 fontSize:13,
															 color:'#3a3b47',
															 opacity:this.props.MIV_MTime,
															 marginBottom:15,
															 fontFamily:'FZZhunYuan-M02S',
														 }}>
						最低起送价: {this.props.restaurant.start_amount}
				</Animated.Text>
			)
		}
	}
  render(){
    const translateY = this.props.offset.interpolate({
      inputRange: [-300, 350],
      outputRange: [300, -350],
      extrapolate: 'clamp',
    });
    return(
      <Animated.View style={{position: 'absolute',
                            left: 0,
                            top: 0,
                            right: 0,
                            transform: [{translateY}]}}>
        <Animated.View style={{
                      backgroundColor:'#ffffff',
                      width:null,
                      padding:8,
                      marginTop:200,
                      marginLeft:this.props.showMenuAnimation.interpolate({
                                                  inputRange: [0, 1],
                                                  outputRange: [0,20],
                                                }),
                      marginRight:this.props.showMenuAnimation.interpolate({
                                                  inputRange: [0, 1],
                                                  outputRange: [0,20],
                                                }),
                      borderColor:"#e2e2e4",
                      borderBottomWidth: 1,
                      shadowColor: "#e2e2e4",
                      shadowOpacity: 1,
                      shadowOffset: {
                       height: 1,
                       width: 0
                      }
            }}>
            <Animated.Text style={{color:'#363646',
                                    fontSize:15,
                                    fontWeight:'500',
																		fontFamily:'FZZongYi-M05S',
                                    opacity:this.props.showMenuAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1,0],
                                      }),}}
																			>
                {this.props.restaurant.name}
            </Animated.Text>
            <Animated.Text style={{color:'#ababb0',
                                    fontSize:12,
                                    fontWeight:'400',
                                    marginTop:5,
																		fontFamily:'FZZhunYuan-M02S',
                                    opacity:this.props.showMenuAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [1,0],
                                      }),}}
																			>
              {this.props.restaurant.desc}
            </Animated.Text>

            <Animated.Text style={{color:'#363646',
                                    fontSize:25,
                                    fontWeight:'500',
																		fontFamily:'FZZongYi-M05S',
                                    marginTop:-20,
                                    textAlign:'center',
                                    opacity:this.props.showMenuAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0,1],
                                      }),}}>
                {this.props.restaurant.name}
            </Animated.Text>
            <Animated.Text style={{color:'#ababb0',
                                    fontSize:13,
                                    fontWeight:'400',
																		fontFamily:'FZZhunYuan-M02S',
                                    marginTop:10,
                                    textAlign:'center',
                                    opacity:this.props.showMenuAnimation.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [0,1],
                                      }),}}>
              {this.props.restaurant.desc}
            </Animated.Text>
						{this._renderStartMount()}
        </Animated.View>
        <Animated.Text style={{textAlign:'center',marginTop:7,color:'#84828d',fontFamily:'FZZhunYuan-M02S',opacity:this.props.MIV_MTime}}>
          {this.props.start_time} - {this.props.end_time}
        </Animated.Text>

      </Animated.View>
    )
  }
}
const styles = StyleSheet.create({
});
