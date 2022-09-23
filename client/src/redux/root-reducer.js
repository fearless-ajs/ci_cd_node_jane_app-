import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';

import userReducer from "./user/userReducer";
import settingReducer from "./setting/settingReducer";
import routingReducer from "./routing/routingReducer";
import buyerReducer from "./buyer/buyerReducer";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['routing']
}

const rootReducer = combineReducers({
    user: userReducer,
    setting: settingReducer,
    routing: routingReducer,
    buyer: buyerReducer
});

export default persistReducer(persistConfig, rootReducer);