import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CharacterSpeciesState {    
  characterSpeciesTraitId: number | null,
  characterSpeciesName: string,
  characterSpeciesDescriptions: string[]
}

const initialState: CharacterSpeciesState = {
  characterSpeciesTraitId: null,
  characterSpeciesName: '',
  characterSpeciesDescriptions: []
}

// Create the slice and pass in the initial state
const characterSpeciesSlice = createSlice({
  name: 'characterSpecies',
  initialState,
  reducers: {    
    setCharacterSpeciesTraitId: (state, action: PayloadAction<number | null>) => {
      state.characterSpeciesTraitId = action.payload;
    },
    setCharacterSpeciesName: (state, action: PayloadAction<string>) => {
      state.characterSpeciesName = action.payload;
    },    
    setCharacterSpeciesDescriptions: (state, action: PayloadAction<Array<string>>) => {
      state.characterSpeciesDescriptions = []; // Clear existing descriptions
      state.characterSpeciesDescriptions.push(...action.payload);
    },
  }
})

export const { setCharacterSpeciesTraitId, setCharacterSpeciesName, setCharacterSpeciesDescriptions } = characterSpeciesSlice.actions

// Export the generated reducer function
export default characterSpeciesSlice.reducer