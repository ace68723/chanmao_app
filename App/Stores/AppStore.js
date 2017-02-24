// import AppConstants from '../Constants/AppConstants';
// import {dispatch, register} from '../Dispatchers/AppDispatcher';
// import {EventEmitter} from 'events';
// import CartAPI from '../Api/CartAPI'
// const CHANGE_EVENT = 'change1';
//
// const AppStore = Object.assign(EventEmitter.prototype,{
//     emitChange(){
//         this.emit( CHANGE_EVENT)
//     },
//     addChangeListener(callback){
//         this.on(CHANGE_EVENT, callback)
//     },
//     removeChangeListener(callback){
//         this.removeListener(CHANGE_EVENT, callback)
//     },
//     getCart(){
//         return CartAPI.la_cartItems;
//     },
//
//     getCatalog(){
//         return CartAPI.getCatalog();
//     },
//
//     getCartTotals(){
//         return CartAPI.cartTotals();
//     },
//
//     dispatcherIndex: register(function(action) {
//        switch(action.actionType){
//             case AppConstants.ADD_ITEM:
//                 CartAPI.addItem(action.item);
//                 break;
//             case AppConstants.REMOVE_ITEM:
//                 CartAPI.removeItem(action.item);
//                 break;
//
//             case AppConstants.INCREASE_ITEM:
//                 CartAPI.increaseItem(action.item);
//                 break;
//
//             case AppConstants.DECREASE_ITEM:
//                 CartAPI.decreaseItem(action.item);
//                 break;
//           }
//         AppStore.emitChange()
//     })
//
// });
//
// // export default AppStore;
//
// module.exports = AppStore;
