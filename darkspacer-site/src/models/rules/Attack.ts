export class Attack {
    damage: number;
    attackBonus: number;
    damageType: string;
    range: string;
    description: string;

    constructor(damage: number, attackBonus: number, damageType: string, range: string, description: string) {
        this.damage = damage;
        this.attackBonus = attackBonus;
        this.damageType = damageType;
        this.range = range;
        this.description = description;        
    }

    public static FromObject(obj: any): Attack {
        return new Attack(
            obj.damage,
            obj.attackBonus,
            obj.damageType,
            obj.range,
            obj.description
        );
    }
}