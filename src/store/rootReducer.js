import {combineReducers} from "redux";

import {reducer as authReducer} from "./auth";
import {reducer as walletReducer} from "./wallet";

// Combine all reducers.

const rootReducer = combineReducers({
    auth: authReducer,
    wallet: walletReducer,
});

export default rootReducer;
