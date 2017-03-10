'use strict';
import React, {
	Component,
} from 'react';
import {
  Dimensions,
  Image,
  LayoutAnimation,
  View,
  TouchableWithoutFeedback,
} from 'react-native';

class Advertisement extends Component {
  constructor() {
      super();
      this.state = {
        adWidth:0,
        ad:0,
      };
  }
componentDidMount() {
  var animations = {
    layout: {
        spring: {
          duration: 400,
          create: {
            duration: 300,
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.opacity,
          },
          update: {
            type: LayoutAnimation.Types.spring,
            springDamping: 400,
          },
        },
        easeInEaseOut: {
          duration: 1000,
          create: {
            type: LayoutAnimation.Types.easeInEaseOut,
            property: LayoutAnimation.Properties.opacity,
          },
          update: {
            type: LayoutAnimation.Types.easeInEaseOut,
          },
        },
      },
    };
  LayoutAnimation.configureNext(animations.layout.easeInEaseOut);
  Image.getSize(this.props.AdImage, (width, height) => {
    const ratio = height/width;
    const adHeight = Dimensions.get('window').width * ratio;
    const adWidth = Dimensions.get('window').width;
    this.setState({adHeight,adWidth,});
  });
}

  render(){
    return(
      <TouchableWithoutFeedback onPress={this.props.openAdView}>
        <Image style={{width:this.state.adWidth,height:this.state.adHeight,opacity:this.state.adOpacity}}
                resizeMode={'cover'}
                source={{uri:this.props.AdImage}}/>
      </TouchableWithoutFeedback>
    )
  }
}

module.exports = Advertisement;
