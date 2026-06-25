import { describe, it, expect } from '@jest/globals';               
import { ArchetypeRepository } from './ArchetypeRepository';

describe('ArchetypeRepository', () => {
    it('should load all the standard Archetypes', () => {                                
        const archetypes = ArchetypeRepository.getAll(); 
        expect(archetypes.length).toBeGreaterThan(0); // Ensure there are archetypes loaded        
    });

    it('should load the Wise Archetype', () => {                                
        const archetypes = ArchetypeRepository.getAll(); 
        const wiseArchetype = archetypes.find(a => a.Name === 'Wise');
        expect(wiseArchetype).toBeDefined(); // Ensure the Wise Archetype is loaded
        expect(wiseArchetype?.OptionalRules.length).toBeGreaterThan(0); // Ensure the Wise Archetype has optional rules
        expect(wiseArchetype?.OptionalRules[0].Name).toBe('The Triad'); // Check the name of the first optional rule
        expect(wiseArchetype?.OptionalRules[0].AlternateTalent).not.toBeNull(); // Ensure the alternate talent is not null
        expect(wiseArchetype?.OptionalRules[0].AlternateFirstLevelTalent).not.toBeNull(); // Ensure the alternate first level talent is not null
        expect(wiseArchetype?.OptionalRules[0].AlternateFirstLevelTalent?.Name).toBe('Wise 3-6'); // Check the name of the alternate talent
        expect(wiseArchetype?.OptionalRules[0].AlternateTalentReplacesId).toBe(9970012); // Check the ID of the alternate first level talent
        expect(wiseArchetype?.OptionalRules[0].AlternateFirstLevelTalentReplacesId).toBe(2970015); // Check the ID of the alternate talent    
    });
});