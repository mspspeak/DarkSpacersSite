import { RandomNumberGenerator } from "../generators/RandomNumberGenerator";
import { RangedThingPicker } from "../generators/RangedThingPicker";
import { ThingPicker } from "../generators/ThingPicker";
import { Trait } from "../models/rules/Trait";
import { SpeciesDescriptionRepository } from "../repository/SpeciesDescriptionRepository";
import { SpeciesNameRepository } from "../repository/SpeciesNameRepository";
import { TraitRepository } from "../repository/TraitRepository";
import { CharacterSpeciesState } from "./characterSpeciesSlice";

export class CharacterSpeciesStateGenerator {


    private static getRandomCharacterSpeciesDescriptions(): string[] {    
        const numberOfThings = new RandomNumberGenerator().generate(2, 5);
        const descriptions: string[] = [];

        for (let i = 0; i < numberOfThings; i++) {
            let thing = ThingPicker.Pick<string>(SpeciesDescriptionRepository.getAll()) || 'Cute';
            descriptions.push(thing);
        }
        return descriptions;
    }

    public static generateNew(characterSpeciesState: CharacterSpeciesState): CharacterSpeciesState {
        const generatedCharacterSpeciesState: CharacterSpeciesState = { ...characterSpeciesState };

        generatedCharacterSpeciesState.characterSpeciesName = ThingPicker.Pick<string>(SpeciesNameRepository.getAll()) || 'Zorg';
        generatedCharacterSpeciesState.characterSpeciesDescriptions = this.getRandomCharacterSpeciesDescriptions();
        generatedCharacterSpeciesState.characterSpeciesTraitId = RangedThingPicker.Pick<Trait>(TraitRepository.getAll())?.Id || null;
        return generatedCharacterSpeciesState;
    }
}