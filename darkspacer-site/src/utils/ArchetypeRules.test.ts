import { describe, it, expect } from '@jest/globals';     
import { ArchetypeRules } from './ArchetypeRules';
import { ArchetypeRepository } from '../repository/ArchetypeRepository';

describe('ArchetypeRules', () => {
  describe('GetFirstLevelTalents', () => {    
    it('should get a special list when using optional rules', () => {
      const selectedArchetype = ArchetypeRepository.getAll().find(a => a.Name === 'Wise');
      const usingOptionalRules = [333001];
      const firstLevelTalents = ArchetypeRules.GetFirstLevelTalents(selectedArchetype!, usingOptionalRules);
      expect(firstLevelTalents).toBeDefined();
      expect(firstLevelTalents.length).toBeGreaterThan(0); // Ensure there are first level talents loaded   
      const hasAlternateTalent = firstLevelTalents.some(talent => talent.Id === 3970015);   
      expect(hasAlternateTalent).toBe(true); // Ensure the alternate talent is present      
    });

    it('should get a normal list when not using optional rules', () => {
      const selectedArchetype = ArchetypeRepository.getAll().find(a => a.Name === 'Wise');
      const usingOptionalRules: number[] = [];
      const firstLevelTalents = ArchetypeRules.GetFirstLevelTalents(selectedArchetype!, usingOptionalRules);
      expect(firstLevelTalents).toBeDefined();
      expect(firstLevelTalents.length).toBeGreaterThan(0); // Ensure there are first level talents loaded      
      const hasAlternateTalent = firstLevelTalents.some(talent => talent.Id === 3970015);   
      expect(hasAlternateTalent).toBe(false); // Ensure the alternate talent is not present      
      const hasOriginalTalent = firstLevelTalents.some(talent => talent.Id === 2970015);   
      expect(hasOriginalTalent).toBe(true); // Ensure the original talent is present      
    });    
  });  

  describe('GetTalents', () => {    
    it('should get a special list when using optional rules', () => {
      const selectedArchetype = ArchetypeRepository.getAll().find(a => a.Name === 'Wise');
      const usingOptionalRules = [333001];
      const talents = ArchetypeRules.GetTalents(selectedArchetype!, usingOptionalRules);
      expect(talents).toBeDefined();
      expect(talents.length).toBeGreaterThan(0); // Ensure there are first level talents loaded   
      const hasAlternateTalent = talents.some(talent => talent.Id === 3970012);   
      expect(hasAlternateTalent).toBe(true); // Ensure the alternate talent is present      
    });

    it('should get a normal list when not using optional rules', () => {
      const selectedArchetype = ArchetypeRepository.getAll().find(a => a.Name === 'Wise');
      const usingOptionalRules: number[] = [];
      const talents = ArchetypeRules.GetTalents(selectedArchetype!, usingOptionalRules);
      expect(talents).toBeDefined();
      expect(talents.length).toBeGreaterThan(0); // Ensure there are first level talents loaded      
      const hasAlternateTalent = talents.some(talent => talent.Id === 3970012);   
      expect(hasAlternateTalent).toBe(false); // Ensure the alternate talent is not present      
      const hasOriginalTalent = talents.some(talent => talent.Id === 9970012);   
      expect(hasOriginalTalent).toBe(true); // Ensure the original talent is present      
    });    
  });    
});
