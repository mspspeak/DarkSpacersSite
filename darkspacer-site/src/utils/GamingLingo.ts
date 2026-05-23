import { BonusType } from "../models/rules/BonusType";

export class GamingLingo {
    public static getRangeText(rollMin: number, rollMax: number): string {

        if (rollMin === rollMax) {
            return `${rollMin}`;
        }
        return `${rollMin} - ${rollMax}`;
    }

    public static getBonusName(bonusType: BonusType): string {
        switch (bonusType) {
            case BonusType.Str:
                return "Strength";
            case BonusType.Dex:
                return "Dexterity";
            case BonusType.Con:
                return "Constitution";
            case BonusType.Int:
                return "Intelligence";
            case BonusType.Wis:
                return "Wisdom";
            case BonusType.Cha:
                return "Charisma";
            case BonusType.ExpertKnowledge:
                return "Expert Knowledge";
            default:
                return "";
        }
    }

    public static getBonusNameFromString(bonusType: string | null): string {
        if (!bonusType) {
            return "";
        }
        return this.getBonusName(bonusType as BonusType);
    }
}