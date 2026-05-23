import { AbilityScoreGenerator } from "../generators/AbilityScoreGenerator";
import { RandomNumberGenerator } from "../generators/RandomNumberGenerator";
import { RangedThingPicker } from "../generators/RangedThingPicker";
import { ThingPicker } from "../generators/ThingPicker";
import { BonusType } from "../models/rules/BonusType";
import { Archetype } from "../models/rules/Archetype";
import { Background } from "../models/rules/Background";
import { Motivation } from "../models/rules/Motivation";
import { Talent } from "../models/rules/Talent";
import { Trait } from "../models/rules/Trait";
import { ArchetypeRepository } from "../repository/ArchetypeRepository";
import { BackgroundRepository } from "../repository/BackgroundRepository";
import { MotivationRepository } from "../repository/MotivationRepository";
import { NameRepository } from "../repository/NameRepository";
import { SpeciesDescriptionRepository } from "../repository/SpeciesDescriptionRepository";
import { SpeciesNameRepository } from "../repository/SpeciesNameRepository";
import { TraitRepository } from "../repository/TraitRepository";
import { CharacterState } from "./characterSlice";
import { BonusRules } from "../utils/BonusRules";


export class CharacterStateGenerator {

    public static generateNew(characterState: CharacterState): CharacterState {
        const generatedCharacterState: CharacterState = { ...characterState };
                                        
        let gen = new RandomNumberGenerator();        
        generatedCharacterState.characterMotivationId = RangedThingPicker.Pick<Motivation>(MotivationRepository.getAll())?.Id || null;

        generatedCharacterState.characterCreds = (gen.generate(1, 6) + gen.generate(1, 6)) * 10;
        generatedCharacterState.hasStarterGear = false;

        generatedCharacterState.generated = true;
        return generatedCharacterState;
    }    
}