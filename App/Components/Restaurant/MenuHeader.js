'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
	InteractionManager,
  View,
} from 'react-native';
const {width,height} = Dimensions.get('window');
export default class LoginButton extends Component {

  constructor(props){
    super();
		// props.py+
		this.state = {
			restaurantCardTop:new Animated.Value(200),
			margin:new Animated.Value(0),
			intrOpacity:new Animated.Value(1),
			rrOpacity:new Animated.Value(0),
			height:new Animated.Value(53),
		}

  }
	componentDidMount(){
		// setTimeout( ()=> {
			InteractionManager.runAfterInteractions(() => {
				Animated.parallel([
					Animated.timing(this.state.margin, {
						toValue: 20,
						duration: 400,
					}),
					Animated.timing(this.state.intrOpacity, {
						toValue: 0,
						duration: 400,
					}),
					Animated.timing(this.state.rrOpacity, {
						toValue: 1,
						delay:100,
						duration: 300,
					}),
					Animated.timing(this.state.height, {
						toValue: 100,
						duration: 400,
					}),
				]).start()
			})
		// }, 0);
	}
	close(){
		InteractionManager.runAfterInteractions(() => {
			Animated.parallel([
				Animated.timing(this.state.margin, {
					toValue: 0,
					delay:100,
					duration: 300,
				}),
				Animated.timing(this.state.intrOpacity, {
					toValue: 1,
					duration: 400,
				}),
				Animated.timing(this.state.rrOpacity, {
					toValue: 0,
					duration: 400,
				}),
				Animated.timing(this.state.height, {
					toValue: 53,
					delay:100,
					duration: 300,
				}),
			]).start()
		})
	}
	_renderStartMount(){
		if(Number(this.props.restaurant.start_amount)!=0){
			return(
				<Text style={{textAlign:'center',
															 marginTop:7,
															 fontSize:13,
															 color:'#3a3b47',
															 fontFamily:'FZZhunYuan-M02S',
														 }}>
						最低起送价: {this.props.restaurant.start_amount}
				</Text>
			)
		}else{
			<Text style={{marginBottom:15,}}/>
		}
	}

  render(){
		const translateY = this.props.offset.interpolate({
      inputRange: [-400, 350],
      outputRange: [600, -150],
      extrapolate: 'clamp',
    });
    return(
			<Animated.View style={{backgroundColor:'#ffffff',
										padding:8,
										paddingBottom:23,
										borderColor:"#e2e2e4",
										shadowColor: "#e2e2e4",
										shadowOpacity: 1,
										shadowOffset: {
										 height: 2,
										 width: 2
									 },
										borderBottomWidth: StyleSheet.hairlineWidth,
										borderLeftWidth:StyleSheet.hairlineWidth,
										borderRightWidth:StyleSheet.hairlineWidth,
										transform: [{translateY}],
										marginLeft:this.state.margin,
										marginRight:this.state.margin,
										height:this.state.height,
									}}>
				<Animated.View style={{opacity:this.state.intrOpacity,}}>
					<Text style={{color:'#363646',fontSize:15,fontWeight:'500',fontFamily:'FZZongYi-M05S',}}>
							{this.props.restaurant.name}
					</Text>
					<View style={{flexDirection:"row"}}>
						<View style={{flex:1,}}>
							<Text style={{color:'#ababb0',fontSize:12,fontWeight:'200',marginTop:5,fontFamily:'FZZhunYuan-M02S'}}>
									{this.props.restaurant.desc}
							</Text>
						</View>
					</View>
				</Animated.View>
				<Animated.View style={{opacity:this.state.rrOpacity,}}>
					<Text style={{color:'#363646',
																	fontSize:25,
																	fontWeight:'500',
																	fontFamily:'FZZongYi-M05S',
																	marginTop:-20,
																	textAlign:'center',
																	}}>
							{this.props.restaurant.name}
					</Text>
					<Text style={{color:'#ababb0',
																	fontSize:13,
																	fontWeight:'400',
																	fontFamily:'FZZhunYuan-M02S',
																	marginTop:10,
																	textAlign:'center',}}>
						{this.props.restaurant.desc}
					</Text>
					{this._renderStartMount()}
					<Text style={{textAlign:'center',color:'#84828d',fontFamily:'FZZhunYuan-M02S'}}>
						{this.props.start_time} - {this.props.end_time}
					</Text>
				</Animated.View>

			</Animated.View>
    )
  }
}
const styles = StyleSheet.create({
});
