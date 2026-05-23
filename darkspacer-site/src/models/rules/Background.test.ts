//create a test class for Background.ts model

import { Background } from './Background';

describe('Background', () => {
    it('should create an instance', () => {
        const background = new Background(1, 'Test Background', 'Description', 1, 100);
        expect(background).toBeTruthy();
    });

    it('should create from object', () => {
        const obj = {
            id: 1,
            name: 'Test Background',
            description: 'Description',
            rollMin: 1,
            rollMax: 100
        };
        const background = Background.FromObject(obj);
        expect(background).toBeTruthy();
    });

    it('should have correct properties', () => {
        const background = new Background(1, 'Test Background', 'Description', 1, 100);
        expect(background.Id).toBe(1);
        expect(background.Name).toBe('Test Background');
        expect(background.Description).toBe('Description');
        expect(background.RollMin).toBe(1);
        expect(background.RollMax).toBe(100);
    });

    it('should be serializable to be used in react state', () => {
        const background = new Background(1, 'Test Background', 'Description', 1, 100);
        const serialized = JSON.stringify(background);
        expect(serialized).toBeTruthy();
        const deserialized = JSON.parse(serialized);
        expect(deserialized).toBeTruthy();  

        expect(deserialized.Id).toBe(background.Id);
        expect(deserialized.Name).toBe(background.Name);
        expect(deserialized.Description).toBe(background.Description);
        expect(deserialized.RollMin).toBe(background.RollMin);
        expect(deserialized.RollMax).toBe(background.RollMax);
    });
});