import { RangedThing } from "./RangedThing";
import { BonusRule } from "./BonusRule";
import { HitPointRule } from "./HitPointRule";

export class Trait extends RangedThing {
    public AbilityScoreRule: BonusRule;
    public HitPointRule: HitPointRule;

    constructor(id: number, name: string, description: string, abilityScoreRule: BonusRule, hitPointRule: HitPointRule, rollMin: number, rollMax: number) {
        super(id, name, description, rollMin, rollMax);
        this.AbilityScoreRule = abilityScoreRule;
        this.HitPointRule = hitPointRule;
    }

    public static FromObject(obj: any): Trait {
        return new Trait(
            obj.id,
            obj.name,
            obj.description,
            obj.abilityScoreRule,
            obj.hitPointRule,
            obj.rollMin,
            obj.rollMax
        );
    }
}