import { GameMath } from './GameMath';
import { describe, it, expect } from '@jest/globals';               

describe('GameMath', () => {
    beforeEach(() => {
        
    });

    describe('AbilityScoreToModifier', () => {
        it('should return correct modifier for scores 1 to 20', () => {
            const testCases = [
                { score: 1, expectedModifier: -5 },
                { score: 2, expectedModifier: -4 },
                { score: 3, expectedModifier: -4 },
                { score: 4, expectedModifier: -3 },
                { score: 5, expectedModifier: -3 },
                { score: 6, expectedModifier: -2 },
                { score: 7, expectedModifier: -2 },
                { score: 8, expectedModifier: -1 },
                { score: 9, expectedModifier: -1 },
                { score: 10, expectedModifier: 0 },
                { score: 11, expectedModifier: 0 },
                { score: 12, expectedModifier: 1 },
                { score: 13, expectedModifier: 1 },
                { score: 14, expectedModifier: 2 },
                { score: 15, expectedModifier: 2 },
                { score: 16, expectedModifier: 3 },
                { score: 17, expectedModifier: 3 },
                { score: 18, expectedModifier: 4 },
                { score: 19, expectedModifier: 4 },
                { score: 20, expectedModifier: 5 },
            ];

            testCases.forEach(({ score, expectedModifier }) => {
                const modifier = GameMath.AbilityScoreToModifier(score);
                expect(modifier).toBe(expectedModifier);
            });
        });
    });

    describe('AbilityScoreToModifierString', () => {
        it('should return correct modifier for scores 1 to 20', () => {
            const testCases = [
                { score: 1, expectedModifier: '-5' },
                { score: 2, expectedModifier: '-4' },
                { score: 3, expectedModifier: '-4' },
                { score: 4, expectedModifier: '-3' },
                { score: 5, expectedModifier: '-3' },
                { score: 6, expectedModifier: '-2' },
                { score: 7, expectedModifier: '-2' },
                { score: 8, expectedModifier: '-1' },
                { score: 9, expectedModifier: '-1' },
                { score: 10, expectedModifier: '+0' },
                { score: 11, expectedModifier: '+0' },
                { score: 12, expectedModifier: '+1' },
                { score: 13, expectedModifier: '+1' },
                { score: 14, expectedModifier: '+2' },
                { score: 15, expectedModifier: '+2' },
                { score: 16, expectedModifier: '+3' },
                { score: 17, expectedModifier: '+3' },
                { score: 18, expectedModifier: '+4' },
                { score: 19, expectedModifier: '+4' },
                { score: 20, expectedModifier: '+5' },
            ];

            testCases.forEach(({ score, expectedModifier }) => {
                const modifier = GameMath.AbilityScoreToModifierString(score);
                expect(modifier).toBe(expectedModifier);
            });
        });
    });
}); 