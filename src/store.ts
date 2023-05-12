import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import userReducer  from './reducers/UserReducer.ts'
// import roleReducer  from './reducers/RoleReducer.ts'
// import featureReducer from './reducers/FeatureReducer.ts'
// import subFeatureRducer from './reducers/SubFeatureReducer.ts'
// import SubRoleReducer from './reducers/SubRoleReducer.ts'
import AuthReducer from './reducers/AuthReducer.ts'
// import selectedFeatureReducer from './reducers/SelectedFeatureReducer.ts'

import { 
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER, 
} from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['subFeature', 'subRole'],
}

const rootReducer = combineReducers({
  user: userReducer,
  // role: roleReducer,
  // feature: featureReducer,
  // subFeature: subFeatureRducer,
  // subRole: SubRoleReducer,
  auth: AuthReducer,
  // selectedFeature: selectedFeatureReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})


export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch