'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Platform,
	findNodeHandle,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import MainTab from '../MainTab/MainTab';
import HistoryTab from '../History/HistoryTab';
import SettingTab from '../Setting/SettingTab';

// import HomeAction from '../../Actions/HomeAction';
import TabsState from '../../Stores/TabsStore';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from './TabBar';

const {width,height} = Dimensions.get('window');


export default class Tabs extends Component {

  constructor(){
    super()
    this.scrollViewRefs = [];
		this.state = TabsState.getState();
    this._onChange = this._onChange.bind(this);
		this._hideTabBar = this._hideTabBar.bind(this);
	  this._showTabBer = this._showTabBer.bind(this);

  }
	componentDidMount(){

	}
  _onChange(){

  }
	_hideTabBar(){
		this.setState({
			tabBarPosition:'overlayBottom',
			showTabBar:false,
		})
	}
	_showTabBer(){
		this.setState({
			showTabBar:true,
		})
		setTimeout( () =>{
			this.setState({
				tabBarPosition:'bottom',
			})
		}, 1000);
	}

	// <MainTab tabLabel='主页' navigator={this.props.navigator}/>
  render(){
    return(
      	<ScrollableTabView  tabBarPosition={this.state.tabBarPosition}
														tabBarBackgroundColor={'#fff'}
														tabBarActiveTextColor={'#ff8b00'}
														tabBarTextStyle={{fontSize:18,fontFamily:'经典圆体简',}}
														tabBarInactiveTextColor={'#666666'}
														initialPage={0}
														prerenderingSiblingsNumber={1}
                            renderTabBar={() => <TabBar/>}
														showTabBar={this.state.showTabBar}>
									<MainTab tabLabel='主页'
													 navigator={this.props.navigator}
													 hideTabBar = {this._hideTabBar}
											 	 	 showTabBer = {this._showTabBer}/>
                  <HistoryTab tabLabel='我的订单' navigator={this.props.navigator}/>
                  <SettingTab tabLabel='设置' navigator={this.props.navigator}/>
				</ScrollableTabView>
    )
  }
}

const styles = StyleSheet.create({

});