import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface CharacterNameState {
    name: string
}

const initialState: CharacterNameState = {
    name: ''
}

// Create the slice and pass in the initial state
const characterNameSlice = createSlice({
  name: 'characterName',
  initialState,
  reducers: {
    setCharacterName: (state, action: PayloadAction<string>) => {
      state.name = action.payload
    }
  }
})

export const { setCharacterName } = characterNameSlice.actions

// Export the generated reducer function
export default characterNameSlice.reducer