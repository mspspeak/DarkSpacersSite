import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CharacterBackgroundState {
    characterBackgroundId: number | null
}

const initialState: CharacterBackgroundState = {
    characterBackgroundId: null
}

// Create the slice and pass in the initial state
const characterBackgroundsSlice = createSlice({
  name: 'characterBackgroundState',
  initialState,
  reducers: {
    // // Action to set the character background
    setCharacterBackgroundId: (state, action: PayloadAction<number | null>) => {
       state.characterBackgroundId = action.payload
    }
  }
})

export const { setCharacterBackgroundId } = characterBackgroundsSlice.actions

// Export the generated reducer function
export default characterBackgroundsSlice.reducer