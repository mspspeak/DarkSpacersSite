import { RangedThing } from "./RangedThing";

export class Motivation extends RangedThing {
    Id: number;
    Name: string;
    ShortCode: string;
    Description: string;
    StartingBonus: string;
    GameplayEffect: string;
    constructor(id: number, name: string, shortCode: string, description: string, startingBonus: string, gameplayEffect: string, rollMin: number, rollMax: number) {
        super(id, name, description, rollMin, rollMax);
        this.Id = id;
        this.Name = name;
        this.ShortCode = shortCode;
        this.Description = description;
        this.StartingBonus = startingBonus;
        this.GameplayEffect = gameplayEffect;        
    }

    public static FromObject(obj: any): Motivation {
        return new Motivation(
            obj.id,
            obj.name,
            obj.shortCode,
            obj.description,
            obj.startingBonus,
            obj.gameplayEffect,
            obj.rollMin,
            obj.rollMax
        );
    }
}