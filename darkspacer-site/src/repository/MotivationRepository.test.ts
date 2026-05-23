import { describe, it, expect } from '@jest/globals';               
import { MotivationRepository } from './MotivationRepository';
import { Motivation } from '../models/rules/Motivation';

describe('MotivationRepository', () => {    
    it('should load all the Motivations', () => {                                
        const motivations = MotivationRepository.getAll(); 
        expect(motivations.length).toBeGreaterThan(0); // Ensure there are motivations loaded   
        motivations.forEach((motivation: Motivation) => {
            expect(motivation).toBeDefined();
            expect(motivation.Id).toBeDefined();
            expect(motivation.Name).toBeDefined();
            expect(motivation.ShortCode).toBeDefined();
            expect(motivation.Description).toBeDefined();
            expect(motivation.StartingBonus).toBeDefined();
            expect(motivation.GameplayEffect).toBeDefined();            
        });
    });
});