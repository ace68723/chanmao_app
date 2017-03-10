import {default as React,Component} from 'react';
import {
  Image,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import CurrentTop from './CurrentTop';
import moment from 'moment';
import HistoryAction from '../../Actions/HistoryAction';

export default (props) => {
const createdTime = moment(props.created).format('h:mm:ss a');
    return (
      <View style={styles.mainContainer}>
          <View style={styles.row}>
            <View style={styles.col}>

                <Text style={styles.title}>
                  Customer:
                </Text>

                <Text style={styles.description}>
                  {props.username}
                </Text>

            </View>
            <View style={styles.col}>

                <Text style={styles.title}>
                  Order Id:
                </Text>

                <Text style={styles.description}>
                  {props.orderId}
                </Text>

            </View>
            <View style={styles.col}>

                <Text style={styles.title}>
                  Total:
                </Text>

                <Text style={styles.description}>
                  ${props.total}
                </Text>

            </View>
          </View>

          <View style={[styles.row,{marginTop:10}]}>
          <View style={styles.col}>
            <Text style={styles.title}>
              下单时间
            </Text>
            <Text style={styles.title}>
               {createdTime}
            </Text>
          </View>
           <View style={[styles.col]}>
            <Text style={styles.title}>
               微信客服公众号
             </Text>
             <Text style={[styles.title,{fontWeight:"700",fontFamily:'FZZhunYuan-M02S',}]}>
                chanmaoweixin
              </Text>
           </View>
            <View style={styles.col}>
                  <TouchableOpacity
                     style={styles.button}
                     activeOpacity={0.4}
                     onPress={() => {
                        props.HistoryOrderDetailVisible(props.orderId)
                     }}>
                    <Text style={styles.buttonText}>
                        查看订单
                    </Text>
                  </TouchableOpacity>
            </View>
          </View>



          <Text style={[styles.title,{textAlign:'center',marginTop:10,fontSize:11,fontFamily:'FZZhunYuan-M02S',}]}>
           *订单配送时长会因商家、交通和天气原因造成部分延迟,请您见谅
          </Text>


      </View>

    )
}
//   <View style={styles.col}>
  //   <Text style={styles.title}>
  //     预计送达:
  //   </Text>
  // </View>
  // <View style={styles.col}>
  //     <Text style={styles.title}>
  //       45-60分钟
  //     </Text>
  // </View>


const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        margin:5,
        // justifyContent: "center",
        // alignItems:"center",
    },
    row:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: "center",
    },
    col: {
      flex: 1,
      marginTop:5,
      alignItems: "center",
    },
    // box:{
    //   flex:1,
    //   alignItems:"center",
    // },
    title:{
      color:"#666",
      textAlign:"left",
      fontSize:12,
      fontFamily:'FZZhunYuan-M02S',
    },
    description:{
      textAlign:"left",
      fontSize:17,
      fontFamily:'FZZhunYuan-M02S',
    },
    order:{
      marginLeft:10,
      fontSize:16,
    },
    button: {
        flex: 1,
        width:100,
        // marginTop:5,
        marginBottom:5,
        padding:5,
        backgroundColor: '#fff',
        // borderColor: '#ff8b00',
        // borderWidth: 1,
        // borderRadius: 8,
        alignItems:'center',
        justifyContent:'center',
    },
    buttonText: {
        fontSize: 15,
        color:'#ff8b00',
        fontFamily:'FZZhunYuan-M02S',
    },

});
