import { WeaponProperties } from "./WeaponProperties";
import { ArmorProperties } from "./ArmorProperties";

export class Item {
    Id: number;
    Name: string;
    Description: string;
    Type: string;       
    Weight: number;
    Value: number;
    WeaponProperties: WeaponProperties;
    ArmorProperties: ArmorProperties;
    IsFreeToCarry: boolean;
    GearSlots: number; // Default to 0, can be set later if needed
    PerGearSlot: number; // Default to 0, can be set later if needed

    constructor(
        id: number,
        name:string, 
        description:string, 
        type:string, 
        weight:number, 
        value:number, 
        gearSlots: number,
        perGearSlot: number,
        isFreeToCarry: boolean,
        armorProperties: ArmorProperties, 
        weaponProperties: WeaponProperties) {
        this.Id = id;
        this.Name = name;
        this.Description = description;
        this.Type = type;
        this.Weight = weight;
        this.Value = value;                
        this.GearSlots = gearSlots;
        this.PerGearSlot = perGearSlot;
        this.IsFreeToCarry = isFreeToCarry; 
        this.WeaponProperties = weaponProperties;
        this.ArmorProperties = armorProperties;
        
    }
    
    
    public static FromObject(obj: any): Item {
        return new Item(
            obj.id,
            obj.name,
            obj.description,
            obj.type,
            obj.weight,
            obj.value,
            obj.gearSlots,
            obj.perGearSlot,
            obj.isFreeToCarry,
            ArmorProperties.FromObject(obj.armorProperties),
            WeaponProperties.FromObject(obj.weaponProperties)
        );
    }
}