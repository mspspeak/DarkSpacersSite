import { AbilityScoreGenerator, AbilityScoreRollType } from './AbilityScoreGenerator';
import { NumberGenerator } from './NumberGenerator';
import { describe, it, expect } from '@jest/globals';               
import { mock } from 'jest-mock-extended';

describe('AbilityScoreGenerator', () => {
    beforeEach(() => {
        
    });

    it('should generate a standard ability score', () => {        
        const numberGenerator = mock<NumberGenerator>();
        numberGenerator.generate.mockReturnValueOnce(3).mockReturnValueOnce(3).mockReturnValueOnce(3);        
        let abilityScoreGenerator = new AbilityScoreGenerator(numberGenerator, AbilityScoreRollType.Standard);        
        const score = abilityScoreGenerator.generate();
        expect(score.value).toBe(9); // 3 + 3 + 3
    });

    
    it('should generate a roll four drop lowest ability score when two are the same', () => {
        testRollFourDropLowest([3, 4, 5, 5], 14);
        testRollFourDropLowest([6, 6, 6, 6], 18);
        testRollFourDropLowest([1, 1, 1, 1], 3);
        testRollFourDropLowest([4, 3, 2, 1], 9);
        testRollFourDropLowest([1, 2, 3, 4], 9);
        testRollFourDropLowest([2, 1, 3, 4], 9);
    });

    function testRollFourDropLowest(rolls: number[], expectedValue: number) {   
        const numberGenerator = mock<NumberGenerator>();
        rolls.forEach(roll => numberGenerator.generate.mockReturnValueOnce(roll));
        let abilityScoreGenerator = new AbilityScoreGenerator(numberGenerator, AbilityScoreRollType.RollFourDropLowest);        
        const score = abilityScoreGenerator.generateRollFourDropLowest();
        expect(score.value).toBe(expectedValue); 
    }
}); 