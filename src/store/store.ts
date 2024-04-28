import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {storiesApi} from 'src/services/storiesApi'

const rootReducer = combineReducers({
	[storiesApi.reducerPath]: storiesApi.reducer
})

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(storiesApi.middleware)
	})
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']