import {default as React,Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
export default (props) =>{
    return (
          <View style={styles.container}>
            <Image source={props.icon}
                   resizeMode={'contain'}
                   style={styles.icon}/>
              <Text style={styles.title}>
                {props.title}:
              </Text>
              <Text style={styles.value}>
                {props.value}
              </Text>
          </View>

		)

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'white',
    borderColor:"#e2e2e4",
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems:'center',
    height:50,
  },
  row:{
    flex:1,
    flexDirection: 'row',
  },
  icon:{
    marginLeft:20,
    height:28,
    width:28,
  },
  title:{
    marginLeft:10,
    fontSize:15,
    color:'#808080',
  },
  value:{
    marginLeft:5,
    fontSize:15,
    color:'#ff8b00',
  },
})
