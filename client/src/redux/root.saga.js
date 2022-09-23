import { all, call } from 'redux-saga/effects';
import { userSagas } from "./user/user.sagas";
import { settingSagas } from "./setting/setting.sagas";
import { buyerSagas } from "./buyer/buyer.sagas";


export default function* rootSaga() {
    yield all([
        call(userSagas),
        call(settingSagas),
        call(buyerSagas)
    ])
}