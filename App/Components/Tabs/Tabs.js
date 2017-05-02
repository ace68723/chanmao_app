'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  Dimensions,
  Image,
	ScrollView,
	TextInput,
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
import TabsStore from '../../Stores/TabsStore';

import ScrollableTabView from 'react-native-scrollable-tab-view';
import TabBar from './TabBar';

const {width,height} = Dimensions.get('window');


export default class Tabs extends Component {

  constructor(){
    super()
    this.scrollViewRefs = [];
		this.state = TabsStore.getState();
    this._onChange = this._onChange.bind(this);
		this._hideTabBar = this._hideTabBar.bind(this);
	  this._showTabBar = this._showTabBar.bind(this);

  }
	componentDidMount(){
		TabsStore.addChangeListener(this._onChange);
	}
	componentWillUnmount(){
		TabsStore.removeChangeListener(this._onChange);
	}
  _onChange(){
		const newState = Object.assign({},this.state,TabsStore.getState());
		this.setState(newState);
		if(this.state.goToHistory){
			this.tabView.goToPage(1);
			this._showTabBar();
		}
  }
	_hideTabBar(){
		if(this.state.showTabBar){
			this.setState({
				tabBarPosition:'overlayBottom',
				showTabBar:false,
			})
		}

	}
	_showTabBar(){
		if(!this.state.showTabBar){
			this.setState({
				showTabBar:true,
			})
			setTimeout(() =>{
				this.setState({
					tabBarPosition:'bottom',
				})
			}, 300);
		}
	}

	// <MainTab tabLabel='主页' navigator={this.props.navigator}/>
		// <ScrollableTabView  ref={(tabView) => { this.tabView = tabView; }}
		// 										locked={true}
		// 										tabBarPosition={this.state.tabBarPosition}
		// 										tabBarBackgroundColor={'#fff'}
		// 										tabBarActiveTextColor={'#ff8b00'}
		// 										tabBarTextStyle={{fontSize:12,fontFamily:'FZZhunYuan-M02S',top:5}}
		// 										tabBarInactiveTextColor={'#666666'}
		// 										initialPage={0}
		// 										prerenderingSiblingsNumber={1}
		// 										renderTabBar={() => <TabBar />}
		// 										keyboardShouldPersistTaps={'always'}
		// 										showTabBar={this.state.showTabBar}>
		//
							// <MainTab tabLabel='主页'
							// 				 navigator={this.props.navigator}
							// 				 hideTabBar = {this._hideTabBar}
							// 				 showTabBar = {this._showTabBar}/>
		// 					<HistoryTab tabLabel='我的订单'
		// 											navigator={this.props.navigator}
		// 											hideTabBar = {this._hideTabBar}
		// 											showTabBar = {this._showTabBar}/>
		// 					<SettingTab tabLabel='设置' navigator={this.props.navigator}/>
		// </ScrollableTabView>
  render(){
    return(

		 <ScrollableTabView  ref={(tabView) => { this.tabView = tabView; }}
												 locked={true}
												 tabBarPosition={this.state.tabBarPosition}
												 tabBarBackgroundColor={'#fff'}
												 tabBarActiveTextColor={'#ff8b00'}
												 tabBarTextStyle={{fontSize:12,fontFamily:'FZZhunYuan-M02S',top:5}}
												 tabBarInactiveTextColor={'#666666'}
												 initialPage={0}
												 prerenderingSiblingsNumber={1}
												 renderTabBar={() => <TabBar />}
												 keyboardShouldPersistTaps={'always'}
												 showTabBar={this.state.showTabBar}>

							 <MainTab tabLabel='主页'
												navigator={this.props.navigator}
												hideTabBar = {this._hideTabBar}
												showTabBar = {this._showTabBar}/>
							 <HistoryTab tabLabel='我的订单'
													 navigator={this.props.navigator}
													 hideTabBar = {this._hideTabBar}
													 showTabBar = {this._showTabBar}/>
							 <SettingTab tabLabel='设置' navigator={this.props.navigator}/>
		 </ScrollableTabView>

    )
  }
}

const styles = StyleSheet.create({

});
