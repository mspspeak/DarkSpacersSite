export class ArmorProperties {
    public ArmorClass: number
    public Properties: string[]

    constructor(    
        armorClass: number,
        properties: string[]
    ) {
        this.ArmorClass = armorClass;
        this.Properties = properties;
    }

    public static FromObject(obj: any): ArmorProperties {
        return new ArmorProperties(
            obj.armorClass,
            obj.properties
        );
    }
}