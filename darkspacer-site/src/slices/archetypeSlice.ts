import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BonusType } from '../models/rules/BonusType';

export interface ArchetypeState {    
  archetypeId: number | null;
  archetypeTalentId: number | null;
  archetypeTalentAddId: number | null;
  hitPoints: number;
  hitPoints2: number;
  abilityScoreRaisedByPlusTwoRule: BonusType | null;
  abilityScoreRaisedByPlusOneRule1: BonusType | null;
  abilityScoreRaisedByPlusOneRule2: BonusType | null;
  abilityScoreRaisedByPlusTwoRuleAdd: BonusType | null;
  abilityScoreRaisedByPlusOneRule1Add: BonusType | null;
  abilityScoreRaisedByPlusOneRule2Add: BonusType | null;  
}

const initialState: ArchetypeState = {
  archetypeId: null,
  archetypeTalentId: null,
  archetypeTalentAddId: null,
  hitPoints: 0,
  hitPoints2: 0,
  abilityScoreRaisedByPlusTwoRule: null,
  abilityScoreRaisedByPlusOneRule1: null,
  abilityScoreRaisedByPlusOneRule2: null,
  abilityScoreRaisedByPlusTwoRuleAdd: null,
  abilityScoreRaisedByPlusOneRule1Add: null,
  abilityScoreRaisedByPlusOneRule2Add: null  
}

// Create the slice and pass in the initial state
const archetypeSlice = createSlice({
  name: 'archetypeState',
  initialState,
  reducers: {
    setArchetypeId: (state, action: PayloadAction<number | null>) => {
      state.archetypeId = action.payload;
    },
    setArchetypeTalentId: (state, action: PayloadAction<number | null>) => {
      state.archetypeTalentId = action.payload;
    },    
    setArchetypeTalentAddId: (state, action: PayloadAction<number | null>) => {
      state.archetypeTalentAddId = action.payload;
    },
    setHitPoints: (state, action: PayloadAction<[number, number]>) => {
      state.hitPoints = action.payload[0];
      state.hitPoints2 = action.payload[1];
    },
    setAbilityScoreRaisedByPlusTwoRule: (state, action: PayloadAction<BonusType | null>) => {
      state.abilityScoreRaisedByPlusTwoRule = action.payload;
    },
    setAbilityScoreRaisedByPlusOneRule1: (state, action: PayloadAction<BonusType | null>) => {
      state.abilityScoreRaisedByPlusOneRule1 = action.payload;
    },
    setAbilityScoreRaisedByPlusOneRule2: (state, action: PayloadAction<BonusType | null>) => {
      state.abilityScoreRaisedByPlusOneRule2 = action.payload;
    },
    setAbilityScoreRaisedByPlusTwoRuleAdd: (state, action: PayloadAction<BonusType | null>) => {
      state.abilityScoreRaisedByPlusTwoRuleAdd = action.payload;
    },
    setAbilityScoreRaisedByPlusOneRule1Add: (state, action: PayloadAction<BonusType | null>) => {
      state.abilityScoreRaisedByPlusOneRule1Add = action.payload;
    },
    setAbilityScoreRaisedByPlusOneRule2Add: (state, action: PayloadAction<BonusType | null>) => {
      state.abilityScoreRaisedByPlusOneRule2Add = action.payload;
    }
  }
})

export const { 
  setArchetypeId, 
  setArchetypeTalentId, 
  setArchetypeTalentAddId, 
  setHitPoints,    
  setAbilityScoreRaisedByPlusTwoRule, 
  setAbilityScoreRaisedByPlusOneRule1, 
  setAbilityScoreRaisedByPlusOneRule2, 
  setAbilityScoreRaisedByPlusTwoRuleAdd, 
  setAbilityScoreRaisedByPlusOneRule1Add, 
  setAbilityScoreRaisedByPlusOneRule2Add 
} = archetypeSlice.actions

// Export the generated reducer function
export default archetypeSlice.reducer