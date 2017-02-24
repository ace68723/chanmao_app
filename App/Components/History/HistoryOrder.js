import {default as React,Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';
import HistoryAction from '../../Actions/HistoryAction';

export default (props) => {
 // props.order.created = moment(props.order.created).format("MMM Do YYYY");
    return (
      <TouchableOpacity onPress={() => {
              HistoryAction.getHistoryDetail(props.order.oid)
              props.HistoryOrderDetailVisible()
        }}>
        <View style={styles.container}>
          <Text style={[styles.order,{flex:0.2}]}>
            # {props.order.oid}
          </Text>
          <Text style={[styles.order,{flex:0.5}]} numberOfLines={2}>
            {props.order.rrname}
          </Text>
          <Text style={[styles.time,{flex:0.3}]}>
            {props.order.created}
          </Text>
        </View>
      </TouchableOpacity>
    )
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: '#fff',
        alignItems: 'center',
        height:50,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
    },
    order:{
      marginLeft:15,
      fontSize:13,
      fontWeight:"500",
      color:"#808080",
    },
    time:{
      flex:1,
      textAlign:"right",
      marginRight:15,
      fontSize:12,
      color:"#b3b3b3",
    }

});