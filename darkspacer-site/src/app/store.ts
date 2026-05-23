import { configureStore } from '@reduxjs/toolkit'
import backgroundsReducer from '../slices/characterBackgroundsSlice'
import characterNameReducers from '../slices/characterNameSlice'
import characterReducer from '../slices/characterSlice' 
import abilityScoresReducer from '../slices/abilityScoresSlice'
import characterSpeciesReducer from '../slices/characterSpeciesSlice'
import archetypeReducer from '../slices/archetypeSlice'

export const store = configureStore({
  // Pass in the root reducer setup as the `reducer` argument
  reducer: {
    characterBackgroundState: backgroundsReducer,
    characterState: characterReducer,
    characterNameState: characterNameReducers,
    abilityScoresState: abilityScoresReducer,
    characterSpeciesState: characterSpeciesReducer,
    archetypeState: archetypeReducer
  }
})

// Infer the type of `store`
export type AppStore = typeof store
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = typeof store.dispatch
// Same for the `RootState` type
export type RootState = ReturnType<typeof store.getState>