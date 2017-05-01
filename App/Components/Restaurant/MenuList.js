/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
	Component,
} from 'react';
import {
  Alert,
	Animated,
	Dimensions,
  Image,
	InteractionManager,
  ListView,
  StyleSheet,
  ScrollView,
  Text,
	TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import Background from '../General/Background';
import MenuCard from './MenuCard';
import Header from '../General/Header';
import MenuHeader from './MenuHeader';
import Category from './Category';

import MenuStore from '../../Stores/MenuStore';

import RestaurantAction from '../../Actions/RestaurantAction';

import findIndex from 'lodash/findIndex';



const {width,height} = Dimensions.get('window');
const EMPTY_CELL_HEIGHT = Dimensions.get('window').height > 600 ? 200 : 150;

class Menu extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state={
				  anim: new Animated.Value(0), //for background image
          menu:[],
          cartTotals:'',
          loaded:false,
          name:'',
          dataSource: this.ds.cloneWithRows([]),
          startAmount:this.props.restaurant.start_amount,
					loading:false,
        };
        this._onChange = this._onChange.bind(this);
        this._goToCinfirm = this._goToCinfirm.bind(this);
        this._handleScroll = this._handleScroll.bind(this);
        this._header = this._header.bind(this);
        this._goBack = this._goBack.bind(this);
				this._handleCategoryPress = this._handleCategoryPress.bind(this);
				this._renderMenuList = this._renderMenuList.bind(this);
        this._renderCategoryList = this._renderCategoryList.bind(this);

				this._renderHeader = this._renderHeader.bind(this);


				this.categoryRefList = [];
    }
    componentDidMount(){
			setTimeout( () => {
				this.setState({loading:true})
				MenuStore.addChangeListener(this._onChange);
				const rid = this.props.restaurant.rid
				RestaurantAction.getMenu(rid);
			}, 500);


      // ===========================================
      //          reorder test
      // ===========================================
      // const reorderItems = this.props.reorderItems
      // setTimeout(function () {
      //       MenuStore.reorder(reorderItems)
      // }, 10000);

    }
    componentWillUnmount() {
      MenuStore.initMenu();
      MenuStore.removeChangeListener(this._onChange);
    }
    _onChange(){
      const menuState = MenuStore.menuState()
      const menu = menuState.menu;
      const cartTotals = menuState.cartTotals;
      cartTotals.total = cartTotals.total.toFixed(2);
      const name = menuState.name;
      this.setState({
        name:name,
        cartTotals:cartTotals,
        menu:menu,
        dataSource:this.state.dataSource.cloneWithRows(menu),
        categoryList:menuState.categoryList,
				loading:false,
      })
      this.props.changeCartTotals(cartTotals)
      this.props.checkOpen(menuState.open)

    }

    renderMenuList(category,categoryIndex){
      return  category.dishes.map((dish,index)=>{
          const dish_index = categoryIndex+ '-'+index
          return(
              <MenuCard key={dish_index}
                        ds_name = {dish.ds_name}
                        dish = {dish}
                        addToOrder= {this._addToOrder}/>

          )
        })
    }
    _goToCinfirm(){
      if(Number(this.state.cartTotals.total)>0){
        if(Number(this.state.cartTotals.total)>=Number(this.state.startAmount)){
          this.props.navigator.push({
            id: 'Confirm',
            restaurant:this.props.restaurant,
          })
        }else{
          Alert.alert(
            '馋猫订餐提醒您',
            '不足'+this.state.startAmount+'只能自取哦～',
            [
              {text: '取消', onPress: () => {}, style: 'cancel'},
              {text: '好哒', onPress: () => {
                   this.props.navigator.push({
                      id: 'Confirm',
                      restaurant:this.props.restaurant,
                    })
                  }
              },
            ],
          );
        }

      }

    }
    _renderMenuList (item,index)  {

      if(item.category_name){
        return  (
              <View ref={(ref) => { this.categoryRefList.push({category_ref:ref,category_name:item.category_name}) }}
										style={{flex:1,backgroundColor:'#ffffff',overflow:"hidden"}}>
                <View style={{alignSelf:'center',marginTop:30,marginBottom:10}}>
                    <Text style={{fontSize:18,color:'#3a3b47',fontFamily:'FZZongYi-M05S',}}>
                      {item.category_name}
                    </Text>
                </View>
                <View style={{alignSelf:'center',height:2,width:40, backgroundColor:'#3a3b47'}}>
                </View>
              </View>
        )
      }else{
        const dish = item;
        return(
          <MenuCard key={index}
                    ds_name = {dish.ds_name}
                    dish = {dish}
                    qty = {dish.qty}/>
        )
      }
    }
    _renderCategoryList(){
        this.state.categoryList.map((category,index)=>{
          return (
            <Text key={index}>
                {category.category_name}
            </Text>
          )
        })
    }
    _handleScroll(event){
      this.setState({
        offsetY: event.nativeEvent.contentOffset.y
      })
    }

    _header(){
      if(this.props.offsetY > 100){

        if(!this.props.restaurant.close){
          const _rightButtonText = '$'+this.state.cartTotals.total+'结账';
          return(
            <Header title={'点餐'}
                    goBack={this._goBack}
                    rightButton={this._goToCinfirm}
                    rightButtonText={_rightButtonText}/>
          )
        }else{
          const _rightButtonText = '商家休息了';
          return(
            <Header title={'点餐'}
                    goBack={this._goBack}
                    rightButton={() => {}}
                    rightButtonText={_rightButtonText}/>
          )
        }
      }
    }
    _goBack(){
      this.props.navigator.pop();
    }
		_handleCategoryPress(category_position){
			// console.log(category_position,this.categoryRefList[1])
			// const categoryRefIndex = findIndex(this.categoryRefList, function(o) { return o.category_name == category_name; });
			// this.categoryRefList[1].category_ref.measure((ox, oy, width, height, px, py) => {
				// console.log(oy)
				InteractionManager.runAfterInteractions(() => {
					this.refs._menuList.scrollTo({x: 0, y: category_position, animated: true})
				})


			// });
			// this.refs._menuList.scrollTo({x: 0, y: 3000, animated: true})
		}

		_renderHeader(){
			// return(
			// 	<MenuHeader
			// 			MIV_MTime = {this.props.MIV_MTime}
			// 			start_time = {this.props.start_time}
			// 			end_time = {this.props.end_time}
			// 			showMenuAnimation = {this.props.showMenuAnimation}
			// 			restaurant = {this.props.restaurant}/>
			// )
			let loading = this.state.loading ? <Image source={require('./Image/Loading_dots_orange.gif')}  style={{width:45,height:15}}/>:null
			return(
				<View style={{marginTop:320,alignItems:'center'}}>
						{loading}
				</View>
			)
		}
		_handleScroll( e: any) {
			if(e.nativeEvent.contentOffset.y < 300){
				this.state.anim.setValue(e.nativeEvent.contentOffset.y);
				const height = EMPTY_CELL_HEIGHT - this.state.stickyHeaderHeight;
			}
			this.props.handleScroll(e);
		}
		_renderLoading(){
			return(
				<View style={{height:15,alignItems:'center'}}>
						<Image source={require('./Image/Loading_dots_orange.gif')}  style={{width:45,height:15}}/>
				</View>
			)
		}
    render(){
                  // {categoryList}
      // let categoryList = this.state.menu.map((item,index) => {
      //   if(item.category_name){
      //     return  (
      //           <View key = {index} style={{flex:1}}>
      //             <View >
      //                 <Text>
      //                   {item.category_name}
      //                 </Text>
      //             </View>
      //           </View>
      //
      //     )
      //   }else{
      //     const dish = item;
      //     return(
      //       <MenuCard key={index}
      //                 ds_name = {dish.ds_name}
      //                 dish = {dish}
      //                 qty = {dish.qty}
      //                 addItem = {this._addItem}
      //                 addToOrder= {this._addToOrder}/>
      //     )
      //   }
      //
      // })
      // source={{uri:this.state.restaurantBanner}}

      // ==========================================
      // <Text style={styles.checkoutAmount}>
      //   数量:{this.state.cartTotals.qty}{'\n'}
      // </Text>
      // ==========================================
      const checkoutButton = () => {
        if(!this.props.restaurant.close){
          return(
            <View style={{flex:1,flexDirection:'row'}}>
              <View style={{flex:1}} />
                <TouchableOpacity activeOpacity={0.5}
                                  onPress={this._goToCinfirm}>
                <View style={styles.checkoutButton}>
                  <Text style={styles.checkoutText}>
                    ${this.state.cartTotals.total}结账
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          )
        }else{
          return(
              <View style={{flex:1,flexDirection:'row'}}>
                  <View style={{flex:1}} />
                  <TouchableOpacity activeOpacity={0.5}>
                    <View style={styles.checkoutButton}>
                      <Text style={styles.checkoutText}>
                          商家休息啦
                      </Text>
                    </View>
                  </TouchableOpacity>
              </View>
          )
        }
      }
      return(
				<View style={{flex:1}}>
            <ListView
								ref={'_menuList'}
								onScroll={this.props.handleScroll()}
								removeClippedSubviews={true}
								scrollEventThrottle={16}
                dataSource={this.state.dataSource}
                initialListSize={50}
                pageSize={50}
                renderRow={(item) => this._renderMenuList(item)}
								renderHeader={this._renderHeader}
                scrollRenderAheadDistance={300 }
                enableEmptySections={true}
                style={{overflow:'hidden',backgroundColor:"rgba(0,0,0,0)"}}
              />
							<Category categoryList={this.state.categoryList} handleCategoryPress={this._handleCategoryPress}/>
				</View>
      )

    }

}




let styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor:"#ffffff"
  },
  scrollView:{
    flex: 1,
    marginTop: 65,
  },
  orderContainer:{
    margin:10,
    backgroundColor:"#fff",
    shadowColor: "#000000",
    shadowOpacity: 0.1,
    shadowOffset: {
       height: 0.5,
       width: 0.5,
    },
  },
  orderTitleContainer:{
    height:60,
    backgroundColor: "#ff8b00",
    alignItems: 'center',
    justifyContent:"center",
    borderBottomColor:'#ddd',
    borderBottomWidth:1,
  },
  orderTitle:{
    color: "#fff",
    fontSize:25,

  },
  checkoutButton:{
    // width:100,
    marginRight:10,
    height:30,
    alignSelf:'center',
    alignItems:'center',
    justifyContent:'center',
    borderColor:'#ff8b00',
    borderWidth:2,
    borderRadius:8,
    paddingLeft:5,
    paddingRight:5,
  },
  checkoutText:{
    fontSize:16,
    color:'#ff8b00',
  },
  checkoutAmount:{
    fontSize:16,
    color:'#ff8b00',
  },


});

module.exports = Menu;
