

import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  Modal,
  Text,
  TouchableWithoutFeedback,
  ScrollView,
  View
} from 'react-native';

import HistoryStore from '../../Stores/HistoryStore';
const {height, width} = Dimensions.get('window');
const  AnimatedScrollView = Animated.createAnimatedComponent(ScrollView)
class HistoryOrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state ={
      historyOrder: null,
      historyOrderMarginTop: new Animated.Value(height), //
    }
    this._onChange = this._onChange.bind(this);
  }
  componentDidMount(){
    HistoryStore.addChangeListener(this._onChange);
  }
  componentWillUnmount() {
    HistoryStore.removeChangeListener(this._onChange);
  }
  _onChange(){
    this.setState({
      historyOrder: HistoryStore.getHistoryDetail(),
    })
  }
  _renderHistoryOrder(){
    if(this.state.historyOrder){
      Animated.timing(          // Uses easing functions
        this.state.historyOrderMarginTop,    // The value to drive
        {toValue: height*0.3,
         duration: 600,
        }            // Configuration
      ).start();
      let itemList = this.state.historyOrder.items.map( (item,index)=> {
        return (
          <View style={{flexDirection:'row',marginTop:5}} key={index}>
            <Text style={{flex:1,fontFamily:'FZZhunYuan-M02S',}}>
              {item.name}  x  {item.qty}
            </Text>
            <Text style={{flex:0.3,textAlign:"right",fontFamily:'FZZhunYuan-M02S',}}>
              ${item.price}
            </Text>
          </View>
        )
      });
      return(
        <Animated.View style={{backgroundColor:'#ffffff',marginTop:this.state.historyOrderMarginTop,marginBottom:height*0.2,marginLeft:30,marginRight:30,borderRadius:8,padding:10,}}>

          <Text style={{textAlign:'center',color:"#666666",fontSize:17,marginBottom:5,fontFamily:'FZZhunYuan-M02S',}}>
            #{this.state.historyOrder.oid}
          </Text>
          <TouchableWithoutFeedback onPress={()=>{this.props.HistoryOrderDetailVisible()}}>
            <View style={{position:"absolute",left:-10,top:-10,width:30,height:30,borderRadius:15,backgroundColor:"rgba(0,0,0,0.6)"}}>
              <Text style={{fontSize:25,textAlign:"center",color:"#ffffff",marginTop:-2,fontFamily:'FZZhunYuan-M02S',}}>
                ×
              </Text>
            </View>
          </TouchableWithoutFeedback>
          <View style={{flex:1,height:1,backgroundColor:"#b3b3b3"}}/>
          <View style={{padding:10}}>
          <View style={{flexDirection:"row",}}>
            <Text style={{flex:1,textAlign:"left",fontSize:15,fontWeight:"600",fontFamily:'FZZhunYuan-M02S',}}>
              {this.state.historyOrder.name}
            </Text>
            <Text style={{flex:1,textAlign:"right", fontSize:11,marginTop:5,fontFamily:'FZZhunYuan-M02S',}}>
              {this.state.historyOrder.created}
            </Text>
          </View>
          <View style={{marginTop:10,}} showsVerticalScrollIndicator={true}>
            {itemList}
            <Text style={{textAlign:"right",fontWeight:"500",marginTop:15,fontFamily:'FZZhunYuan-M02S',}}>
              Total: ${this.state.historyOrder.total}
            </Text>
          </View>
          </View>

        </Animated.View>
      )
    }
  }
  render() {
    return (

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.props.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
          transparent={true}
          >
          <ScrollView style={{backgroundColor:"rgba(0,0,0,0.6)"}}>
            <TouchableWithoutFeedback onPress={()=>{this.props.HistoryOrderDetailVisible()}}>
              <View style={{position:"absolute",left:0,right:0,top:-300,bottom:-300}}/>
            </TouchableWithoutFeedback>


            {this._renderHistoryOrder()}
          </ScrollView>



        </Modal>


    );
  }
}


module.exports = HistoryOrderDetail;
