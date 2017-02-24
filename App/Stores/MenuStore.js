import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';
import {EventEmitter} from 'events';

import CartAPI from '../Modules/OrderModule/CartApi'
const CHANGE_EVENT = 'change';

const ERRROR_TITLE = AppConstants.ERRROR_TITLE;
let la_menu = [];
let la_category = [];
let name;
let open;
let loaded = false;
const MenuStore = Object.assign({},EventEmitter.prototype,{
	emitChange(){
			this.emit( CHANGE_EVENT)
	},
	addChangeListener(callback){
			this.on(CHANGE_EVENT, callback)
	},
	removeChangeListener(callback){
			this.removeListener(CHANGE_EVENT, callback)
	},
  menuState(){
		const menu = CartAPI.getMenu();
		// const menu = la_menu;
		const cartTotals = MenuStore.getCartTotals()
		const categoryList = la_category;
    const state = {menu,cartTotals,loaded,name,open,categoryList}
    return state
  },
	initMenu(){
		la_menu = [];
		name = '';
		loaded = false;
		CartAPI.initMenu();
	},
	saveMenu(menuData){
		name = menuData.name;
		open = menuData.open;
		la_menu = [];
		la_category = [];
		menuData.menu.map(category => {
					const category_name = category.name
					const item = {category_name}
					la_menu = [...la_menu, item];
					la_category = [...la_category,item];
					category.dishes.map(dish => {
						const id 	= dish.ds_id;
						const ds_name = dish.ds_name;
						const int_no 	= dish.int_no;
						const price 	= dish.price;
						const status 	= dish.status;
						const item 		= {id,ds_name,int_no,price,status}
						la_menu 			= [...la_menu, item];
					})
		})
		CartAPI.saveMenu(la_menu)
	},
	getCart(){
		return CartAPI.la_cartItems;
	},

	getMenu(){
			return CartAPI.getMenu();
	},

	getFilteredMenu(filteredMenu){
		return CartAPI.getFilteredMenu(filteredMenu);
	},

	getCartTotals(){
			return CartAPI.cartTotals();
	},
	reorder(items){
		items.map(item => {
				CartAPI.addItem(item);
		})
		// MenuStore.emitChange();
	},
	dispatcherIndex: register(function(action) {
	   switch(action.actionType){
				case AppConstants.GET_MENU_SUCCESS:
							MenuStore.saveMenu(action.menuData);
							MenuStore.emitChange();
					break;
					case AppConstants.ADD_ITEM:
							CartAPI.addItem(action.item);
								MenuStore.emitChange();
							break;
					case AppConstants.REMOVE_ITEM:
							CartAPI.removeItem(action.item);
								MenuStore.emitChange();
							break;
					case AppConstants.INCREASE_ITEM:
							CartAPI.increaseItem(action.item);
								MenuStore.emitChange();
							break;
					case AppConstants.DECREASE_ITEM:
							CartAPI.decreaseItem(action.item);
								MenuStore.emitChange();
							break;
					case AppConstants.REORDER:
								MenuStore.reorder(action.items);
								MenuStore.emitChange();
						  break;
		  }

	})

});
module.exports = MenuStore;
