'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
	Alert,
  Dimensions,
  Image,
	ListView,
  StyleSheet,
  Text,
  TextInput,
	TouchableWithoutFeedback,
  View,
	ScrollView,
} from 'react-native';



import Header from '../General/Header';
import PredictionCard from './PredictionCard';
import AddInfo from './AddInfo';

import AddressAction from '../../Actions/AddressAction';
import RestaurantAction from '../../Actions/RestaurantAction';
import AddressStore from '../../Stores/AddressStore';

const {width,height} = Dimensions.get('window');
export default class LoginButton extends Component {

  constructor(){
    super();
		this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		const AddressListState = AddressStore.getAddressListState()
		console.log(AddressListState)
		const state = {dataSource: this.ds.cloneWithRows(AddressListState.addressList)}
		this.state = Object.assign({},state,AddressListState);
    this._onChange = this._onChange.bind(this);
    this._goBack = this._goBack.bind(this);
    this._handleSearchChange = this._handleSearchChange.bind(this);
		this._chooseAddress = this._chooseAddress.bind(this);
		this._deleteAddress = this._deleteAddress.bind(this);
		this._selectAddress = this._selectAddress.bind(this);
  }
	componentDidMount(){
		AddressStore.addChangeListener(this._onChange);
	}
  componentWillUnmount() {
    AddressStore.removeChangeListener(this._onChange);
  }
  _onChange(){
		const addressListState = AddressStore.getAddressListState();
		const dataSource = {dataSource:this.state.dataSource.cloneWithRows(addressListState.addressList)}
		const state = Object.assign({},addressListState,dataSource)
		this.setState(state)
  }

  _goBack(){
		if(this.state.selectedUaid){
			this.props.navigator.pop();
			setTimeout(() => {
				RestaurantAction.calculateDeliveryFee()
			}, 400);
		}
  }
	//for add userInfo
	_chooseAddress(placeId){
		AddressAction.formatAddress(placeId)
		setTimeout(()=> {
			this.setState({
				searchAddress:""
			})
		}, 500);
	}

