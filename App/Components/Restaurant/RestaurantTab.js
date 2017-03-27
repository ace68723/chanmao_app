'use strict';
import React, {
	Component,
} from 'react';
import  {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView
} from 'react-native';
import RestaurantCard from './RestaurantCard';

export default class RestaurantTab extends Component {
  constructor(props){
		super(props)
		var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.state= {
			dataSource: ds.cloneWithRows(props.restaurantList),
		};
		this._renderRestaurant = this._renderRestaurant.bind(this);
		this._renderHeader = this._renderHeader.bind(this);
	}
	componentDidMount(){
		const index = this.props.index;
		const scrollView = this._scrollVew;
		const scrollViewContent = this._scrollViewContent;
		const ref = Object.assign({},{index,scrollView,scrollViewContent})
		this.props.getScrollViewRefs(ref)
		this._scrollVew.scrollTo({y: this.props.scrollY,animated:false});
	}
	componentWillReceiveProps(nextProps){
		if(nextProps.restaurantList != this.props.restaurantList){
				this.setState({dataSource: this.state.dataSource.cloneWithRows(nextProps.restaurantList)})
		}
	}
  _renderRestaurant(restaurant, sectionID, rowID) {
			if(restaurant){
				restaurant.imgUrl = {uri:restaurant.mob_banner};
				return <RestaurantCard restaurant={restaurant}
															 openMenu={this.props.openMenu}
															 navigator={this.props.navigator}/>
			}
  }
	_renderHeader(){
		return	<View style={{marginTop:200,height:0}}
						 ref={(comp) => this._scrollViewContent = comp}/>
	}
  render() {

    return (
			<ListView   style={styles.scrollView}
									key={this.props.index}
									ref={(comp) => this._scrollVew = comp}
									scrollEventThrottle={16}
									onScroll={this.props.scrollEventBind()}
									initialListSize={5}
									removeClippedSubviews={false}
									pageSize={5}
									scrollRenderAheadDistance={10}
									dataSource={this.state.dataSource}
									enableEmptySections={true}
									renderHeader={this._renderHeader.bind(this)}
									renderRow={(restaurant, sectionID, rowID) => this._renderRestaurant(restaurant,rowID)}
								>

			</ListView>
    );
  }
};
const styles = StyleSheet.create({
  scrollView:{
    flex: 1,
    marginTop: 18,
    paddingTop:20,
  },
});
