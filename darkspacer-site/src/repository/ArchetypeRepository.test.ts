import { describe, it, expect } from '@jest/globals';               
import { ArchetypeRepository } from './ArchetypeRepository';

describe('ArchetypeRepository', () => {
    it('should load all the standard Archetypes', () => {                                
        const archetypes = ArchetypeRepository.getAll(); 
        expect(archetypes.length).toBeGreaterThan(0); // Ensure there are archetypes loaded        
    });
});