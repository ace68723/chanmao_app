'use strict';

import AuthService from './AuthService'
import HistoryModule from '../Modules/HistoryModule/HistoryModule';
import HistoryAction from '../Actions/HistoryAction';
const HistorryService = {
    getHistoryData(){
      AuthService.getToken()
        .then(HistoryModule.getHistoryData)
        .then(HistoryAction.getHistorySuccess)
    }
}

module.exports = HistorryService;
