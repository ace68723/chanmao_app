'use strict';
const   HistoryApi        = require( './HistoryApi');
const  Alert          = require('../System/Alert');
const  HistoryModule = {

  // ===================================
  // getOrderData API INTERFACE
  // API             Module
  // ===================================
  // cell            cell
  // channel         channel
  // comment         comment
  // created         created
  // dltype          deliveryType
  // oid             orderId
  // ori_pretax      originalPretax
  // ori_total       originalTotal
  // pretax          pretax
  // rid             rid
  // rraddr          restaurantAddress
  // rrname          restaurantName
  // status          orderStatus
  // total           total
  // uaddr           userAddress
  // uaid            userAid
  // uid             userId
  // uname           username
  // version         version
    getOrderData(token){
          return new Promise((resolve, reject) => {
            HistoryApi.getOrderData(token)
              .then(data => {
                if(data.result == 0){
                    resolve(data.orders);
                }else{
                  Alert.errorAlert(data.message)
                  reject(data.result);
                }

              })
              .catch(error => {
                Alert.errorAlert('历史订单未知错误')
                reject(error);
              })
          })
    },
// ===================================
// getVerifyCode input parameter
// ===================================
  async getHistoryDetail(io_data){
    try {
      const token = io_data.token;
      const iv_oid = io_data.oid;
      const reqData = {token,iv_oid};
      const res = await HistoryApi.getHistoryDetail(reqData)
      console.log(res)
      if(res.result == 0){
        return res
      }else{
          Alert.errorAlert(res.message)
      }

    } catch (e) {
      console.log(e)
    }
  },


// ===================================
// getVerifyCode input parameter
// ===================================
// io_data:{ token, oid }
   async getVerifyCode(io_data){
    const token = io_data.token;
    const iv_oid = io_data.oid;
    const reqData = {token,iv_oid};
    const getVerifyCodeResult = await HistoryApi.getVerifyCode(reqData)
    const res = getVerifyCodeResult;
    if(res.result != 0){
      Alert.errorAlert(res.message)
    }
    return getVerifyCodeResult
  },
  async verifyPhone(io_data){
    const token = io_data.token;
    const iv_oid = io_data.oid;
    const iv_code = io_data.code;
    const reqData = {token,iv_oid,iv_code};
    const verifyPhoneResult = await HistoryApi.verifyPhone(reqData)
    const res = verifyPhoneResult;
    if(res.result != 0){
      Alert.errorAlert(res.message)
    }
    return verifyPhoneResult
  },

      // ===================================
      // getHistoryData API INTERFACE
      // API             Module
      // ===================================
      // cell            cell
      // channel         channel
      // comment         comment
      // created         created
      // dltype          deliveryType
      // oid             orderId
      // ori_pretax      originalPretax
      // ori_total       originalTotal
      // pretax          pretax
      // rid             rid
      // rraddr          restaurantAddress
      // rrname          restaurantName
      // status          orderStatus
      // total           total
      // uaddr           userAddress
      // uaid            userAid
      // uid             userId
      // uname           username
      // version         version
      getHistoryData(token){
          return new Promise((resolve, reject) => {
            HistoryApi.getHistoryData(token)
              .then(data => {
                console.log(data)
                if(data.result == 0){
                    if(data.current){
                        const cell              = data.current.cell;
                        const channel           = data.current.channel;
                        const comment           = data.current.comment;
                        const created           = data.current.created;
                        const deliveryType      = data.current.dltype;
                        const orderId           = data.current.oid;
                        const originalPretax    = data.current.ori_pretax;
                        const originalTotal     = data.current.ori_total;
                        const orderStatus       = data.current.status;
                        const pretax            = data.current.pretax;
                        const rid               = data.current.rid;
                        const restaurantAddress = data.current.rraddr;
                        const restaurantName    = data.current.rrname;
                        const total             = data.current.total;
                        const userAddress       = data.current.uaddr;
                        const userAid           = data.current.uaid;
                        const userId            = data.current.uid;
                        const username          = data.current.uname;
                        const version           = data.current.version;

                        const current = {
                          cell,
                          channel,
                          comment,
                          created,
                          deliveryType,
                          orderId,
                          originalPretax,
                          originalTotal,
                          pretax,
                          rid,
                          restaurantAddress,
                          restaurantName,
                          orderStatus,
                          total,
                          userAddress,
                          userAid,
                          userId,
                          username,
                          version
                        }
                        data.current = Object.assign({},current);
                    }
                    resolve(data);
                }else{
                  Alert.errorAlert(data.message)
                  reject(data.result);
                }

              })
              .catch(error => {
                Alert.errorAlert('历史订单未知错误')
                reject(error);
              })
          })
    }
}
module.exports = HistoryModule;
