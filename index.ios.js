/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  AppState,
  StyleSheet,
  Text,
  Image,
  View
} from 'react-native';
import Router from './App/Components/Router';
import AdView from './App/Components/General/AdView';
import CodePush from "react-native-code-push";

export default class chanmao extends Component {
  constructor(){
    super()
    this.state = {
      isUpdate:false,
    }
    this._handleAppStateChange = this._handleAppStateChange.bind(this);
  }

  componentDidMount(){
    setTimeout( () =>{
      this.setState({
        isUpdate:false,
      })
    }, 5000);
    AppState.addEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange(currentAppState) {
    if(currentAppState === 'active'){
      this.setState({showCover:true})
      setTimeout( () =>{
        this.setState({showCover:false})
      }, 1000);
    }
  }
  codePushStatusDidChange(status) {

        switch(status) {
            case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
                console.log("Checking for updates.");
                break;
            case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
                console.log("Downloading package.");
                this.setState({
                  isUpdate:true,
                })
                break;
            case CodePush.SyncStatus.INSTALLING_UPDATE:
                console.log("Installing update.");
                break;
            case CodePush.SyncStatus.UP_TO_DATE:
                console.log("Up-to-date.");
                break;
            case CodePush.SyncStatus.UPDATE_INSTALLED:
                console.log("Update installed.");
                break;
        }
    }
  _renderUpdateView(){
    return(
      <View style={{position:'absolute',top:0,left:0,right:0,bottom:0,backgroundColor:'#ffffff',alignItems:'center',justifyContent:'center',}}>
        <Image source={require('./App/Components/Image/Loading_dots_orange.gif')}  style={{width:45,height:15}}/>
      </View>
    )
  }
  render() {
    let cover = this.state.showCover ?  <View style={{backgroundColor:'rgba(0,0,0,0)',position:'absolute',top:0,left:0,right:0,bottom:0}}/> : null;
    // {cover}
    return (
      <View style={styles.container}>
        <Router/>
        {this.state.isUpdate? this._renderUpdateView():null}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});
let  codePushOptions = {checkFrequency: CodePush.CheckFrequency.ON_APP_START,
                        installMode: CodePush.InstallMode.IMMEDIATE};
chanmao = CodePush(codePushOptions)(chanmao);
AppRegistry.registerComponent('chanmao', () => chanmao);
AppRegistry.registerComponent('AdView', () => AdView);
