import { Talent } from "./Talent"
import { OptionalRule } from "./OptionalRule"

export class Archetype {
    Id: number;
    Name: string;
    Description: string;
    Talents: Talent[];
    FirstLevelTalents: Talent[];
    Weapons: string;
    ArmorAllowed: string;    
    HitPointDie: number;
    OptionalRules: OptionalRule[];

    constructor(
        id: number,
        name: string, 
        description: string,
        talents: Talent[], 
        firstLevelTalents: Talent[],
        weapons: string, 
        armorAllowed: string, 
        hitPointDie: number,
        optionalRules: OptionalRule[]) {
        this.Id = id;
        this.Name = name;     
        this.Description = description;   
        this.Talents = talents;                      
        this.FirstLevelTalents = firstLevelTalents;
        this.Weapons = weapons;
        this.ArmorAllowed = armorAllowed;
        this.HitPointDie = hitPointDie;
        this.OptionalRules = optionalRules;
    }

    public static FromObject(obj: any): Archetype {                
        return new Archetype(
            obj.id,
            obj.name, 
            obj.description,
            obj.talents.map(Talent.FromObject), 
            obj.firstLevelTalents.map(Talent.FromObject),                
            obj.weapons, 
            obj.armorAllowed, 
            obj.hitPointDie,
            obj.optionalRules.map(OptionalRule.FromObject)
        );
    }   
}