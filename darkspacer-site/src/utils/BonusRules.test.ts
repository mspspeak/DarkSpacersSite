import { BonusRule } from '../models/rules/BonusRule';
import { BonusType } from '../models/rules/BonusType';
import { BonusRules } from './BonusRules';
import { describe, it, expect } from '@jest/globals';               

describe('BonusRules', () => {
    beforeEach(() => {
        
    });

    describe('getAbilityScoreModsFrom', () => {
        it ('should return zero mods when rule is None', () => {
            const mods = BonusRules.getAbilityScoreModsFrom(
                null,
                null,
                null,
                null,
                null,
                null,
                null,
                null                                
            );
            expect(mods).toEqual({
                Str: 0,
                Dex: 0,
                Con: 0,
                Int: 0,
                Wis: 0,
                Cha: 0,
                ExpertKnowledge: 0
            });
        });

        it ('should return correct mods for PlusTwoToStrDexOrCon rule', () => {
            const mods = BonusRules.getAbilityScoreModsFrom(
                BonusRule.PlusTwoToStrDexOrCon,
                BonusType.Dex,
                null,
                null,
                null,
                null,
                null,
                null
            );            

            expect(mods).toEqual({
                Str: 0,
                Dex: 2,
                Con: 0,
                Int: 0,
                Wis: 0,
                Cha: 0,
                ExpertKnowledge: 0
            }); 
        });

        it ('should return correct mods for PickPlusTwoStats rule', () => {
            const mods = BonusRules.getAbilityScoreModsFrom(
                BonusRule.PickPlusTwoStats,
                null,
                BonusType.Int,
                BonusType.Wis,
                null,
                null,
                null,
                null
            );
            expect(mods).toEqual({
                Str: 0,
                Dex: 0,
                Con: 0,
                Int: 1,
                Wis: 1,
                Cha: 0,
                ExpertKnowledge: 0
            });
        });

        it ('should return correct mods for PlusTwoToIntOrPlusOneToExpertKnowledge rule', () => {
            const mods = BonusRules.getAbilityScoreModsFrom(
                BonusRule.PlusTwoToIntOrPlusOneToExpertKnowledge,
                BonusType.Int,
                null,
                null,
                null,
                null,
                null,
                null
            );
            expect(mods).toEqual({
                Str: 0,
                Dex: 0,
                Con: 0,
                Int: 2,
                Wis: 0,
                Cha: 0,
                ExpertKnowledge: 0
            });
        });

        it ('should return correct mods for PlusTwoToDexIntCha rule', () => {
            const mods = BonusRules.getAbilityScoreModsFrom(
                BonusRule.PlusTwoToDexIntCha,
                BonusType.Cha,
                null,
                null,
                null,
                null,
                null,
                null
            );
            expect(mods).toEqual({
                Str: 0,
                Dex: 0,
                Con: 0,
                Int: 0,
                Wis: 0,
                Cha: 2,
                ExpertKnowledge: 0
            });
        });

        it ('should return correct mods for PlusTwoToIntWisCon rule', () => {
            const mods = BonusRules.getAbilityScoreModsFrom(
                BonusRule.PlusTwoToIntWisCon,
                BonusType.Con,
                null,
                null,
                null,
                null,
                null,
                null
            );
            expect(mods).toEqual({
                Str: 0,
                Dex: 0,
                Con: 2,
                Int: 0,
                Wis: 0,
                Cha: 0,
                ExpertKnowledge: 0
            });
        });

        it ('should return correct mods for PlusTwoToDexWisOrCha rule', () => {
            const mods = BonusRules.getAbilityScoreModsFrom(
                BonusRule.PlusTwoToDexWisOrCha,
                BonusType.Wis,
                null,
                null,
                null,
                null,
                null,
                null
            );
            expect(mods).toEqual({
                Str: 0,
                Dex: 0,
                Con: 0,
                Int: 0,
                Wis: 2,
                Cha: 0,
                ExpertKnowledge: 0
            });
        });

    });

        // it('sh', () => {
        //     const testCases = [
        //         { score: 1, expectedModifier: -5 },
        //         { score: 2, expectedModifier: -4 },
        //         { score: 3, expectedModifier: -4 },
        //         { score: 4, expectedModifier: -3 },
        //         { score: 5, expectedModifier: -3 },
        //         { score: 6, expectedModifier: -2 },
        //         { score: 7, expectedModifier: -2 },
        //         { score: 8, expectedModifier: -1 },
        //         { score: 9, expectedModifier: -1 },
        //         { score: 10, expectedModifier: 0 },
        //         { score: 11, expectedModifier: 0 },
        //         { score: 12, expectedModifier: 1 },
        //         { score: 13, expectedModifier: 1 },
        //         { score: 14, expectedModifier: 2 },
        //         { score: 15, expectedModifier: 2 },
        //         { score: 16, expectedModifier: 3 },
        //         { score: 17, expectedModifier: 3 },
        //         { score: 18, expectedModifier: 4 },
        //         { score: 19, expectedModifier: 4 },
        //         { score: 20, expectedModifier: 5 },
        //     ];

        //     testCases.forEach(({ score, expectedModifier }) => {
        //         const modifier = GameMath.AbilityScoreToModifier(score);
        //         expect(modifier).toBe(expectedModifier);
        //     });
        // });
    

    // describe('AbilityScoreToModifierString', () => {
    //     it('should return correct modifier for scores 1 to 20', () => {
    //         const testCases = [
    //             { score: 1, expectedModifier: '-5' },
    //             { score: 2, expectedModifier: '-4' },
    //             { score: 3, expectedModifier: '-4' },
    //             { score: 4, expectedModifier: '-3' },
    //             { score: 5, expectedModifier: '-3' },
    //             { score: 6, expectedModifier: '-2' },
    //             { score: 7, expectedModifier: '-2' },
    //             { score: 8, expectedModifier: '-1' },
    //             { score: 9, expectedModifier: '-1' },
    //             { score: 10, expectedModifier: '+0' },
    //             { score: 11, expectedModifier: '+0' },
    //             { score: 12, expectedModifier: '+1' },
    //             { score: 13, expectedModifier: '+1' },
    //             { score: 14, expectedModifier: '+2' },
    //             { score: 15, expectedModifier: '+2' },
    //             { score: 16, expectedModifier: '+3' },
    //             { score: 17, expectedModifier: '+3' },
    //             { score: 18, expectedModifier: '+4' },
    //             { score: 19, expectedModifier: '+4' },
    //             { score: 20, expectedModifier: '+5' },
    //         ];

    //         testCases.forEach(({ score, expectedModifier }) => {
    //             const modifier = GameMath.AbilityScoreToModifierString(score);
    //             expect(modifier).toBe(expectedModifier);
    //         });
    //     });
    // });
}); 