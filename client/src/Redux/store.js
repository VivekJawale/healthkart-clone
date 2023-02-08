import { applyMiddleware, combineReducers, compose, legacy_createStore } from 'redux'
import { reducer as CartReducer } from "./Cart/cart.reducer"
import {reducer as AuthReducer} from "./Auth/auth.reducer";
import thunk from 'redux-thunk'
import {persistStore,persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage"
// import { reducer } from './reducer';

const persistConfig={
    key:"helthmart-persist",
    storage
}

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const rootReducer = combineReducers({CartReducer,AuthReducer})

const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store = legacy_createStore(persistedReducer,
    composeEnhancers(applyMiddleware(thunk))
)

const persistor=persistStore(store);
export {persistor};