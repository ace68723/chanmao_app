'use strict';
const  AddressApi         = require( './AddressApi');
const Realm               = require('realm');
let request = {input: '',componentRestrictions: { country: 'ca' }};

const AddressSchema = {
  name: 'Address',
  primaryKey: 'type',
  properties: {
      addr:"string",
      apt_no:"string",
      buzz:"string",
      city:"string",
      del:"string",
      loc_la:"string",
      loc_lo:"string",
      name:"string",
      postal:"string",
      province:"string",
      status:"string",
      tel:"string",
      type:"string",
      uaid:"string",
      uid:"string",
      selected:"bool"
  }
};
const CartSchema = {
  name: 'Cart',
  primaryKey: 'type',
  properties: {
      type:"string",
      value:"string",
  }
};
const RestaurantScheam = {
  name: 'Restaurant',
  primaryKey: 'id',
  properties: {
      id:"int",
      rid:"int",
      zone:"int",
      rank:"int",
      area:"int",
      desc:"string",
      distance:"int",
      end_time:"string",
      mob_banner:"string",
      name:"string",
      open:"int",
      start_amount:"string",
      start_time:"string",
      watermark:"int"
  }
}
const SystemScheam = {
  name: 'System',
  primaryKey: 'type',
  properties: {
    type:'string',
    value:'string',
  }
}
let realm = new Realm({schema: [AddressSchema,CartSchema,RestaurantScheam,SystemScheam]});
realm.write(() => {
  let initAddress = {
    addr:"",
    apt_no:"",
    buzz:"",
    city:"",
    del:"",
    loc_la:"",
    loc_lo:"",
    name:"",
    postal:"",
    province:"",
    status:"",
    tel:"",
    uaid:"",
    uid:"",
    selected:false
  }
  realm.create('Address',Object.assign({},initAddress,{type:'H'}), true );
  realm.create('Address',Object.assign({},initAddress,{type:'W'}), true );
  realm.create('Address',Object.assign({},initAddress,{type:'O'}), true );

  let initCart = realm.objects('Cart');
  let initRestaurant = realm.objects('Restaurant');
  realm.delete(initCart);
  realm.delete(initRestaurant);
})

console.log(realm.path)
const AddressModule = {
  getAddress(token){
      return new Promise((resolve, reject) => {
        AddressApi.getAddress(token)
          .then(data =>{
            console.log(data)
            if(data.result == 0){
							const ea_address = data.address;
              const selectedAddress = realm.objectForPrimaryKey('Address','S');
              let _selectAddress;
              realm.write(() => {
                ea_address.forEach((address,key)=>{
                  if(address.type){
                    const selectedAddress = realm.objects('Address').filtered('selected == true' );
              				if(!selectedAddress[0]){
              						address.selected = true;
              				}
                    address = Object.assign({},address)
                    realm.create('Address',address, true );
                  }
                })
                // if(!selectedAddress.uaid && ea_address.length>0){
                //    _selectAddress = Object.assign({},ea_address[0],{type:"S",});
                //   realm.create('Address',_selectAddress, true );
                // }
              });

              resolve(ea_address);

            }else{
              reject(data)
            }
          })
          .catch(error =>{
            console.log(error)
            reject(error)
          })
      })
  },
  searchAddress(input){
    return new Promise((resolve, reject) => {
      AddressApi.searchAddress(input)
        .then(autocompleteData =>{
          resolve(autocompleteData)
        })
        .catch(error =>{
          reject()
        })
    })
  },
	submitAddress(userInfo){
		return new Promise((resolve, reject) => {
		  const addr 		= userInfo.formattedAddress.address;
			const lat  		= userInfo.formattedAddress.latitude;
			const lng 		= userInfo.formattedAddress.longitude;
			const city 		= userInfo.formattedAddress.city;
			const postal 	= userInfo.formattedAddress.postalCode;
			const name 		= userInfo.name;
			const tel 		= userInfo.phoneNumber;
			const apt_no 	= userInfo.apartmentNumber;
			const buzz 		= userInfo.buzzCode;
      const type    = userInfo.type;
			const eo_userInfo = {addr,lat,lng,city,postal,name,tel,apt_no,buzz,type};
			AddressApi.submitAddress(eo_userInfo,userInfo.token)
				.then(res =>{
					if(res.result == 0){
            let address = res.addr;
              console.log(res)
              realm.write(() => {
                  const selectedAddress = realm.objects('Address').filtered('selected == true' );
                	if(selectedAddress[0]){
                			selectedAddress[0].selected = false;
                	}
                  address.selected = true;
                  realm.create('Address',address, true );
                  realm.create('Cart',{type:"uaid",value:address.uaid}, true );
              });


						resolve(res);
					}else{
						reject(res);
					}

				})
				.catch(error =>{
          console.log(error)
					reject(error)
				})
		})
	},
	async deleteAddress(token,address){

    const uaid = address.uaid;
	  const res = await AddressApi.deleteAddress(token,uaid);
    realm.write(() => {
      if(address.selected){
        realm.create('Cart',{type:"uaid",value:""}, true );
      }
      let initAddress = {
        addr:"",
        apt_no:"",
        buzz:"",
        city:"",
        del:"",
        loc_la:"",
        loc_lo:"",
        name:"",
        postal:"",
        province:"",
        status:"",
        tel:"",
        uaid:"",
        uid:"",
        selected:false
      }
      address =  Object.assign(address,initAddress)
      console.log(address)
      // realm.create('Address',Object.assign({},initAddress,{type:'H'}), true );

    });

		return res
	},
  selectAddress(address){
    realm.write(() => {
    	const selectedAddress = realm.objects('Address').filtered('selected == true' );
    	if(selectedAddress[0]){
    			selectedAddress[0].selected = false;
    	}
    	address.selected=true;
      realm.create('Cart',{type:"uaid",value:address.uaid}, true );
    })
    // const addr = address.addr;
    // const apt_no = address.apt_no;
    // const buzz = address.buzz;
    // const city = address.city;
    // const del = address.del;
    // const loc_la = address.loc_la;
    // const loc_lo = address.loc_lo;
    // const name = address.name;
    // const postal = address.postal;
    // const province = address.province;
    // const status = address.status;
    // const tel = address.tel;
    // const type = "S";
    // const uaid = address.uaid;
    // const uid = address.uid;
    // const selectedAddress = {addr,apt_no,buzz,city,del,loc_la,loc_lo,name,postal,province,status,tel,type,uaid,uid};
    //
    // realm.write(() => {
    //     realm.create('Address',selectedAddress, true);
    //     realm.create('Cart',{type:"uaid",value:uaid}, true );
    // });
  }

}

module.exports = AddressModule;
