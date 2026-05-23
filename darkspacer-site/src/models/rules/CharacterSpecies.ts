import { Trait } from './Trait';

export class CharacterSpecies {
    Name: string;
    Description: string;
    Traits: Trait[]; 

    constructor(name: string, description: string, traits: Trait[]) {
        this.Name = name;
        this.Description = description;
        this.Traits = traits
    }

    public static FromObject(obj: any): CharacterSpecies {
        return new CharacterSpecies(
            obj.name,
            obj.description,
            obj.traits.map(Trait.FromObject),
        );
    }
}