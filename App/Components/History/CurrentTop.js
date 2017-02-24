import {default as React,Component} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
} from 'react-native';

import PhoneNumberVerify from './PhoneNumberVerify';
import UnavilableItems from './UnavilableItems';

export default (props) => {
    let statusMessage;
    let statusImageURL;
    let statusColor;
    switch (props.orderStatus) {
        case '0':
            statusColor = {color:'#b2b2b2'};
            statusMessage = '等待商家确认';
            statusImageURL = require("./Images/normal.png");
            break;
        case '10':
            statusColor = {color:'#33cd5f'};
            statusMessage = '商家已确认, 准备中';
            statusImageURL = require("./Images/normal.png");
            break;
        case '20':
            statusColor = {color:'#33cd5f'};
            statusMessage = '商家已确认, 准备中';
            statusImageURL = require("./Images/normal.png");
            break;
        case '30':
            statusColor = {color:'#9bc8df'};
            statusMessage = '送餐员已开始送餐';
            statusImageURL = require("./Images/happy.png");
            break;
        case '40':
            statusColor = {color:'#11c1f3'};
            statusMessage = '已送到, 满意吗？';
            statusImageURL = require("./Images/happy.png");
            break;
        case '55':
            statusColor = {color:'#886aea'};
            statusMessage = '新用户订单确认中';
            statusImageURL = require("./Images/normal.png");
            break;
        case '60':
            statusColor = {color:'#11c1f3'};
            statusMessage = '客服稍后联系您改运费 >_<';
            statusImageURL = require("./Images/normal.png");
            break;
        case '5':
            statusColor = {color:'#ef473a'};
            statusMessage = '糟糕, 有的菜没了 #_#';
            statusImageURL = require("./Images/unhappy.png");
            break;
    }
    const _phoneNumberVerify = () => {
      if(props.orderStatus == 55){
        return(
            <PhoneNumberVerify  orderId={props.orderId}/>
        )
      }
    }

    const _unavailableItems = () => {
      if(props.unavailable){
        return(
          <UnavilableItems unavailable = {props.unavailable}
                           reorder = {props.reorder}/>
        )
      }
    }

    return (
      <View style={styles.mainContainer}>
          <View style={styles.row}>
            <View style={styles.col}>
                <Text style={styles.resturantName}>
                  {props.restaurantName}
                </Text>

                <Text style={styles.resturantAddress}>
                  {props.restaurantAddress}
                </Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.resturantName}>
                  ->
                </Text>
            </View>
            <View style={styles.col}>
                <Text style={styles.resturantName}>
                  目的地
                </Text>
                <Text style={styles.resturantAddress}>
                  {props.userAddress}
                </Text>
            </View>
          </View>
          <Image source={statusImageURL}
                 style={styles.logo} />
           <View style={styles.col}>
               <Text style={[styles.resturantName,statusColor]}>
                  {statusMessage}
               </Text>
           </View>
           {_phoneNumberVerify()}
           {_unavailableItems()}

      </View>

    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        borderBottomColor:'#ddd',
        borderBottomWidth:1,
    },
    row:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: "center",
    },
    col: {
      flex: 1,
      margin:10,
    },
    logo:{
      alignSelf: 'center',
      marginTop:-30,
      width:52,
      height:61,
    },
    resturantName:{
      textAlign:"center",
      fontSize:17,
    },
    resturantAddress:{
      textAlign:"center",
      fontSize:12,
    },
    order:{
      marginLeft:10,
      fontSize:16,
    },
});
