'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Text,
  View,
} from 'react-native';

const {width,height} = Dimensions.get('window');
export default class LogoAnimationView extends Component {
  static propTypes = {
      unmount: React.PropTypes.func.isRequired,
  }
  constructor() {
    super();
    this.state = {
      firstTime:false,
      stage: 0,
      timeout:1500,
      viewOpacity:new Animated.Value(1),
    }

  }
  componentDidMount(){
    if (this.state.firstTime){
      this._startLongAnimation();
    }else{
      this.setState({
        stage:4
      })
      this._startShortAnimation();
    }
  }
  _startShortAnimation(){
    // fade out LogoAnimationView
    setTimeout(() =>{
      Animated.timing(this.state.viewOpacity, {
        toValue: 0,
        duration: 400,
      }).start();
    }, 5500);
    // fade out LogoAnimationView end

    // unmount view
    setTimeout(() =>{
      this.props.unmount();
    }, 6000);
  }
  _startLongAnimation(){
    const chageStage = () => {
      if(this.state.stage == 3){
        clearInterval(interval);
      }
      this.setState({
        stage:this.state.stage+1,
      })
    }
    const interval = setInterval(function () {
      chageStage()
    }, this.state.timeout);

    // fade out LogoAnimationView
    setTimeout(() =>{
      Animated.timing(this.state.viewOpacity, {
        toValue: 0,
        duration: 400,
      }).start();
    }, 12000);
    // fade out LogoAnimationView end

    // unmount view
    setTimeout(() =>{
      this.props.unmount();
    }, 12500);

  }
  _renderAnimation(){
      switch (this.state.stage) {
        case 1:
          return(<Image style={{
                         width:300,
                         height:300,
                         position:'absolute',
                         bottom:0,
                         right:0,
                        }}
                 source={require('./Image/1.gif')} />)
          break;
          case 2:
            return(<Image style={{
                           width:300,
                           height:300,
                           position:'absolute',
                           bottom:0,
                           left:0,}}
                   source={require('./Image/2.gif')} />)
            break;
          case 3:
            return(<Image style={{
                           width:300,
                           height:300,
                           position:'absolute',
                           top:0,
                           right:0,}}
                   source={require('./Image/3.gif')} />)
            break;
            case 4:
						  // AuthService.doAuth();
              return(
									<Image style={{
                             width:300,
                             height:300,
                             alignSelf:'center'}}
                     source={require('./Image/4.gif')} />)

              break;
        default:

      }
    }
  render(){
      return(
        <Animated.View style={{ position:'absolute',
                            left:0,
                            right:0,
                            top:0,
                            bottom:0,
                            backgroundColor:'#ffffff',
                            opacity:this.state.viewOpacity,
                            justifyContent:'center'}}>
          {this._renderAnimation()}
        </Animated.View>

      )
    }
}
