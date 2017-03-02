'use strict';
import React, {
	Component,
} from 'react';
import {
  Animated,
  AppState,
	ListView,
  RefreshControl,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';

import RestaurantAction from '../../Actions/RestaurantAction';
import RestaurantStore from '../../Stores/RestaurantStore';

import RestaurantCard from './RestaurantCard';

const restaurantData = () => {
  return RestaurantStore.getRestaurantData()
}

export default class RestaurantTab extends Component {
  constructor(props){
	    super(props)
			this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	    const state = {
					dataSource: this.ds.cloneWithRows([]),
	        restaurantCoverOpacity: new Animated.Value(0), // init restaurant tab view opacity 0
					index:props.index,
	      };
			this.state = Object.assign({},state,RestaurantStore.getRestaurantState())
      this._onChange = this._onChange.bind(this);
      this._handleRestaurantPress = this._handleRestaurantPress.bind(this)
      this._onRefresh = this._onRefresh.bind(this);
      this._handleAppStateChange = this._handleAppStateChange.bind(this);
      // this._openMenu = this._openMenu.bind(this);
      this._closeMenu = this._closeMenu.bind(this);
      this._goBack = this._goBack.bind(this);
  }
  componentDidMount(){

			if(this.props.index == 1){
				RestaurantAction.getRestaurant();
				RestaurantStore.addChangeListener(this._onChange);
			}
				if(this.props.index !=1){
					const restaurantData = RestaurantStore.getRestaurantData(this.props.area)
					const dataSource = {dataSource:this.state.dataSource.cloneWithRows(restaurantData)}
					const state = Object.assign({},restaurantData,dataSource)
					this.setState(state)
				}
			// setTimeout(() =>{
			// 	const restaurantData = RestaurantStore.getRestaurantData(this.props.area)
			// 	const dataSource = {dataSource:this.state.dataSource.cloneWithRows(restaurantData)}
			// 	const state = Object.assign({},restaurantData,dataSource)
	    //   this.setState(state)
			// }, 500);

    //  AppState.addEventListener('change', this._handleAppStateChange);

			 const index = this.props.index;
			 const scrollView = this.refs._scrollVew;
			 const scrollViewContent = this._scrollViewContent;
			 const ref = Object.assign({},{index,scrollView,scrollViewContent})
			 this.props.getScrollViewRefs(ref)

  }
	// componentWillReceiveProps(props){
	// 	if(props.currentTab == this.state.index
	// 			&& this.props.index != 1
	// 		  && this.props.index != 2){
	// 		const restaurantData = RestaurantStore.getRestaurantData(this.props.area)
	// 		const dataSource = {dataSource:this.state.dataSource.cloneWithRows(restaurantData)}
	// 		const state = Object.assign({},restaurantData,dataSource)
	// 		this.setState(state)
	// 	}
	// }

  componentWillUnmount() {
		if(this.props.index == 1){
     RestaurantStore.removeChangeListener(this._onChange);
	 }
  	//  AppState.removeEventListener('change', this._handleAppStateChange);
  }
  _handleAppStateChange(currentAppState) {
    if(currentAppState === 'active'){
      // this._onRefresh();
    }
  }
  _onChange(){

			const restaurantData = RestaurantStore.getRestaurantData()
			const dataSource = {dataSource:this.state.dataSource.cloneWithRows(restaurantData)}
			const state = Object.assign({},restaurantData,dataSource)
      this.setState(state)
  }

  _onRefresh(){
      this.setState({
        isRefreshing: true,
      })
      // RestaurantService.getRestaurantData()
      RestaurantStore.addChangeListener(this._onChange);
  }
  _handleRestaurantPress(restaurant){
      this.props.navigator.push({
        id: 'Menu',
        restaurant:restaurant
      })
  }
  _goBack(){
    this.props.navigator.pop();
  }
  // _openMenu(py,restaurant){
  //   this.setState({
  //     restaurant:restaurant,
  //     py:py,
  //     showAnimatedView:true,
  //   })
  //   const hideRestaurantView = ()=>{
  //     Animated.timing(          // Uses easing functions
  //       this.state.restaurantCoverOpacity,    // The value to drive
  //       {toValue: 1,
  //        duration: 400,
  //       }            // Configuration
  //     ).start();
  //   }
  //   setTimeout(function () {
  //     hideRestaurantView()
  //   }, 200);
  // }
  _closeMenu(){
    Animated.timing(          // Uses easing functions
      this.state.restaurantCoverOpacity,    // The value to drive
      {toValue: 0,
       duration: 400,
      }            // Configuration
    ).start();
    const hideAnimatedView = ()=>{
      this.setState({
        showAnimatedView:false
      })
    }
    setTimeout(function () {
      hideAnimatedView()
    },500)
  }
	// _renderRestaurantCover(){
  //     if(this.state.showAnimatedView){
  //       return(
  //         <Animated.View style={{position:'absolute',
  //                                top:0,
  //                                left:0,
  //                                right:0,
  //                                bottom:0,
  //                                backgroundColor:'#ffffff',
  //                                opacity:this.state.restaurantCoverOpacity}}>
  //         </Animated.View>
  //       )
  //     }
  //   }
	_renderHeader(){
		// setTimeout(()=> {
		// 	this._scrollViewContent.measure((ox, oy, width, height, px, py) => {
		// 		console.log(this.props.index,ox, oy, width, height, px, py)
		// 	})
		// }, 1000);
		return	<View style={{marginTop:200,height:0}}
						 ref={(comp) => this._scrollViewContent = comp}/>
	}
	_renderRestaurant(restaurant){
		    restaurant.imgUrl = {uri:restaurant.mob_banner};
		    return <RestaurantCard restaurant={restaurant}
		                           openMenu={this.props.openMenu}/>
	}
  render(){
      // let restaurantlist = this.state.open.map( (restaurant,id) => {
      //     restaurant.imgUrl = {uri:restaurant.mob_banner};
      //     return <RestaurantCard key={ id }
      //                            restaurant={restaurant}
      //                            openMenu={this.props.openMenu}/>
      //   });
      // let restaurantCloselist = this.state.close.map(  (restaurant,id) => {
      //   restaurant.close = true;
      //   restaurant.imgUrl = {uri:restaurant.mob_banner};
      //   return <RestaurantCard key={ restaurant.rid }
      //                          restaurant={restaurant}
      //                          openMenu={this.props.openMenu}/>
      // });

			// {restaurantlist}
			// {restaurantCloselist}
        // <Header title={'点餐'} goBack={this._goBack}/>
				// onScroll={this.props.scrollEventBind()}
      return(
						<ListView style={styles.scrollView}
												ref={'_scrollVew'}
		                    scrollEventThrottle={16}
												onScroll={this.props.scrollEventBind()}
												initialListSize={5}
												removeClippedSubviews={false}
			                  pageSize={5}
												scrollRenderAheadDistance={10}
												dataSource={this.state.dataSource}
												enableEmptySections={true}
												renderHeader={this._renderHeader.bind(this)}
												renderRow={(restaurant) => this._renderRestaurant(restaurant)}
												refreshControl={
													<RefreshControl
														refreshing={this.state.isRefreshing}
														onRefresh={this._onRefresh}
														tintColor="#ff8b00"
														title="正在刷新啦..."
														titleColor="#ff8b00"
														colors={['#ff8b00', '#ff8b00', '#ff8b00']}
														progressBackgroundColor="#ff8b00"
													/>
												}>

						</ListView>
      )
  }
}
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    // backgroundColor:'#f4f4f7',
  },
  scrollView:{
    flex: 1,
    marginTop: 18,
    paddingTop:20,
    // backgroundColor:'blue',
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

  }

});
