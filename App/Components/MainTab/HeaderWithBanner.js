
import React, {
	Component,
} from 'react';

import {
	Animated,
  Dimensions,
  Image,
	Platform,
	View,
	ScrollView,
  StyleSheet,
	StatusBar,
	TouchableOpacity,
} from 'react-native';

import Swiper from 'react-native-swiper'

const deviceWidth = Dimensions.get('window').width;
const HEADER_MAX_HEIGHT = 200;
// const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_MIN_HEIGHT = 20;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
class ActivityHeaderWithBanner extends Component {
	  constructor(){
	    super()
	  }
		_renderBanner(){
			const imageTranslate = this.props.scrollY.interpolate({
				inputRange: [0, HEADER_SCROLL_DISTANCE],
				outputRange: [0, -50],
				extrapolate: 'clamp',
			});
			if(this.props.bannerList ){
				return  this.props.bannerList.map((banner,index)=>{
						return(
											<Animated.Image
											 key={index}
												style={[
													styles.backgroundImage,
													{ transform: [{translateY: imageTranslate}]},
												]}
												 source={{uri: banner.image}}
											/>
						)
					})
			}
		}
		_renderSwiper(){
				return(
						<Swiper showsButtons={false}
										showsPagination={false}
										height={200}
										autoplay={true}
										autoplayTimeout={5}
										loop={true}>
										{this._renderBanner()}
						</Swiper>
				)
			}
			// {this._renderSwiper()}
		render() {
			const headerHeight = this.props.scrollY.interpolate({
	      inputRange: [0, HEADER_SCROLL_DISTANCE],
	      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
	      extrapolate: 'clamp',
	    });
			const imageOpacity = this.props.scrollY.interpolate({
	      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
	      outputRange: [1, 1, 0],
	      extrapolate: 'clamp',
	    });
			// opacity:imageOpacity,
	    return (
				<Animated.View style={[styles.header, {height: headerHeight,opacity:imageOpacity,}]}>
					<StatusBar
							barStyle="default"
						/>
					{this._renderSwiper()}
        </Animated.View>
	    );
	  }
	}

const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
});

module.exports = ActivityHeaderWithBanner;
