import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RangedThingPicker } from '../generators/RangedThingPicker'
import { Trait } from '../models/rules/Trait'
import { TraitRepository } from '../repository/TraitRepository'

export interface TraitsState {
    selectedTrait: Trait | null
    traits: Trait[]
}

const initialState: TraitsState = {
    selectedTrait: null,
    traits: TraitRepository.getAll()
}

// Create the slice and pass in the initial state
const traitsSlice = createSlice({
  name: 'traits',
  initialState,
  reducers: {
    randomizeTrait: (state) => {
      const trait = RangedThingPicker.Pick<Trait>(state.traits)
      state.selectedTrait = trait || null
    }
  }
})

export const { randomizeTrait } = traitsSlice.actions

// Export the generated reducer function
export default traitsSlice.reducer