import { describe, it, expect } from '@jest/globals';               
import { TraitRepository } from './TraitRepository';

describe('TraitRepository', () => {
    it('should load all the Traits', () => {                                
        const traits = TraitRepository.getAll(); 
        expect(traits.length).toBeGreaterThan(0); // Ensure there are species loaded   
        traits.forEach(trait => {
            expect(trait).toBeDefined();
            expect(trait.Id).toBeDefined();
            expect(trait.Name).toBeDefined();
            expect(trait.Description).toBeDefined();
            expect(trait.RollMax).toBeDefined();
            expect(trait.RollMin).toBeDefined();            
        });
    });
});