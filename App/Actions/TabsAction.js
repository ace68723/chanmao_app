import AppConstants from '../Constants/AppConstants';
import {dispatch, register} from '../Dispatchers/AppDispatcher';

export default {
     goToHistory(){
          dispatch({
              actionType: AppConstants.GO_TO_HISTORY
          })
      },
}
