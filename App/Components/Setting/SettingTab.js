/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
	Component,
} from 'react';
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
} from 'react-native';
import SettingCate from './SettingCate';
import SettingHeader from './SettingHeader';
import Header from '../General/Header';

import AuthAction from  '../../Actions/AuthAction';

class SettingTab extends Component {
    constructor(props) {
        super(props);
        this._goToAddress = this._goToAddress.bind(this);
				this._goToAboutUs = this._goToAboutUs.bind(this);
    }
    _goToAddress(){
      this.props.navigator.push({
        id: 'Address',
      });
    }
    _goToAboutUs(){
      this.props.navigator.push({
        id: 'AboutUs',
      });
    }
    // onPress={this._goToAboutUs.bind(this)}


    //   <SettingCate  title={'添加地址'}
			// 							onPress={this._goToAddress.bind(this)}
			// 							icon={require('./Image/setting.png')}/>

    render(){
      return(
        <View style={styles.mainContainer}>
            <Header title={'设置'}/>
            <ScrollView style={styles.scrollView}>
							<SettingCate  title={'关于我们'}
														icon={require('./Image/information.png')}
														onPress={this._goToAboutUs}
														/>
              <SettingCate  title={'退出登录'}
                            icon={require('./Image/logout.png')}
                            onPress={AuthAction.logout}/>
            </ScrollView>
        </View>
      )
    }
}




let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  scrollView:{
    flex: 1,
    marginTop:64,
  },
});

module.exports = SettingTab;
