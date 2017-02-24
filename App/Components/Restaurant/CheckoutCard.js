import {default as React,Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
export default (props) =>{

    return (
        <View style={styles.container}>
           <Text>
             {props.ds_name}
             {props.dish.price} {'\n'}
             {props.dish.qty}

           </Text>
         </View>
		)

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    height:40,
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 0.5,
  }
})
