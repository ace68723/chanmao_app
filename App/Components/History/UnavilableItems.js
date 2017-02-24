import {default as React,Component} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import CheckoutItem from '../Restaurant/CheckoutItem';
import OrderAction from '../../Actions/OrderAction';

export default (props) => {
    const reorder = () => {
      props.reorder(props.unavailable);
    }
    let unavailableList = props.unavailable.map((item,index) => {
        const dish = item;
        dish.qty = item.amount;
        return(
          <CheckoutItem key={index}
                    ds_name = {dish.ds_name}
                    dish = {dish}
                    qty = {dish.qty}/>
        )
    })
    // <TouchableOpacity style={styles.unavilableButton}
    //                   activeOpacity={0.4}
    //                   onPress={reorder}>
    //     <Text style={styles.unavilableText}>
    //        保留已点菜品，继续点餐
    //     </Text>
    // </TouchableOpacity>
    return(
      <View style={{flex:1}}>
        <Text style={[styles.unavilableText,{fontSize:14}]}>
          以下菜品没有啦
        </Text>
        {unavailableList}

      </View>

    )
}


const styles = StyleSheet.create({
    unavilableButton:{
      width:300,
      height:40,
      borderWidth:1,
      borderColor:'#ff8b00',
      justifyContent:'center',
      alignSelf:'center',
      borderRadius :10,
      marginTop:20,
      marginBottom:10,
    },
    unavilableText: {
      textAlign: 'center',
      color: '#ff8b00',
      marginBottom: 5,
      fontSize:20,
    },

});
