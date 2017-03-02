'use strict';
import React, {
	Component,
} from 'react';
import {
	Alert,
  Animated,
  Dimensions,
  Image,
	ListView,
  StyleSheet,
  Text,
	TextInput,
	TouchableOpacity,
  View,
} from 'react-native';
import {
    filter,
} from 'lodash';

import Header from '../General/Header';
import MenuCard from './MenuCard';

import MenuStore from '../../Stores/MenuStore';

const {width,height} = Dimensions.get('window');
export default class LoginButton extends Component {

  constructor(props){
    super(props);
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		const menuState = MenuStore.menuState()
		const cartTotals = MenuStore.menuState().cartTotals;
		cartTotals.total = cartTotals.total.toFixed(2);
		this.state = {
			menu:menuState.menu,
			cartTotals:cartTotals,
			dataSource: this.ds.cloneWithRows([]),
			restaurant:props.restaurant,
		}
		this._setSearchText = this._setSearchText.bind(this);
		this._onChange = this._onChange.bind(this);
		this._goBack = this._goBack.bind(this);
		this._goToCheckout = this._goToCheckout.bind(this);

  }
	componentDidMount(){
		MenuStore.addChangeListener(this._onChange);
	}
	componentWillUnmount() {
		MenuStore.removeChangeListener(this._onChange);
	}
	_onChange(){
			const cartTotals = MenuStore.menuState().cartTotals;
			cartTotals.total = cartTotals.total.toFixed(2);
			const filteredMenu = MenuStore.getFilteredMenu(this.state.filteredMenu)
			this.setState({
				cartTotals:cartTotals,
				dataSource:this.state.dataSource.cloneWithRows(filteredMenu),
			})
	}
	_goBack(){
		this.props.navigator.pop();
	}
	_goToCheckout(){
		if(Number(this.state.cartTotals.total)>0){
			if(Number(this.state.cartTotals.total)>=Number(this.state.restaurant.start_amount)){
				this.props.navigator.push({
					id: 'Checkout',
					restaurant:this.state.restaurant,
				})
			}else{
				Alert.alert(
					'馋猫订餐提醒您',
					'不足'+this.state.restaurant.start_amount+'只能自取哦～',
					[
						{text: '取消', onPress: () => {}, style: 'cancel'},
						{text: '好哒', onPress: () => {
								 this.props.navigator.push({
										id: 'Checkout',
										restaurant:this.state.restaurant,
									})
								}
						},
					],
				);
			}

		}
	}
	_setSearchText(searchText){
		if(searchText){
			let filteredData = this._filterNotes(searchText, this.state.menu);
			const filteredMenu = MenuStore.getFilteredMenu(filteredData)
			this.setState({
				 filteredMenu:filteredData,
				 dataSource: this.state.dataSource.cloneWithRows(filteredMenu),
			 });
		}else{
			this.setState({
				 filteredMenu:[],
				 dataSource: this.state.dataSource.cloneWithRows([]),
			 });
		}

	}
	_filterNotes(searchText, notes) {
			let text = searchText.toLowerCase();
			return filter(notes, (dish) => {
				if(!dish.ds_name) return
				let note = dish.ds_name.toLowerCase();
				return note.search(text) !== -1;
			});
	}
	_renderMenuList (item,index)  {
			const dish = item;
			return(
				<MenuCard key={index}
									ds_name = {dish.ds_name}
									dish = {dish}
									qty = {dish.qty}
									addItem = {this.props.addItem}
									addToOrder= {this.props.addToOrder}/>
			)
	}

  render(){
    return(
      <View >
			<Header title={this.props.restaurant.name}
							goBack={this._goBack}
							leftButtonText={'×'}/>
			<TouchableOpacity onPress={this._goToCheckout}
								style={{backgroundColor:"rgba(234,123,33,0.9)",
										width:width,
										height:50,
										marginTop:64,
										flexDirection:"row",
										alignItems:"center",
										justifyContent:"center",
									}}>
				<Text style={{color:"#ffffff",fontSize:16,margin:3}}>${this.state.cartTotals.total}</Text>
				<View style={{margin:3,
											borderRadius:15,
											borderWidth:1,
											paddingLeft:10,
											paddingRight:10,
											paddingTop:2,
											paddingBottom:2,
											borderColor:"#ffffff"}}>
					<Text  style={{color:"#ffffff",fontSize:13,}}>去结账</Text>
				</View>

			</TouchableOpacity>
			 <TextInput
			 			style={[styles.input]}
			 			placeholder={"搜索"}
			 			placeholderTextColor={'#ea7b21'}
			 			selectionColor={'#ea7b21'}
			 			keyboardType = { 'url'}
			 			autoCorrect= { false}
						autoFocus={true}
			 			returnKeyType={'next'}
			 			onChangeText={this._setSearchText}
			 	/>

				<ListView
						dataSource={this.state.dataSource}
						initialListSize={50}
						pageSize={50}
						renderRow={(item) => this._renderMenuList(item)}
						scrollRenderAheadDistance={300 }
						enableEmptySections={true}
						style={{overflow:'hidden',backgroundColor:"rgba(0,0,0,0)"}}
					/>
      </View>
    )
  }
}
const styles = StyleSheet.create({
	input:{
		fontSize: 18,
		borderRadius: 8,
		color: '#ea7b21',
		height:40,
		width:width,
		marginTop:5,
	},
});
