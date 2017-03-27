'use strict';
import {default as React,Component} from 'react';
import AppString from '../../Constants/AppString';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
const {width,height} = Dimensions.get('window')
const styles = StyleSheet.create({
  copyRightView:{
    position:'absolute',
    right:0,
    left:0,
    bottom:height*0.025,
    height: 20,
    alignItems:'center',
  },
  copyright:{
    fontSize:12,
    backgroundColor:'rgba(0,0,0,0)',
    color:'#ffffff'
  },
});


export default (props) => {
        return(
          <View style={styles.copyRightView}>
            <Text style={styles.copyright}>{AppString('copyright')}</Text>
         </View>
        )

}
