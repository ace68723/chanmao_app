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
  TouchableWithoutFeedback,
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



  render(){
    return(
      <View >


      </View>
    )
  }
}
const styles = StyleSheet.create({
});







/*
 * font icon example
 */
// import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
// import icoMoonConfig from './fontConfig.json';
// const Icon = createIconSetFromIcoMoon(icoMoonConfig);
// <Icon name="cm-location" size={30} color="#000000" />
