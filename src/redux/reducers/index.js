import loginReducer from './login';
import { combineReducers } from 'redux';
import headerReducer from './header';
import categoryReducer from './category';

export default combineReducers({
  userInfo: loginReducer,
  headerTitle: headerReducer,
  categoryList: categoryReducer
});
