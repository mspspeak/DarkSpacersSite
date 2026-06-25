
import { Talent } from "../models/rules/Talent";
import { Archetype } from "../models/rules/Archetype";
import { OptionalRule } from "../models/rules/OptionalRule";

export class ArchetypeRules {

    public static GetOptionalRule(archetype: Archetype): OptionalRule | null {
        if (!archetype || archetype.OptionalRules.length === 0) {
            return null;
        }

        const optionalRule = archetype.OptionalRules[0];
        return optionalRule || null;
    }

    public static GetFirstLevelTalents(archetype: Archetype, usingOptionalRules: number[] | null) : Talent[]
    {
        const selectedArchetypeHasOptions = archetype.OptionalRules.length > 0;
        if (!usingOptionalRules || 
            usingOptionalRules.length === 0
            || !selectedArchetypeHasOptions) {
            return archetype.FirstLevelTalents;
        }
        const optionalRulesInUse = archetype.OptionalRules.filter(
            rule => usingOptionalRules.includes(rule.Id) && 
            rule.AlternateFirstLevelTalentReplacesId !== null && 
            rule.AlternateFirstLevelTalent !== null);    

        if (optionalRulesInUse.length === 0) {
            return archetype.FirstLevelTalents;
        }
         
        const firstOptionalRule = optionalRulesInUse[0];
        const replaceTalentId = firstOptionalRule.AlternateFirstLevelTalentReplacesId;
        const replaceTalent = archetype.FirstLevelTalents.find(talent => talent.Id === replaceTalentId);
        const alternateTalent = firstOptionalRule.AlternateFirstLevelTalent;
        if (!replaceTalent || !alternateTalent) {
            return archetype.FirstLevelTalents;
        }

        const alternateTalents = archetype.FirstLevelTalents.map(talent => {
            if (talent.Id === replaceTalentId) {
                return alternateTalent;
            }
            return talent;
        });

        return alternateTalents;
    }
  

    public static GetTalents(archetype: Archetype, usingOptionalRules: number[] | null) : Talent[]
    {
        const selectedArchetypeHasOptions = archetype.OptionalRules.length > 0;
        if (!usingOptionalRules || 
            usingOptionalRules.length === 0
            || !selectedArchetypeHasOptions) {
            return archetype.Talents;
        }
        const optionalRulesInUse = archetype.OptionalRules.filter(
            rule => usingOptionalRules.includes(rule.Id) && 
            rule.AlternateTalentReplacesId !== null && 
            rule.AlternateTalent !== null);    

        if (optionalRulesInUse.length === 0) {
            return archetype.Talents;
        }
         
        const firstOptionalRule = optionalRulesInUse[0];
        const replaceTalentId = firstOptionalRule.AlternateTalentReplacesId;
        const replaceTalent = archetype.Talents.find(talent => talent.Id === replaceTalentId);
        const alternateTalent = firstOptionalRule.AlternateTalent;
        if (!replaceTalent || !alternateTalent) {
            return archetype.Talents;
        }

        const alternateTalents = archetype.Talents.map(talent => {
            if (talent.Id === replaceTalentId) {
                return alternateTalent;
            }
            return talent;
        });

        return alternateTalents;
    }
}