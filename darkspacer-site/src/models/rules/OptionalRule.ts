import { Talent } from "./Talent"

export class OptionalRule {
    Id: number;
    Name: string;
    AlternateFirstLevelTalentReplacesId: number | null;
    AlternateFirstLevelTalent: Talent | null;
    AlternateTalentReplacesId: number | null;
    AlternateTalent: Talent | null;

    constructor(
        id: number,
        name: string,
        alternateFirstLevelTalentReplacesId: number | null, 
        alternateFirstLevelTalent: Talent | null,
        alternateTalentReplacesId: number | null,
        alternateTalent: Talent | null) {
        this.Id = id;
        this.Name = name;     
        this.AlternateFirstLevelTalentReplacesId = alternateFirstLevelTalentReplacesId,
        this.AlternateFirstLevelTalent = alternateFirstLevelTalent;   
        this.AlternateTalentReplacesId = alternateTalentReplacesId;
        this.AlternateTalent = alternateTalent;                      
    }

    public static FromObject(obj: any): OptionalRule {
        return new OptionalRule(
            obj.id,
            obj.name, 
            obj.alternateFirstLevelTalentReplacesId,
            obj.alternateFirstLevelTalent ? Talent.FromObject(obj.alternateFirstLevelTalent) : null,
            obj.alternateTalentReplacesId,
            obj.alternateTalent ? Talent.FromObject(obj.alternateTalent) : null
        );
    }    
}
