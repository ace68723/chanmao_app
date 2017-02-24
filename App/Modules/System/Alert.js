'use strict';
import React, {
	Component,
} from 'react';
import {
  AlertIOS
} from 'react-native';
const showAlert = false;
const Alert = {
  errorAlert(message){
    if(!showAlert){
      showAlert = !showAlert;
      AlertIOS.alert(
        '馋猫订餐提醒您',
        message,
        [
          {text: 'OK', onPress: () =>{ showAlert = !showAlert}},
        ]
      )
    }

  }
}

module.exports = Alert;
