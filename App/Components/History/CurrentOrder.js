import {default as React,Component} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text
} from 'react-native';
import CurrentTop from './CurrentTop';
import CurrentBottom from './CurrentBottom';
export default (props) => {
    // top
    const orderStatus       = props.current.orderStatus;
    const restaurantName    = props.current.restaurantName;
    const restaurantAddress = props.current.restaurantAddress;
    const userAddress       = props.current.userAddress;
    const phoneNumber       = props.current.cell;
    const unavailable       = props.unavailable;
    const reorder           = props.reorder;
    // bottom
    const username          = props.current.username;
    const orderId           = props.current.orderId;
    const total             = props.current.total;
    const created           = props.current.created;
    return (
      <View style={styles.mainContainer}>
          <CurrentTop   orderStatus       = {orderStatus}
                        restaurantAddress = {restaurantAddress}
                        userAddress       = {userAddress}
                        restaurantName    = {restaurantName}
                        orderStatus       = {orderStatus}
                        orderId           = {orderId}
                        unavailable       = {unavailable}
                        reorder           = {reorder}/>
          <CurrentBottom  username    = {username}
                          orderId     = {orderId}
                          total       = {total}
                          created   = {created}
                          HistoryOrderDetailVisible = {props.HistoryOrderDetailVisible}/>
      </View>
    )
}




const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

});