	_deleteAddress(address){
		Alert.alert(
			'删除地址',
			"addressDescription",
			[
				{text: '取消', onPress: () => {}, style: 'cancel'},
				{text: '确认', onPress: password => AddressAction.deleteAddress(address)},
			]
		)
	}
	_selectAddress(address){
		AddressAction.selectAddress(address)

	}
  _handleSearchChange(text){
    this.setState({
        searchAddress: text
    });
    const url = "https://maps.googleapis.com/maps/api/place/autocomplete/" +
    "json?input="+ text +
    "&language=en" +
    "&components=country:ca"+
    "&types=address" +
    "&key=AIzaSyA-DNIURR8yEk2wbSKYZ_44qzzCNhLWhVA"
    let options = {
        method: 'GET',
        mode:'cors',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    fetch(url,options)
      .then((res) => res.json())
      .then((res)=>{
        this.setState({
           predictionsData: res.predictions
        });
      })
      .catch((error) => {throw error})
	}
  _formatPhoneNumber(tel){
			if(!tel) return
      const city ="("+tel.slice(0, 3)+")";
      const area = tel.slice(3,6)+"-";
      const number = tel.slice(6,10);
      const formatTel =city+area+number
      return formatTel;
  }
  _renderAddress(address){
			let apt_no;
			if(!address.uaid) return null;
      if(address.apt_no){
        apt_no = "Unit:"+address.apt_no + " - "
      }
			// if(address.type == "S") return;
			let icon = ()=>{
				if(address.type == "H"){
					return (
						<View style={{flex:1,flexDirection:"row",alignItems:"flex-end"}}>
							<TouchableWithoutFeedback onPress={this._deleteAddress.bind(null,address)}>
									<Image style={{width:30,height:29.2}}
												source={require('./Image/icon_address_home.png')}/>
							</TouchableWithoutFeedback>
							<Text style={{fontSize:20,marginLeft:15}}>
								Home
							</Text>
						</View>
					)
				}else if(address.type == "W"){
					return(
						<View style={{flex:1,flexDirection:"row",alignItems:"flex-end"}}>
							<TouchableWithoutFeedback onPress={this._deleteAddress.bind(null,address)}>
									<Image style={{width:30,height:27.1}}
												source={require('./Image/icon_address_work.png')}/>
							</TouchableWithoutFeedback>
							<Text style={{fontSize:20,marginLeft:15}}>
								Work
							</Text>
						</View>
					)
				}else if (address.type == "O"){
					return(

						<View style={{flex:1,flexDirection:"row",alignItems:"flex-end"}}>
							<TouchableWithoutFeedback onPress={this._deleteAddress.bind(null,address)}>
									<Image style={{width:22,height:30}}
												source={require('./Image/icon_address_other.png')}/>
							</TouchableWithoutFeedback>
							<Text style={{fontSize:20,marginLeft:15}}>
								Other
							</Text>
						</View>

					)
				}
			}
			let selectedIcon = () =>{
				if(address.selected){
					return (
						<Image style ={{width:20,height:20,position:"absolute",bottom:10,right:10}}
									 source={require('./Image/icon_check.png')}/>
					)
				}
			}
			return(
				<TouchableWithoutFeedback onPress={this._selectAddress.bind(null,address)}>
				<View
							style={{backgroundColor:"#ffffff",
											marginTop:10,
											height:120,
											padding:15,
											paddingLeft:30,
											paddingRight:30,
											shadowColor: "#000000",
											shadowOpacity: 0.1,
											shadowOffset: {
												 height: 0.5,
												 width: 0.5,
											},
										}}>
					<View style={{borderColor:"#e2e2e4",
												borderBottomWidth: StyleSheet.hairlineWidth,
												flexDirection:"row",
												paddingBottom:5,
											}}>
											{icon()}
						<View style={{flex:1,flexDirection:"row",alignItems:"flex-end",justifyContent:"flex-end"}}>
							<TouchableWithoutFeedback onPress={this._deleteAddress.bind(null,address)}>
									<Image style={{width:25,height:26.6,marginLeft:15,}}
												 source={require('./Image/icon_address_delete.png')}/>
							</TouchableWithoutFeedback>
						</View>
					</View>
					<Text style={{fontSize:15}}>
						{address.name} {this._formatPhoneNumber(address.tel)}
					</Text>
					<Text>
						{apt_no}{address.addr}
					</Text>
					{selectedIcon()}
				</View>
				</TouchableWithoutFeedback>
      )


  }
  _renderSearchInput(){
    return(
      <View style={{  padding:15,
                      paddingLeft:30,
                      paddingRight:30,
                      backgroundColor:"#ffffff",
                      flexDirection:"row",
											marginTop:64,
                    }}>
        <Image style={{width:22.68,height:30}}
              source={require('./Image/icon_address.png')}/>
        <TextInput
            style={[styles.input]}
            placeholder={"输入地址"}
            placeholderTextColor={'#999999'}
            selectionColor={'#ea7b21'}
            keyboardType = { 'default'}
            autoCorrect= { false}
            returnKeyType={'next'}
            onChangeText={this._handleSearchChange}
        />
      </View>
    )
  }
	// _renderView(){
	// 	if(!this.state.addInfo){
	// 		let predictionList = this.state.predictionsData.map((prediction,index) => {
	// 					return <PredictionCard  key = { index }
	// 																	description = { prediction.description }
	// 																	placeId = {prediction.place_id}
	// 																	chooseAddress = {this._chooseAddress}/>
	// 				})
	// 		let address = this.state.addressList.map((address,index) => {
	// 			return this._renderAddress(address)
	// 		})
	// 		return(
	// 			<ScrollView style={{marginTop:64,padding:10,}}>
	// 				{this._renderSearchInput()}
	// 				{predictionList}
	// 				{address}
	// 			</ScrollView>
	// 		)
	// 	}else{
	// 		return(
	// 			<AddInfo/>
	// 		)
	// 	}
	// }
  // {this._renderAddress(this.state.addressList[0])}


	// <ScrollView style={{marginTop:64,padding:10,}}>
	// 	{this._renderSearchInput()}
	// 	{predictionList}
	// </ScrollView>
	_renderList(){
		if(this.state.searchAddress){
			let predictionList = this.state.predictionsData.map((prediction,index) => {
				return <PredictionCard  key = { index }
																description = { prediction.description }
																placeId = {prediction.place_id}
																chooseAddress = {this._chooseAddress}/>
			})
			return(
				<ScrollView style={{padding:10,}}>
					{predictionList}
				</ScrollView>
			)
		}else{
			return(
				<ListView  dataSource={this.state.dataSource}
									 enableEmptySections={true}
									 renderRow={(address) => this._renderAddress(address)}>

				</ListView>
			)
		}
	}
  render(){
		if(!this.state.showAddInfo){


	    return(
	      <View style={{flex:1,backgroundColor:"#f2f2f2"}}>
	        <Header title={"地址"}
	                goBack={this._goBack}
	                leftButtonText={'×'}/>
						{this._renderSearchInput()}
						{this._renderList()}

	      </View>
	    )
		}else{
			return(
				<AddInfo formattedAddress={this.state.formattedAddress}
								 addressType={this.state.addressType}/>
			)
		}
  }
}

const styles = StyleSheet.create({
  input:{
    flex:1,
    marginLeft:20,
    fontSize: 18,
    borderRadius: 8,
    color: '#ea7b21',
    marginTop:5,
  },
});
