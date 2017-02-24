import {default as React,Component} from 'react';
import {
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default (props) =>{
        return (
          <View style={styles.container}>
              <Text style={styles.title}>
                设置
              </Text>
          </View>
        )

}
const styles = StyleSheet.create({
  container:{
    position:'absolute',
    top:0,
    left:0,
    right:0,
    height:64,
    borderBottomWidth:2,
    borderBottomColor:'#f4f4f4',
    backgroundColor:'#f4f4f4',
    justifyContent: 'center',
    alignItems:'center',
  },
  title:{
    marginTop:10,
    color:'#666666',
    fontSize:20,
    fontWeight:'900',
  },
})
