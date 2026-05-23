import { describe, it, expect } from '@jest/globals';               
import { BackgroundRepository } from './BackgroundRepository';

describe('BackgroundRepository', () => {
    it('should load all the Backgrounds', () => {                                
        const backgrounds = BackgroundRepository.getAll(); 
        expect(backgrounds.length).toBeGreaterThan(0); // Ensure there are species loaded   
        backgrounds.forEach(background => {
            expect(background).toBeDefined();
            expect(background.Id).toBeDefined();
            expect(background.Name).toBeDefined();
            expect(background.Description).toBeDefined();
            expect(background.RollMax).toBeDefined();
            expect(background.RollMin).toBeDefined();            
        });
    });
});