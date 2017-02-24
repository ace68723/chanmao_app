import React, {
	Component,
} from 'react';
import {
  Animated,
  View,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);



class SwipeOut extends Component{
    constructor(props) {
      super(props);
      this.state = {
        fadeAnim: new Animated.Value(0),
        leftAnim: new Animated.Value(0),
        rightAnim: new Animated.Value(0),
        scrollEnabled:true,
        mainScrollEnabled:true,
      };
      this._open = this._open.bind(this);
      this._close = this._close.bind(this);
      this.handleScroll=  this.handleScroll.bind(this)
      this.handleTouchStart=  this.handleTouchStart.bind(this)
      this.handleTouchEnd=  this.handleTouchEnd.bind(this)
    }
    componentDidMount() {
      Animated.timing(
        this.state.fadeAnim,
        {toValue: 1}
      ).start();
      Animated.timing(
        this.state.leftAnim,
        {toValue: 100}
      ).start();
    }
    _close(){
      this.refs._scrollView.scrollTo({x: 0, y: 0, animated: true})
      setTimeout(()=>{
        this.setState({
          scrollEnabled:true,
          mainScrollEnabled:true,
        })
      },1000)
    }
     _open(){
       this.refs._scrollView.scrollTo({x: 100, y: 0, animated: true})
    }
    handleScroll(event){
     this.setState({
       offsetX: event.nativeEvent.contentOffset.x
     })
   }
   handleTouchStart(event){
     if(this.state.offsetX == 100){
       this.opening=false;
         this._close()
     }
     if(this.state.offsetX == 0  ){
       this.opening = true
     }

   }
   handleTouchEnd(event){
       if(this.opening){
         if(this.state.offsetX >40 ){
           this.setState({
             scrollEnabled:false,
             mainScrollEnabled:false,
             offsetX:100
           })
           this._open()
         }else if (this.state.offsetX < 40 ){
           this.setState({
             offsetX:0
           })
           this._close()
         }
       }
   }
    render(){
        let _addressDescription = ()=>{
          if(this.props.apartmentNumber){
            return(
                <Text  style={styles.text}numberOfLines={2}>{this.props.apartmentNumber} - {this.props.addressDescription}</Text>
            )
          }else{
              return(
                <Text  style={styles.text}numberOfLines={2}>{this.props.addressDescription}</Text>
              )
          }
        }
        let _buzzCode = () => {
          if(this.props.buzz){
            return(
                <Text  style={styles.text}numberOfLines={1}>buzz: {this.props.buzz} </Text>
            )
          }
        }
        // <TouchableWithoutFeedback onPress={this.props.delete}>
        // <View style={{flex: 1,height: 100,width:100,backgroundColor:'rgba(0,0,0,0)',}}>
        // </View>
        // </TouchableWithoutFeedback>
        //
        //
        // <View style={{  position: 'absolute',height:100, right: 0,width:100,backgroundColor:'red',}}>
        //   <Text>{"删除"}</Text>
        // </View>


        // ================================
        // scroll View
        // ================================

          // <ScrollView   horizontal={true}
          //               directionalLockEnabled={true}
          //               showsHorizontalScrollIndicator={false}
          //               bounces={false}
          //               ref='_scrollView'
          //               scrollEventThrottle={16}
          //               onScroll={this.handleScroll}
          //               onTouchStart={this.handleTouchStart}
          //               onTouchEnd={this.handleTouchEnd}
          //               scrollEnabled={this.state.scrollEnabled}
          //               style={{flex: 1,
          //                       height: 100,
          //                       flexDirection: 'column',
          //                       backgroundColor:'rgba(0,0,0,0)',
          //                       left:0,
          //                       right:0,}}>
          //
          //
          // </ScrollView>
        return(
                  <View style={{flex:1,height:100}}>

                      <View style={{flex: 1,height: 100,backgroundColor:'white',justifyContent:'center',}}>
                          <Text style={styles.text}>
                            {this.props.name} - {this.props.phoneNumber}
                          </Text>
                          {_buzzCode()}
                          {_addressDescription()}
                          <TouchableOpacity style={styles.rightButton}
                                            activeOpacity={0.4}
                                            onPress={this.props.delete.bind(null,this.props.uaid,this.props.addressDescription)}>
                                  <Text style= {styles.rightButtonText}>{"删除"}</Text>
                          </TouchableOpacity>

                      </View>

                  </View>
        )
    }
}

const styles = StyleSheet.create({
  text:{
    fontSize:15,
    fontWeight:'600',
    color:'#9c9ea1',
    marginTop:6,
    marginLeft:20,
    marginRight:20,
  },
  row:{
    flex:1,
    flexDirection: 'row',
  },
  col:{
    flex:1,
    justifyContent:'flex-start',
  },
  rightButton:{
    borderWidth:1,
    borderRadius:6,
    width:50,
    position:'absolute',
    right:10,
    top:10,
    borderColor:'#ff8b00',
  },
  rightButtonText:{
    margin:5,
    fontSize:14,
    color:'#ff8b00',
    alignSelf:'center',
  },
});

module.exports = SwipeOut
