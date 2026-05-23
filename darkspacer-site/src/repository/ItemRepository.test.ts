import { describe, it, expect } from '@jest/globals';               
import { ItemRepository } from './ItemRepository';
import { Item } from '../models/rules/Item';

describe('ItemRepository', () => {
    it('should load all the Items', () => {                        
        const items = ItemRepository.getAll(); 
        expect(items.length).toBeGreaterThan(0); // Ensure there are items loaded   
        items.forEach((item: Item) => {
            expect(item).toBeDefined();
            expect(item.Id).toBeDefined();
            expect(item.Name).toBeDefined();
            expect(item.Description).toBeDefined();
            expect(item.Type).toBeDefined();
            expect(item.Value).toBeDefined();
            expect(item.Weight).toBeDefined();
            expect(item.GearSlots).toBeDefined();
            expect(item.PerGearSlot).toBeDefined();
            expect(item.IsFreeToCarry).toBeDefined();
            expect(item.ArmorProperties).toBeDefined();
            expect(item.ArmorProperties.ArmorClass).toBeDefined();
            expect(item.ArmorProperties.Properties).toBeDefined();                    
        });
    });
});