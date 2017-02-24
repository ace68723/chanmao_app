'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Image,
  Dimensions,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  PixelRatio,
} from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

class RestaurantCard extends Component {
      constructor(props) {
          super();
          this.state={
            ref:props.restaurant.rid,
            imgUrl:props.restaurant.imgUrl,
          }
          this._openMenu = this._openMenu.bind(this);
      }
      close(){
        if(this.props.restaurant.close){
          return(
            <View style={{flex:1,
                          backgroundColor:'rgba(0,0,0,0.2)'}}>
                <Text style={{fontWeight:'700',
                              fontSize:20,
                              color:'#ffffff',
                              textAlign:'center',
                              top:90}}>
                  商家关门啦
                </Text>
            </View>
          )
        }

      }
      pormotion(){
        //  if(true){
        //    return(
        //      <View style={styles.col}>
        //          <View style={styles.pormotion}>
        //              <Text style={styles.pormotionText}>
        //                  全店满$100减$50{}
        //              </Text>
        //          </View>
        //      </View>
        //    )
         //
        //  }
      }
      recommend(){
        if(this.props.restaurant.rank > 0){
          return(
            <Image
              source={require('./Image/recommend.png')}
              style={[{height:50,width:50,top:7,right:7,position:'absolute'}]}
            />
          )
        }
      }
      _openMenu(){
        this.refs[this.state.ref].measure( (fx, fy, width, height, px, py) => {
            this.props.openMenu(py,this.props.restaurant);
        })
        // this.openMenuAnimation(imageUrl)
      }
      _renderDistance(){
        if(this.props.restaurant.distance > 0){
          return(
            <View style={{flex:1,
													flexDirection:"row",
													justifyContent:"flex-end",
													alignItems:"flex-end",
												}}>
							<Image
								source={require('./Image/icon_distance.png')}
								style={[{height:12,width:8.7,top:-2}]}
							/>
              <Text style={{color:'#ababb0',fontSize:12,fontWeight:'400',marginLeft:3,textAlign:'right'}}>

                  {(this.props.restaurant.distance/1000).toFixed(2)} km
              </Text>
            </View>
          )
        }

      }

      // {this.recommend()}
      render(){
        return(
          <TouchableWithoutFeedback
            onPress={this._openMenu}
            >
            <View style={{marginBottom:10,
													shadowColor: "#e2e2e4",
                          shadowOpacity: 1,
                          shadowOffset: {
                           height: 2,
                           width: 2
												 },
													backgroundColor:'#ffffff',
												 }}>
                <View  style={{ height:200,
                                marginTop:0,
                                overflow: 'hidden',
                                left:0,
                                right:0,
                                borderColor:"#e2e2e4",
                                borderTopWidth:StyleSheet.hairlineWidth,
                                borderLeftWidth:StyleSheet.hairlineWidth,
                                borderRightWidth:StyleSheet.hairlineWidth,
                                marginLeft:7,
                                marginRight:7}}
                          ref={this.state.ref} >
                    <Image
                      source={this.state.imgUrl}
                      style={[{height:SCREEN_WIDTH/1.25,
                               width:null,}]}
                      resizeMode={'cover'}
                    >
                    {this.recommend()}
                    {this.close()}
                    </Image>

                </View>

                <View style={{backgroundColor:'#ffffff',
                              padding:8,
                              marginLeft:7,
                              marginRight:7,
                              borderColor:"#e2e2e4",
                              borderBottomWidth: StyleSheet.hairlineWidth,
                              borderLeftWidth:StyleSheet.hairlineWidth,
                              borderRightWidth:StyleSheet.hairlineWidth,}}>
                  <Text style={{color:'#363646',fontSize:15,fontWeight:'500'}}>
                      {this.props.restaurant.name}
                  </Text>
                  <View style={{flexDirection:"row"}}>
                    <View style={{flex:1,}}>
                      <Text style={{color:'#ababb0',fontSize:12,fontWeight:'400',marginTop:5,}}>
                          {this.props.restaurant.desc}
                      </Text>
                    </View>
                    {this._renderDistance()}

                  </View>

                </View>

            </View>
           </TouchableWithoutFeedback>
        )
      }

}
let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop:5,

    width: null,
  },
  restaurant:{
      flex: 1,
      marginLeft:15,
      marginRight:15,
      borderRadius: 8,
      height: (Dimensions.get('window').width-30)/3.56,
      // width: null,
  },
  pormotionRestaurant:{
      flex: 1,
      marginLeft:15,
      marginRight:15,
      borderRadius: 8,
      borderColor: '#ff8b00',
      borderWidth:3,
      height: (Dimensions.get('window').width-30)/3.56,
  },
  pormotionBox:{
      flex:1,
      flexDirection: 'row',
      marginLeft:15,
      marginRight:15,
  },
  col: {
    flex: 1,
  },
  recommend:{
      alignSelf: 'flex-start',
      backgroundColor:'#ff8b00',
      width:80,
      height:30,
      marginBottom:-8,
      borderRadius: 5,
      borderColor: '#ff8b00',
      borderWidth:1,
  },
  recommendText:{
      color:'#fff',
      marginTop:5,
      marginLeft:7,
  },
  pormotion:{
      alignSelf: 'flex-end',
      // width:150,
      height:30,
      marginBottom:-8,
  },
  pormotionText:{
    textAlign:'right',
    color:'#d9553f',
    fontSize:18,
  },
  close:{
    alignSelf: 'flex-end',
    backgroundColor:'#ff8b00',
    marginTop:5,
    marginRight:5,
    width:80,
    height:25,
    borderRadius: 5,
    borderColor: '#ff8b00',
    borderWidth:1,
    justifyContent:'center',
  },
  closeText:{
    color:'#ffffff',
    alignSelf:'center',
  }
})
module.exports = RestaurantCard;
