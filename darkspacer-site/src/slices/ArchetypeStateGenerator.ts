import { RandomNumberGenerator } from "../generators/RandomNumberGenerator";
import { RangedThingPicker } from "../generators/RangedThingPicker";
import { ThingPicker } from "../generators/ThingPicker";
import { Archetype } from "../models/rules/Archetype";
import { BonusType } from "../models/rules/BonusType";
import { Talent } from "../models/rules/Talent";
import { ArchetypeRepository } from "../repository/ArchetypeRepository";
import { BonusRules } from "../utils/BonusRules";
import { ArchetypeState } from "./archetypeSlice";


export class ArchetypeStateGenerator {

    public static generateNew(characterArchetype: ArchetypeState): ArchetypeState {
        const generatedArchetypeState: ArchetypeState = { ...characterArchetype };
        
        const generatedArchetype: Archetype = ThingPicker.Pick<Archetype>(ArchetypeRepository.getAll())!;
        generatedArchetypeState.archetypeId = generatedArchetype.Id;
        
        const firstLevelTalent = RangedThingPicker.Pick<Talent>(generatedArchetype.FirstLevelTalents || [])
        generatedArchetypeState.archetypeTalentId = firstLevelTalent?.Id || null;

        const hasAddPlusTwoRule = BonusRules.hasAddPlusTwoRule(generatedArchetype, firstLevelTalent);
        console.log("hasAddPlusTwoRule", hasAddPlusTwoRule);
        if (hasAddPlusTwoRule) {
            const options = BonusRules.getAbilityScoreTypeOptions(firstLevelTalent?.BonusRule || null);
            const abilityScoreType = ThingPicker.Pick<BonusType>(options);
            generatedArchetypeState.abilityScoreRaisedByPlusTwoRule = abilityScoreType || null;
        }

        const hasPickPlusTwoStatsRule = BonusRules.hasPickPlusTwoStatsRule(generatedArchetype, firstLevelTalent);
        console.log("hasPickPlusTwoStatsRule", hasPickPlusTwoStatsRule);        
        if (hasPickPlusTwoStatsRule) {
            const options = BonusRules.getAbilityScoreTypeOptions(firstLevelTalent?.BonusRule || null);
            const abilityScoreType1 = ThingPicker.Pick<BonusType>(options);
            const abilityScoreType2 = ThingPicker.Pick<BonusType>(options);            
            generatedArchetypeState.abilityScoreRaisedByPlusOneRule1 = abilityScoreType1 || null;
            generatedArchetypeState.abilityScoreRaisedByPlusOneRule2 = abilityScoreType2 || null;
            console.log("Picked ability scores for +1:", abilityScoreType1, abilityScoreType2);
        }

        let gen = new RandomNumberGenerator();
        generatedArchetypeState.hitPoints = gen.generate(1, generatedArchetype.HitPointDie);          
        generatedArchetypeState.hitPoints2 = gen.generate(1, generatedArchetype.HitPointDie);
        return generatedArchetypeState;
    }
}