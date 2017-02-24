'use strict';

import React, {
	Component,
} from 'react';
import {
  Keyboard,
  LayoutAnimation,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import Header from '../General/Header';

let _keyboardWillShowSubscription;
let _keyboardWillHideSubscription;
class CommentInput extends Component {
  constructor(props){
    super(props);
    this.state = {
      bottom:0,
      height:50,
      showSubmitButton:this.props.showSubmitButton,
      hideCommentButton: this.props.hideCommentButton,
    }
  }
  componentWillMount() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    _keyboardWillShowSubscription = Keyboard.addListener('keyboardWillShow', (e) => this._keyboardWillShow(e));
    _keyboardWillHideSubscription = Keyboard.addListener('keyboardWillHide', (e) => {
      const _keyboardWillHide = this._keyboardWillHide.bind(this);
      const event = e;
      _keyboardWillHide(event)
    });
  }
  componentWillUnmount() {
    _keyboardWillShowSubscription.remove();
    _keyboardWillHideSubscription.remove();
  }
  _keyboardWillShow(e) {
      let inputTop;
      this.refs['commentInput'].measure( (fx, fy, width, height, px, py) => {
      })
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
      this.setState({ bottom: e.endCoordinates.height,
                      height:100,
                      showSubmitButton:true
                    });
  }
  _keyboardWillHide(e) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    this.setState({ bottom: 0,
                    height:50,
                    showSubmitButton:false
                  });
  }
  button(){
    if(this.state.showSubmitButton){
      return(
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button} onPress={this.props.submitComment.bind(null,this.refs['commentInput'])}>
            <Text style={styles.buttonText}>
              提交
            </Text>
          </TouchableOpacity>
        </View>
      )
    }else if(!this.state.hideCommentButton){
      return(
        <View style={styles.buttonView}>
          <TouchableOpacity style={styles.button}
                            onPress={this.props.goToCommentList}>
            <Text style={styles.buttonText}>
              {this.props.commentAmount}评
            </Text>
          </TouchableOpacity>
        </View>
      )
    }
  }
  render() {

    return (

        <View style={[styles.container,{bottom: this.state.bottom,height:this.state.height}]} >
          <View style={{height:0.5,backgroundColor:'#b3b3b8'}}>

          </View>
          <View style={{flexDirection:'row',flex:1,padding:10,}}>
            <TextInput style={styles.TextInput}
                       ref={'commentInput'}
                       placeholder="发表评论"
                       selectionColor="#ff8b00"
                       multiline={true}
                       onChangeText={(text) => this.props.commentChange(text)}>
            </TextInput>
            {this.button()}
          </View>

       </View>


    );
  }
}

const styles = StyleSheet.create({
  container: {
    position:'absolute',
    height:50,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:'#f3f3f3',

    // borderTopWidth:1,
    // borderTopColor:'#b1b1b1',
  },
  TextInput:{
    flex:1,
    color:'#000000',
    fontSize:16,
    padding:3,
    paddingLeft:6,
    backgroundColor:'#ffffff',
    borderRadius:6,
    borderColor:'#b1b1b1',
  },
  buttonView:{
    width:80,
    alignItems:'center',
    justifyContent:'center',
  },
  button:{
    // flex:1,
    position:'absolute',
    bottom:0,
    left:5,
    right:0,
    height:30,
    borderRadius:5,
    borderWidth:1,
    borderColor:'#ff8b00',
    backgroundColor:'#ff8b00',
    alignItems:'center',
    justifyContent:'center',
  },
  buttonText:{
    color:'#ffffff',
    fontWeight:'500',
  }
});

module.exports = CommentInput;
