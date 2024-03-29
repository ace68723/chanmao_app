'use strict';
const  RestaurantApi        = require( './RestaurantApi');
const  Alert                = require('../System/Alert');
const  AddressModule        = require('../AddressModule/AddressModule');
const  MenuStore            = require('../../Stores/MenuStore');
const Realm                 = require('realm');
let realm = new Realm();

const RestaurantModule = {
  getRestaurantData(userData){
      return new Promise((resolve, reject) => {

        RestaurantApi.getRestaurantData(userData)
          .then(data =>{
            console.log(data)
            if(data.result == 0){

              setTimeout( () =>{
                realm.write(() => {
                  let allRestaurants = realm.objects('Restaurant');
                    realm.delete(allRestaurants);
                    if(data.open.length>0 ){
                        data.open.forEach((restaurant,id)=>{
                          /**
                           * Restaurant Data
                           * @type {Object}
                           *
                           * rid:         "int",
                           * area:        "int",
                           * desc:        "string",
                           * distance:    "int",
                           * end_time:    "string",
                           * mob_banner:  "string",
                           * name:        "string",
                           * open:        "int",
                           * start_mount: "string",
                           * start_time:  "string",
                           * watermark:   "int"
                           */
                          const rid = Number(restaurant.rid);
                          const area = Number(restaurant.area);
                          const desc = restaurant.desc;
                          const end_time = restaurant.end_time;
                          const mob_banner = restaurant.mob_banner;
                          const name = restaurant.name;
                          const start_amount = restaurant.start_amount;
                          const start_time = restaurant.start_time;
                          const restaurantData = {rid,area,desc,end_time,mob_banner,name,start_amount,start_time}
                          realm.create('Restaurant',restaurantData,true);
                        })
                    }
                    // console.log(data)
                    if(data.close.length>0){
                      data.close.forEach((restaurant, id)=>{
                        const rid = Number(restaurant.rid);
                        const area = Number(restaurant.area);
                        const desc = restaurant.desc;
                        const end_time = restaurant.end_time;
                        const mob_banner = restaurant.mob_banner;
                        const name = restaurant.name;
                        const start_amount = restaurant.start_amount;
                        const start_time = restaurant.start_time;
                        const restaurantData = {rid,area,desc,end_time,mob_banner,name,start_amount,start_time}
                        realm.create('Restaurant',restaurantData,true);
                      })
                    }
                    //

                });
              }, 10);

              resolve(data);
            }else{
              Alert.errorAlert(data.message)
              reject()
            }

          })
          .catch(error =>{
            console.log(error)
            Alert.errorAlert('餐馆列表未知错误')
            reject()
          })
      })
  },
  getMenu(reqData){
      return new Promise((resolve, reject) => {
        RestaurantApi.getMenu(reqData)
          .then(data =>{
            if(data.result == 0){
              resolve(data);
            }else{
              Alert.errorAlert(data.message)
              reject()
            }
          })
          .catch(error =>{
            Alert.errorAlert('菜单未知错误')
            reject()
          })
      })
  },
  async beforCheckout(reqData){
      try{
          const data = await RestaurantApi.beforCheckout(reqData);
          if(data.result == 0){
            const pretax = data.pretax;
            const pretax_ori = data.pretax_ori;
            const promoted = data.promoted;
            const total = data.total;
            const eo_data ={pretax,pretax_ori,promoted,total}
            const startAmount = reqData.startAmount;
            let rid = reqData.rid;
            if(typeof rid !== 'string'){
              rid = String(rid)
            }
            realm.write(() => {
                realm.create('Cart',{type:"pretax",value:pretax}, true );
                realm.create('Cart',{type:"total",value:total}, true );
                realm.create('Cart',{type:"rid",value:rid}, true );
                realm.create('Cart',{type:"startAmount",value:startAmount}, true );
            });
            return eo_data
          }else{
            Alert.errorAlert(data.message)
            // throw 'get reuslt 1'
          }

      }catch (e){
        console.log(e)
        Alert.errorAlert('结账未知错误')
      }
  },
  async calculateDeliveryFee(reqData){

      try{
        const code= "";
        let dltypeObj = realm.objectForPrimaryKey('Cart','dltype');
        let dltype;
        if(dltypeObj){
          dltype = dltypeObj.value;
        }else{
          dltype = '1';
        }
        const pretax = realm.objectForPrimaryKey('Cart','pretax').value;
        const rid = realm.objectForPrimaryKey('Cart','rid').value;
        const uaid = realm.objectForPrimaryKey('Cart','uaid').value;
        const startAmount = realm.objectForPrimaryKey('Cart','startAmount').value;
        if(Number(pretax)<startAmount){
           dltype = '0';
        }
        if(dltype != '0'){
          dltype = '1';
        }

        reqData = Object.assign({},reqData,{code,dltype,pretax,rid,uaid})
        console.log(reqData)
        const res = await RestaurantApi.calculateDeliveryFee(reqData);
        console.log(res)
        if(res.result == 0){
          const dlexp = JSON.stringify(res.dlexp);
          const dltype = res.dltype;
          const message = res.message;
          const pretax = res.pretax;
          const pretax_ori = res.pretax_ori;
          const result = res.result;
          const total = res.total;
          const ex_data ={dlexp,dltype,message,pretax,pretax_ori,result,total,startAmount}
          realm.write(() => {
              realm.create('Cart',{type:"dltype",value:dltype}, true );
              realm.create('Cart',{type:"dlexp",value:dlexp}, true );
          });

          return ex_data
        }else{
          console.log('get result 1',res)
        }
      }catch (e){
        console.log(e)
      }
  },
  async checkout(io_data){
      try{
        const token   = io_data.token;
        const dltype  = realm.objectForPrimaryKey('Cart','dltype').value;
        const pretax  = realm.objectForPrimaryKey('Cart','pretax').value;
        const rid     = realm.objectForPrimaryKey('Cart','rid').value;
        const uaid    = realm.objectForPrimaryKey('Cart','uaid').value;
        const dlexp   = realm.objectForPrimaryKey('Cart','dlexp').value;
        let items   = MenuStore.getCart();
        const comment = io_data.comment;
        items.forEach((item)=>{
          item.amount = item.qty;
          item.ds_id = item.id;
          item.qty = null;
        })
        const reqData = {token,dltype,pretax,rid,uaid,dlexp,items,comment}
        const data = await RestaurantApi.checkout(reqData);
        return data
      }catch (e){
        console.log(e)
      }
  }
}

module.exports = RestaurantModule;
