export class WeaponProperties {
    OneHandedDamage: number
    TwoHandedDamage: number        
    Category: string
    Range: string[]
    Properties: string[]

    constructor(
        oneHandedDamage: number,
        twoHandedDamage: number,        
        category: string,
        range: string[],
        properties: string[]
    ) {
        this.OneHandedDamage = oneHandedDamage;
        this.TwoHandedDamage = twoHandedDamage;
        this.Category = category;
        this.Range = range;
        this.Properties = properties;        
    }

    public static FromObject(obj: any): WeaponProperties {
        return new WeaponProperties(
            obj.oneHandedDamage,
            obj.twoHandedDamage,
            obj.category,
            obj.range,
            obj.properties
        );
    }
}