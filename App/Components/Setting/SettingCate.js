import {default as React,Component} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
import moment from 'moment';

export default (props) => {
 // props.order.created = moment(props.order.created).format("MMM Do YYYY");
    return (
      <TouchableHighlight onPress={props.onPress}>
        <View style={styles.container}>
            <View style={[styles.col,{  flex:0.3,}]}>
                  <Image source={props.icon} style={styles.icon} />
            </View>
          <View style={styles.col}>
            <Text style={styles.title}>
                {props.title}
            </Text>
          </View>
          <View style={[styles.col,styles.arrow]}>
              <Text style={styles.arrowText}>
                >
              </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "center",
        backgroundColor: '#fff',
        height:60,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
    },
    col: {
      flex: 1,
      // marginLeft:5,
      justifyContent: "center",
    },
    icon:{
      justifyContent: 'center',
      alignSelf: 'center',
      height:25,
      width:25,
    },
    title:{
      fontSize:20,
      textAlign: "left",
      color:'#666666',
      fontWeight:'600',
    },
    arrow:{
      flex:0.3,
      marginRight:20,
      // backgroundColor:"red"
    },
    arrowText:{
      fontSize:30,
      color:"#ff8b00",
      textAlign:"right",
    }
});
