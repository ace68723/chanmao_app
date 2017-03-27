'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Swiper from 'react-native-swiper'



const {width,height} = Dimensions.get('window');
var cols = 2;
var boxW = 100;
// var vMargin = (width-cols*boxW)/(cols+1);
// var hMargin = 25;

export default class LoginButton extends Component {

  constructor(){
    super();
		this._handleOnPress = this._handleOnPress.bind(this);
  }
	componentDidMount(){
    const index = this.props.index;
		const scrollView = this.refs._scrollVew;
		const scrollViewContent = this.refs._scrollViewContent;
		const ref = Object.assign({},{index,scrollView,scrollViewContent})
		this.props.getScrollViewRefs(ref)
	}
	_handleOnPress(advertisement){
		if(advertisement.navitype == 2){
			this.props.navigator.push({
				id: 'AdView',
				url:advertisement.naviparam.url,
			})
		}
		if(advertisement.navitype == 3){
				advertisement.restaurant = advertisement.naviparam;
				this.props.openMenu(height,advertisement.naviparam);
		}
	}
  _renderAdv(){
    if(this.props.advertisement && this.props.advertisement.length>0){
				let Ad = this.props.advertisement.map((advertisement,index)=>{
					return(
						<TouchableWithoutFeedback key={index} onPress={this._handleOnPress.bind(null,advertisement)}>
							<View style={styles.autoViewStyle}>
								<Image source={{uri:advertisement.image}} style={styles.adLarger}/>
							</View>
						</TouchableWithoutFeedback>
					)

				})
      return(
        <View style={styles.container}>
					{Ad}
        </View>

      )
    }
  }

  render(){
    return(
        <ScrollView style={styles.scrollView}
										ref={'_scrollVew'}
                    scrollEventThrottle={16}
				            onScroll={this.props.scrollEventBind()}
										showsVerticalScrollIndicator={false}>

             <View style={{marginTop:202,height:0}}
                   ref={'_scrollViewContent'}/>
						 {this._renderAdv()}
        </ScrollView>


    )
  }
}
const styles = StyleSheet.create({
	container: {
	 flex: 1,
	 flexDirection:'row',
	 flexWrap:'wrap',
	},
	scrollView:{
		flex: 1,
		marginTop: 18,
		paddingTop:20,
	},
	autoViewStyle:{
		alignItems:'center',
		width:(width-9)/2,
		height:(width-9)/(2*1.157),
		marginLeft:3,
		marginTop:3,
	},
  adLarger:{
    width:(width-9)/2,
    height:(width-9)/(2*1.157),
  },
  adSmall:{
    width:(width-7)/2,
    height:(width-7)/(2*2.358),
  },
});
