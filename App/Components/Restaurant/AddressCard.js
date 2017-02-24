import {default as React,Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
export default (props) =>{

    let _addressDescription = ()=>{
      if(props.apartmentNumber ){
        return(
            <Text  style={styles.text}numberOfLines={2}>{props.apartmentNumber} - {props.addressDescription}</Text>
        )
      }else{
          return(
            <Text  style={styles.text}numberOfLines={2}>{props.addressDescription}</Text>
          )
      }
    }
    return (


          <View style={styles.container}>
              <View style={styles.row}>
                <View style={styles.col}>
                    <Image source={require('./Image/addressName.png')}
                           resizeMode={'contain'}
                           style={styles.icon}/>
                </View>
                <View style={styles.col}>
                    <Text style={styles.text}>
                      {props.name} - {props.phoneNumber}
                    </Text>
                </View>
              </View>
              <View style={styles.row}>
                <View style={styles.col}>
                    <Image source={require('./Image/addressLocation.png')}
                           resizeMode={'contain'}
                           style={styles.icon}/>
                </View>
                <View style={[styles.col,{flex:1}]}>
                    {_addressDescription()}
                </View>
              </View>
          </View>

		)

}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:'white',
  },
  icon:{
    marginLeft:20,
    height:22,
    width:16,
  },
  text:{
    fontSize:15,
    fontWeight:'400',
    color:'#9c9ea1',
    marginLeft:15,
    marginRight:20,
  },
  row:{
    flex:1,
    flexDirection: 'row',
  },
  col:{
    justifyContent:'center',
  },
})
