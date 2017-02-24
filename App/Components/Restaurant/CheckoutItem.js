import {default as React,Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
} from 'react-native';
export default (props) => {

    return (
        <View style={styles.container}>

              <View style={{flex:1,justifyContent:'center',}}>
                  <Text style={styles.itemTitle}>
                    {props.ds_name}
                  </Text>
              </View>
              <View style={{flex:1,alignItems:'flex-end',justifyContent:'center',}}>
                <Text style={styles.quantity}>
                  {props.dish.price} × {props.dish.qty}
                </Text>
              </View>
         </View>

		)

}

const styles = StyleSheet.create({
  container:{
    flex:1,
    // height:80,
    backgroundColor: '#fff',
    borderColor:"#e2e2e4",
    borderBottomWidth: StyleSheet.hairlineWidth,
    padding:15,
    flexDirection:'row',

  },
  itemTitle:{
    color:'#4d4d4d',
    fontSize:16,
  },
  price:{
    marginTop:10,
    color:'#ff8b00',
    fontSize:15,
    fontWeight:'500',
  },
  quantity:{
    color:'#4d4d4d',
    fontSize:16,
  },
  decreaseButton:{
    width:50,
    height:40,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#ff8b00',
    borderWidth:2,
    borderRadius:8,
  },
  decreaseIcon:{
    fontSize:20,
    color:'#ff8b00',
  }
})
