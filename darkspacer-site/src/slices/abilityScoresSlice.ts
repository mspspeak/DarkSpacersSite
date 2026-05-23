import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AbilityScoreGenerator, AbilityScoreRollType } from '../generators/AbilityScoreGenerator'
import { RandomNumberGenerator } from '../generators/RandomNumberGenerator';

const abilityScoreGenerator = new AbilityScoreGenerator(new RandomNumberGenerator(), AbilityScoreRollType.Standard);

export interface AbilityScoresState {    
    characterStr: number,
    characterDex: number,
    characterCon: number,
    characterInt: number,
    characterWis: number,
    characterCha: number
}

const initialState: AbilityScoresState = {
    characterStr: 0,
    characterDex: 0,
    characterCon: 0,
    characterInt: 0,
    characterWis: 0,
    characterCha: 0
}

// Create the slice and pass in the initial state
const abilityScoresSlice = createSlice({
  name: 'abilityScoresState',
  initialState,
  reducers: {
    setCharacterAbilityScores: (state, action: PayloadAction<AbilityScoresState>) => {
      const { characterStr, characterDex, characterCon, characterInt, characterWis, characterCha } = action.payload;
      state.characterStr = characterStr;
      state.characterDex = characterDex;
      state.characterCon = characterCon;
      state.characterInt = characterInt;
      state.characterWis = characterWis;
      state.characterCha = characterCha;
    },
  }
})

export const { setCharacterAbilityScores } = abilityScoresSlice.actions

// Export the generated reducer function
export default abilityScoresSlice.reducer