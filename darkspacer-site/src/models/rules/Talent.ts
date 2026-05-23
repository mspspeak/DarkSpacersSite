import { RangedThing } from "./RangedThing";
import { BonusRule } from "./BonusRule";
import { HitPointRule } from "./HitPointRule";

export class Talent extends RangedThing {
    public BonusRule: BonusRule;
    public HitPointRule: HitPointRule;

    constructor(id: number, name: string, description: string, abilityScoreRule: BonusRule, hitPointRule: HitPointRule, rollMin: number, rollMax: number) {
        super(id, name, description, rollMin, rollMax);
        this.BonusRule = abilityScoreRule;
        this.HitPointRule = hitPointRule;
    }

    public static FromObject(obj: any): Talent {
        return new Talent(
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