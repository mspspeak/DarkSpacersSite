//redex slice for models/game/Character.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CharacterState {  
  generated: boolean;
  characterMotivationId: number | null;  
  characterCreds: number | null;
  hasStarterGear: boolean;
}
const initialState: CharacterState = {
  generated: false,
  characterMotivationId: null,
  characterCreds: null,
  hasStarterGear: false
};
// Create the slice and pass in the initial state
const characterSlice = createSlice({
  name: 'characterState',
  initialState,
  reducers: {  
    setGenerated: (state, action: PayloadAction<boolean>) => {
      state.generated = action.payload;
    },
    setCharacterMotivationId: (state, action: PayloadAction<number | null>) => {
      state.characterMotivationId = action.payload;
    },              
    setCharacterCreds: (state, action: PayloadAction<number | null>) => {
      state.characterCreds = action.payload;
    },
    setHasStarterGear: (state, action: PayloadAction<boolean>) => {
      state.hasStarterGear = action.payload;
    },
  }
});

export const {      
  setGenerated,
  setCharacterMotivationId,
  setCharacterCreds,
  setHasStarterGear,
} = characterSlice.actions;
// Export the generated reducer function
export default characterSlice.reducer;
// // Export the type of the state
// export type CharacterStateType = {
//   characterState: CharacterState;
// };
// // Export the type of the action payload
// export type SetCharacterPayload = PayloadAction<Character>;
// // Export the type of the character
// export type CharacterType = Character;
// // Export the type of the character state
// export type CharacterStateType = {
//   character: Character | null;
// };
// // Export the type of the character slice
// export type CharacterSliceType = {
//   characterState: CharacterStateType;
//   setCharacter: (character: Character) => void;
// };                  