import { RangedThingPicker } from "../generators/RangedThingPicker";
import { ThingPicker } from "../generators/ThingPicker";
import { AbilityScore } from "../models/rules/AbilityScore";
import { BonusType } from "../models/rules/BonusType";
import { Archetype } from "../models/rules/Archetype";
import { Talent } from "../models/rules/Talent";
import { ArchetypeRepository } from "../repository/ArchetypeRepository";
import { BonusRules } from "./BonusRules";




export class RandomSelector {

  public static SelectArchetypeTalentIdFromArchetype(archetypeId: number | null): number | null {
    const archetypes = ArchetypeRepository.getAll();
    const archeType: Archetype | undefined = archetypes.find((a) => a.Id === archetypeId);

    if (!archeType) {
      console.error('No archetype found for id:', archetypeId);
      return null;
    }

    console.log('found archetype:', archeType);
    // dispatch action to randomize archetype talent
    const talent = RangedThingPicker.Pick<Talent>(archeType?.FirstLevelTalents || []);
    const archetypeTalentId = talent?.Id || null;

    return archetypeTalentId;
  }

  public static SelectAbilityScoreFromRuleOnTalent(archetypeId: number | null, archetypeTalentId: number | null): BonusType {
    const archetype = ArchetypeRepository.getAll().find(a => a.Id === archetypeId)!;
    const firstLevelTalent = archetype.FirstLevelTalents.find(talent => talent.Id === archetypeTalentId);
    const abilityScoreRule = firstLevelTalent ? firstLevelTalent.BonusRule : null;
    
    const options = BonusRules.getAbilityScoreTypeOptions(abilityScoreRule);
    const abilityScoreType = ThingPicker.Pick<BonusType>(options);
    return abilityScoreType!;
  } 

}