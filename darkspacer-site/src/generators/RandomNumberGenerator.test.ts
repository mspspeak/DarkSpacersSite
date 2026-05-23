import { RandomNumberGenerator } from './RandomNumberGenerator';
import { describe, it, expect } from '@jest/globals';               

describe('RandomNumberGenerator', () => {
    beforeEach(() => {
        
    });

    it.skip('should generate random numbers between min and max including min and max', () => {
        
        let counts : number[] = Array(6).fill(0); // Initialize counts for numbers 1 to 5
        
        // for a thousand iterations, we expect the generated number to be within the range
        for (let i = 0; i < 10000; i++) {
            const numberGenerator = new RandomNumberGenerator();
            const min = 1;
            const max = 6;
            const randomNumber = numberGenerator.generate(min, max);
            counts[randomNumber - 1]++; // Increment the count for the generated number            
            expect(randomNumber).toBeGreaterThanOrEqual(min);
            expect(randomNumber).toBeLessThanOrEqual(max);
        }

        // Check that all numbers from 1 to 5 were generated at least once
        for (let i = 0; i < counts.length; i++) {
            expect(counts[i]).toBeGreaterThan(0); // Ensure each number was generated at least once
        }
        // Check that the counts are reasonable (not too skewed)
        const totalGenerated = counts.reduce((a, b) => a + b, 0);
        const averageCount = totalGenerated / counts.length;
        for (let i = 0; i < counts.length; i++) {
            expect(counts[i]).toBeGreaterThanOrEqual(averageCount * 0.5); // Ensure no number is too low
            expect(counts[i]).toBeLessThanOrEqual(averageCount * 1.5); // Ensure no number is too high
        }        
    });

    it.skip('should feel fair for d20 rolls in lower frequencies', () => {
        for (let j=0; j < 1000; j++) {
            testQualitativeHiLowD20Fairness();
        }       
    });

    function testQualitativeHiLowD20Fairness() {
        const min = 1;
        const max = 20;
        const half = 10;
        const rolls = 150;
        let counts : number[] = Array(max).fill(0); // Initialize counts for numbers 1 to 5
        
        // for a thousand iterations, we expect the generated number to be within the range
        for (let i = 0; i < rolls; i++) {
            const numberGenerator = new RandomNumberGenerator();                        
            const randomNumber = numberGenerator.generate(min, max);
            counts[randomNumber - 1]++; // Increment the count for the generated number            
            expect(randomNumber).toBeGreaterThanOrEqual(min);
            expect(randomNumber).toBeLessThanOrEqual(max);
        }

        const countFrom1to10 = counts.slice(0, 10).reduce((a, b) => a + b, 0);
        const countFrom11to20 = counts.slice(10, 20).reduce((a, b) => a + b, 0);
        expect(countFrom1to10).toBeGreaterThan(rolls * .25);
        expect(countFrom11to20).toBeGreaterThan(rolls * .25);
    }

    it("should generate numbers with min all the way to max", () => {
        const numberGenerator = new RandomNumberGenerator();                        
        const min = 1;
        const max = 6;
        let count=0;
        const tries = 10000;

        let has1 = false;
        let has2 = false;
        let has3 = false;
        let has4 = false;
        let has5 = false;
        let has6 = false;

        while (!(has1 && has2 && has3 && has4 && has5 && has6)) {
            const randomNumber = numberGenerator.generate(min, max);
            if (randomNumber === 1) has1 = true;
            if (randomNumber === 2) has2 = true;
            if (randomNumber === 3) has3 = true;
            if (randomNumber === 4) has4 = true;
            if (randomNumber === 5) has5 = true;
            if (randomNumber === 6) has6 = true;     
            
            count++;
            if (count > tries) {
                break;  // prevent infinite loop in case of failure
            }
        }

        expect(has1).toBe(true);
        expect(has2).toBe(true);
        expect(has3).toBe(true);
        expect(has4).toBe(true);
        expect(has5).toBe(true);
        expect(has6).toBe(true);
    });

    it("should never generate numbers outside min and max", () => {
        const numberGenerator = new RandomNumberGenerator();                        
        const min = 1;
        const max = 6;
        let count=0;
        // it is possible to be unlucky and not get min or max in a small number of tries
        const tries = 10000;  

        while (count < tries) {
            const randomNumber = numberGenerator.generate(min, max);

            expect(randomNumber).toBeGreaterThanOrEqual(min);
            expect(randomNumber).toBeLessThanOrEqual(max);   
            
            count++;            
        }        
    });
}); 