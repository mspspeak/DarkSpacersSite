import { BonusRule } from "../models/rules/BonusRule";
import { BonusType } from "../models/rules/BonusType";
import { Archetype } from "../models/rules/Archetype";
import { Talent } from "../models/rules/Talent";

export class BonusRules {

    public static hasPickPlusTwoStatsRule(archetype:Archetype, firstLevelTalent:Talent | null |undefined) : boolean {

        if (!firstLevelTalent) {
            return false;
        }

        //check the talents of the archetype
        let inArchetypTalents = archetype.Talents.some((talent:Talent) => talent.BonusRule === BonusRule.PickPlusTwoStats)

        //check the chosen first level talent
        let inFirstLevelTalent = firstLevelTalent.BonusRule === BonusRule.PickPlusTwoStats;

        return inArchetypTalents || inFirstLevelTalent;
    }

    public static hasAddPlusTwoRule(archetype:Archetype, firstLevelTalent:Talent | null | undefined) : boolean {

        if (!firstLevelTalent) {
            return false;
        }

        const listOfPlusTwoRules = [
            BonusRule.PlusTwoToStrDexOrCon,
            BonusRule.PlusTwoToDexWisOrCha,
            BonusRule.PlusTwoToIntOrPlusOneToExpertKnowledge,
            BonusRule.PlusTwoToIntWisCon,  
            BonusRule.PlusTwoToDexIntCha  
        ];

        //check the talents of the archetype   
        let inArchetypTalents = archetype.Talents.some((talent:Talent) => listOfPlusTwoRules.includes(talent.BonusRule));

        //check the chosen first level talent
        let inFirstLevelTalent = listOfPlusTwoRules.includes(firstLevelTalent.BonusRule);

        return inArchetypTalents || inFirstLevelTalent;        
    }

    public static getAddPlusTwoRule(firstLevelTalent:Talent | null | undefined) : BonusRule | null {

        if (!firstLevelTalent) {
            return null;
        }

        //only first level talents have these rules
        return firstLevelTalent.BonusRule;        
    }

    public static getAbilityScoreModsFrom(
        abilityScoreRule:BonusRule | null | undefined, 
        abilityScoreRaisedByPlusTwoRule : BonusType | null,
        abilityScoreRaisedByPlusOneRule1 : BonusType | null,
        abilityScoreRaisedByPlusOneRule2 : BonusType | null,
        abilityScoreRuleAdd:BonusRule | null | undefined, 
        abilityScoreRaisedByPlusTwoRuleAdd : BonusType | null,
        abilityScoreRaisedByPlusOneRule1Add : BonusType | null,
        abilityScoreRaisedByPlusOneRule2Add : BonusType | null
        ) : { [key in BonusType]: number } {
        
        if ((!abilityScoreRule || abilityScoreRule === BonusRule.None) &&
            (!abilityScoreRuleAdd || abilityScoreRuleAdd === BonusRule.None)) {
            return {
                [BonusType.Str]: 0,
                [BonusType.Dex]: 0,
                [BonusType.Con]: 0,
                [BonusType.Int]: 0,
                [BonusType.Wis]: 0,
                [BonusType.Cha]: 0,
                [BonusType.ExpertKnowledge]: 0
            };
        }    

        let abilityScoreMods: { [key in BonusType]: number } = {
            [BonusType.Str]: 0,
            [BonusType.Dex]: 0,
            [BonusType.Con]: 0,
            [BonusType.Int]: 0,
            [BonusType.Wis]: 0,
            [BonusType.Cha]: 0,
            [BonusType.ExpertKnowledge]: 0
        };

        let plusTwoList : BonusRule[] = [BonusRule.PlusTwoToStrDexOrCon,
            BonusRule.PlusTwoToDexWisOrCha,
            BonusRule.PlusTwoToIntOrPlusOneToExpertKnowledge,
            BonusRule.PlusTwoToIntWisCon,
            BonusRule.PlusTwoToDexIntCha];

        // Apply +2 from first level talent if applicable
        if (abilityScoreRule && plusTwoList.includes(abilityScoreRule) && abilityScoreRaisedByPlusTwoRule) {
            abilityScoreMods[abilityScoreRaisedByPlusTwoRule] += 2;
        }

        // Apply +1 from pick two rules
        if (abilityScoreRaisedByPlusOneRule1) {
            abilityScoreMods[abilityScoreRaisedByPlusOneRule1] += 1;
        }
        if (abilityScoreRaisedByPlusOneRule2) {
            abilityScoreMods[abilityScoreRaisedByPlusOneRule2] += 1;
        }

        // Apply +2 from additional talent if applicable
        if (abilityScoreRuleAdd && plusTwoList.includes(abilityScoreRuleAdd) && abilityScoreRaisedByPlusTwoRuleAdd) {
            abilityScoreMods[abilityScoreRaisedByPlusTwoRuleAdd] += 2;
        }

        // Apply +1 from additional pick two rules
        if (abilityScoreRaisedByPlusOneRule1Add) {
            abilityScoreMods[abilityScoreRaisedByPlusOneRule1Add] += 1;
        }
        if (abilityScoreRaisedByPlusOneRule2Add) {
            abilityScoreMods[abilityScoreRaisedByPlusOneRule2Add] += 1;
        }

        return abilityScoreMods;
    }

    public static getAbilityScoreTypeOptions(abilityScoreRule: BonusRule | null) : BonusType[] {
        let abilityScoreTypeOptions : BonusType[] = [];
        switch (abilityScoreRule) {
            case BonusRule.PlusTwoToStrDexOrCon:
                abilityScoreTypeOptions = [BonusType.Str, BonusType.Dex, BonusType.Con];
                break;
            case BonusRule.PlusTwoToDexWisOrCha:
                abilityScoreTypeOptions = [BonusType.Dex, BonusType.Wis, BonusType.Cha];
                break;
            case BonusRule.PlusTwoToIntWisCon:
                abilityScoreTypeOptions = [BonusType.Int, BonusType.Wis, BonusType.Con];
                break;
            case BonusRule.PlusTwoToDexIntCha:
                abilityScoreTypeOptions = [BonusType.Dex, BonusType.Int, BonusType.Cha];
                break;
            case BonusRule.PickPlusTwoStats:
                abilityScoreTypeOptions = [
                    BonusType.Str,
                    BonusType.Dex,
                    BonusType.Con,
                    BonusType.Int,
                    BonusType.Wis,
                    BonusType.Cha
                ];
                break;
            case BonusRule.PlusTwoToIntOrPlusOneToExpertKnowledge:
                abilityScoreTypeOptions = [BonusType.Int, BonusType.ExpertKnowledge];
                break;
            default:
                break;
        }
        return abilityScoreTypeOptions;
    }

    public static calcHp(roll1:number, roll2:number, conMod:number, hasStout:boolean, ) : number {
        if (hasStout) {
            const higherBaseHp = Math.max(roll1, roll2);
            return Math.max(1, higherBaseHp + 2 + conMod);
        } else {
            return Math.max(1, roll1 + conMod);
        }
    }
}