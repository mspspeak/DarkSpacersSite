import { ArchetypeGenerator } from './ArchetypeGenerator';
import { NumberGenerator } from './NumberGenerator';
import { describe, it, expect } from '@jest/globals';               
import { mock } from 'jest-mock-extended';

describe('ArchetypeGenerator', () => {
    it('should generate an Archetype', () => {        
        const numberGenerator = mock<NumberGenerator>();
        numberGenerator.generate.mockReturnValueOnce(0).mockReturnValueOnce(0).mockReturnValueOnce(3);        
        let archetypeGenerator = new ArchetypeGenerator(numberGenerator);
        const archetype = archetypeGenerator.generate();
        expect(archetype).toBeDefined();
    });
});
