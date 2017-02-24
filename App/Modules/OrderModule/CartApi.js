
const CartApi = {
    la_menu: [],
    la_cartItems: [],
    initMenu(){
      this.la_menu = [];
      this.la_cartItems = [];
    },
    saveMenu(menu){
      this.la_menu = menu
    },
    removeItem(item) {
        this.la_cartItems.splice(this.la_cartItems.findIndex(i => i === item), 1);
    },

    findItem(item) {
        return this.la_cartItems.find(cartItem => cartItem.id === item.id);
    },

    addItem (item){
        const cartItem = this.findItem(item);
        if (!cartItem) {
            this.la_cartItems = [...this.la_cartItems, Object.assign({ qty: 1 }, item)];
        } else {
            this.increaseItem(cartItem)
        }
    },

    // increaseItem(cartItem) { cartItem.qty++ },
    increaseItem(cartItem) {
      if ('qty' in cartItem) {
        cartItem.qty++;
      }else{
        cartItem.qty=1;
      }
    },
    decreaseItem(item) {
        if ('qty' in item) {
            const cartItem = this.findItem(item);
            let qty = cartItem.qty--;
            Object.assign({ qty: qty }, cartItem)
            if (cartItem.qty === 0) {
                this.removeItem(cartItem)
            }
        }
    },

    cartTotals(qty = 0, total = 0) {
        this.la_cartItems.forEach(cartItem => {
            qty += cartItem.qty;
            total += cartItem.qty * cartItem.price;
        })
        return { qty, total };
    },

    getMenu() {
        // this.la_cartItems.map(item=>{
        // })
        // return this.la_menu
        return this.la_menu.map(item => {
            delete item.qty;
            return Object.assign({}, item, this.la_cartItems.find(cItem => cItem.id === item.id))
        })
    },
    getFilteredMenu(filteredMenu) {
        return filteredMenu.map(item => {
            delete item.qty;
            return Object.assign({}, item, this.la_cartItems.find(cItem => cItem.id === item.id))
        })
    },
}
export default CartApi;
