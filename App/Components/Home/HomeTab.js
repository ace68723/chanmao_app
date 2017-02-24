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
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Swiper from 'react-native-swiper'



const {width,height} = Dimensions.get('window');


export default class LoginButton extends Component {

  constructor(){
    super();
		this.state = {

		}
  }
	componentDidMount(){


    const index = this.props.index;
		const scrollView = this.refs._scrollVew;
		const scrollViewContent = this.refs._scrollViewContent;
		const ref = Object.assign({},{index,scrollView,scrollViewContent})
		this.props.getScrollViewRefs(ref)

	}

  _renderAdv(){
    if(this.props.advertisement && this.props.advertisement.length>0){
      return(
        <View style={styles.container}>


              <View style={{flexDirection:'row',marginLeft:2,marginRight:2,}}>
                   <Image source={{uri:this.props.advertisement[0].image}} style={styles.adLarger}/>
               <View style={{marginLeft:3,flexDirection:'column'}}>
                    <Image source={{uri:this.props.advertisement[1].image}} style={styles.adLarger}/>

               </View>
             </View>
             <View style={{flexDirection:'row',marginLeft:2,marginRight:2,marginTop:3}}>
               <View style={{marginRight:3,flexDirection:'column'}}>
                    <Image source={{uri:this.props.advertisement[2].image}} style={styles.adLarger}/>
               </View>
                    <Image source={{uri:this.props.advertisement[3].image}} style={styles.adLarger}/>
             </View>
             <View style={{flexDirection:'row',marginLeft:2,marginRight:2,marginTop:3}}>
                  <Image source={{uri:this.props.advertisement[4].image}} style={styles.adLarger}/>
              <View style={{marginLeft:3,flexDirection:'column'}}>
                  <Image source={{uri:this.props.advertisement[5].image}} style={styles.adLarger}/>

              </View>
            </View>
						<View style={{flexDirection:'row',marginLeft:2,marginRight:2,marginTop:3}}>
								 <Image source={{uri:this.props.advertisement[4].image}} style={styles.adLarger}/>
						 <View style={{marginLeft:3,flexDirection:'column'}}>
								 <Image source={{uri:this.props.advertisement[5].image}} style={styles.adLarger}/>

						 </View>
					 </View>
       </View>

      )
    }
  }

  render(){
    return(
        <ScrollView ref={'_scrollVew'}
                    scrollEventThrottle={16}
				            onScroll={this.props.scrollEventBind()}>

             <View style={{marginTop:240,height:0}}
                   ref={'_scrollViewContent'}/>
						 {this._renderAdv()}

        </ScrollView>


    )
  }
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
  adLarger:{
    width:(width-7)/2,
    height:(width-7)/(2*1.157),
  },
  adSmall:{
    width:(width-7)/2,
    height:(width-7)/(2*2.358),
  },
});
