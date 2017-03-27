'use strict';
import {default as React,Component} from 'react';
import {
  Image,
  StyleSheet,
  View,
} from 'react-native';
const styles = StyleSheet.create({
  logoBox: {
      flexDirection: 'row',
      height: 100,

      // backgroundColor: '#aaaaaa',
      alignSelf: 'center',
  },
  logo:{
    width:240,
    height:80,
  },
});


export default (props) => {
        return(
          <View style={styles.logoBox}>
              <Image source={require('./Image/logo.png')} style={{width:props.width,height:props.height}} />
         </View>
        )

}
