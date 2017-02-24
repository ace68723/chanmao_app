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

export default class chanmao extends Component {
  constructor(){
    super()
    this.state = {
      renderLogo:true,
    }
    this.handleLogoUnmount = this.handleLogoUnmount.bind(this);
  }
  handleLogoUnmount(){
    this.setState({
      renderLogo:false,
    })
  }
  render() {
    let renderLogo = this.state.renderLogo ? <LogoAnimationView unmount={this.handleLogoUnmount}/> : null;
    return (
      <View style={styles.container}>
        <Router/>
        {renderLogo}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

AppRegistry.registerComponent('chanmao', () => chanmao);
