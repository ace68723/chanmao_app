'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Swiper from 'react-native-swiper'

import HomeAction from '../../Actions/HomeAction';
import HomeStore from '../../Stores/HomeStore';

const {width,height} = Dimensions.get('window');
const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class LoginButton extends Component {

  constructor(){
    super();
		this.state = {
      banner:[],
      scrollY: new Animated.Value(0),
		}
    this._onChange = this._onChange.bind(this);
  }
	componentDidMount(){
    HomeAction.getHomeData();
    // HomeStore.addChangeListener(this._onChange);

    const index = this.props.index;
		const scrollView = this.refs._scrollVew;
		const scrollViewContent = this.refs._scrollViewContent;
		const ref = Object.assign({},{index,scrollView,scrollViewContent})
		this.props.getScrollViewRefs(ref)

	}
  _onChange(){
    const homeData = HomeStore.getHomeData();
    if(homeData.zone1 && homeData.zone2){
        this.setState({
          banner:homeData.zone1,
          advertisement:homeData.zone2,
        })
        HomeStore.removeChangeListener(this._onChange);
      }
  }



  render(){
    return(
        <ScrollView ref={'_scrollVew'}
                    scrollEventThrottle={16}
				            onScroll={this.props.scrollEventBind()}
                    contentOffset={{x:0,y:240}}>
             <View style={[styles.scrollViewContent,]}
                   ref={'_scrollViewContent'}>

                   <Text style={styles.buttonText}>
                     点餐 {"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐
                     点餐 {"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐
                     点餐 {"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐
                     点餐 {"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐{"\n"}点餐

                   </Text>

             </View>


          </ScrollView>


    )
  }
}
const styles = StyleSheet.create({
  swiperImage:{
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		width: null,
		height: HEADER_MAX_HEIGHT,
		resizeMode: 'cover',
  },
});
