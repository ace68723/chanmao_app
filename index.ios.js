/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import LogoAnimationView from './App/Components/Logo/LogoAnimationView';
import Router from './App/Components/Router';
import CodePush from "react-native-code-push";

export default class chanmao extends Component {
  constructor(){
    super()
    this.state = {
      renderLogo:true,
      isUpdate:false,
    }
    this.handleLogoUnmount = this.handleLogoUnmount.bind(this);
  }

  componentDidMount(){
    setTimeout( () =>{
      this.setState({
        isUpdate:false,
      })
    }, 5000);
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
  handleLogoUnmount(){
    this.setState({
      renderLogo:false,
    })
  }
  render() {
    let renderLogo = this.state.renderLogo ? <LogoAnimationView unmount={this.handleLogoUnmount}/> : null;
    let updateView = this.state.isUpdate ? <View style={{position:'absolute',top:0,left:0,right:0,bottom:0,backgroundColor:'#ffffff'}}/> : null;
    return (
      <View style={styles.container}>
        <Router/>
        {renderLogo}
        {updateView}
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
