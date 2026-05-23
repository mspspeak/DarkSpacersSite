import { PDFDocument, PDFForm } from "pdf-lib";
import { CharacterState } from "../slices/characterSlice";
import { ArchetypeRepository } from "../repository/ArchetypeRepository";
import { TraitRepository } from "../repository/TraitRepository";
import { GameMath } from "./GameMath";
import { CalculatedCharacter } from "../models/view/CalculatedCharacter";
import { BonusRules } from "./BonusRules";
import { GamingLingo } from "./GamingLingo";
import { CharacterNameState } from "../slices/characterNameSlice";
import { AbilityScoresState } from "../slices/abilityScoresSlice";
import { CharacterBackgroundState } from "../slices/characterBackgroundsSlice";
import { ArchetypeState } from "../slices/archetypeSlice";
import { CharacterSpeciesState } from "../slices/characterSpeciesSlice";


export class DarkSpaceCharacterSheetLoader {
    constructor() {
        // Initialization logic if needed
    }

    private static getFieldMappingList(): [string, string][] {
        return [
            ["SPECIES","Species"],
            ["LEVEL","Level"],            
            ["Bounty","Bounty"],
            ["1","slot_1"],
            ["11","slot_11"],
            ["Reputation","Reputation"],
            ["Luck","Luck"],
            ["MOTIVATION","Motivation"],
            ["SHIP NAME","ShipName"],
            ["SHIP ROLE","ShipRole"],
            ["2","slot_2"],
            ["12","slot_12"],
            ["3","slot_3"],
            ["13","slot_13"],
            ["4","slot_4"],
            ["14","slot_14"],
            ["5","slot_5"],
            ["15","slot_15"],
            ["6","slot_6"],
            ["16","slot_16"],
            ["7","slot_7"],
            ["17","slot_17"],
            ["8","slot_8"],
            ["18","slot_18"],
            ["9","slot_9"],
            ["19","slot_19"],
            ["PLAYER","Player"],
            ["10","slot_10"],
            ["20","slot_20"],
            ["CON Mod","ConMod"],
            ["DEX Mod","DexMod"],
            ["STR Mod","StrMod"],
            ["INT Mod","IntMod"],
            ["WIS Mod","WisMod"],
            ["CHA Mod","ChaMod"],
            ["CON","Con"],
            ["DEX","Dex"],
            ["STR","Str"],
            ["INT","Int"],
            ["WIS","Wis"],
            ["CHA","Cha"],
            ["NAME","Name"],
            ["Archetype","Archetype"],
            ["Background","Background"],
            ["Max HP","HP"],
            ["TALENTS / TRAITS", "TalentsTraits"],
            ["CREDITS", "characterCreds"]
        ]
    }

    private static getModifier = (score: number): string => {
       return GameMath.AbilityScoreToModifierString(score);
    }

    private static buildTalentsTraitsString(calc: CalculatedCharacter): string {
        const Archetype = ArchetypeRepository.getAll().find(a => a.Id === calc.archetypeId!)
        const talentsTraitsList: string[] = [];

        if (calc.selectedBackground) {
            talentsTraitsList.push(`${calc.selectedBackground?.Name || ''}: ${calc.selectedBackground?.Description || ''}`);
            talentsTraitsList.push("");
        }

        if (Archetype) {
            talentsTraitsList.push(`Archetype: ${Archetype.Name}`);
            Archetype.Talents.forEach(talent => {
                talentsTraitsList.push(`${talent.Name} - ${talent.Description}`);
            });
            
            const firstLevelTalent = Archetype.FirstLevelTalents.find(t => t.Id === calc.archetypeTalentId!)
            if (firstLevelTalent) {                
                if (BonusRules.hasAddPlusTwoRule(Archetype, firstLevelTalent)) {
                    talentsTraitsList.push(`${firstLevelTalent.Name} - ${firstLevelTalent.Description} (${GamingLingo.getBonusNameFromString(calc.abilityScoreRaisedByPlusTwoRule)})`);
                } else if (BonusRules.hasPickPlusTwoStatsRule(Archetype, firstLevelTalent)) {
                    talentsTraitsList.push(`${firstLevelTalent.Name} - ${firstLevelTalent.Description} (${GamingLingo.getBonusNameFromString(calc.abilityScoreRaisedByPlusOneRule1)} and ${GamingLingo.getBonusNameFromString(calc.abilityScoreRaisedByPlusOneRule2)})`);
                } else {
                    talentsTraitsList.push(`${firstLevelTalent.Name} - ${firstLevelTalent.Description}`);
                }
            }

            const firstLevelTalentAdd = Archetype.FirstLevelTalents.find(t => t.Id === calc.archetypeTalentAddId!)
            if (firstLevelTalentAdd) {                
                if (BonusRules.hasAddPlusTwoRule(Archetype, firstLevelTalentAdd)) {
                    talentsTraitsList.push(`${firstLevelTalentAdd.Name} - ${firstLevelTalentAdd.Description} (${GamingLingo.getBonusNameFromString(calc.abilityScoreRaisedByPlusTwoRuleAdd)})`);
                } else if (BonusRules.hasPickPlusTwoStatsRule(Archetype, firstLevelTalentAdd)) {
                    talentsTraitsList.push(`${firstLevelTalentAdd.Name} - ${firstLevelTalentAdd.Description} (${GamingLingo.getBonusNameFromString(calc.abilityScoreRaisedByPlusOneRule1Add)} and ${GamingLingo.getBonusNameFromString(calc.abilityScoreRaisedByPlusOneRule2Add)})`);
                } else {
                    talentsTraitsList.push(`${firstLevelTalentAdd.Name} - ${firstLevelTalentAdd.Description}`);
                }
            }
        }
        talentsTraitsList.push("");
        if (calc.characterSpeciesName && calc.characterSpeciesDescriptions) {
            const descriptions = calc.characterSpeciesDescriptions.join(' ');
            talentsTraitsList.push(`${calc.characterSpeciesName} - ${descriptions}`);
        }
        const Trait = TraitRepository.getAll().find(b => b.Id === calc.characterSpeciesTraitId!)
        if (Trait) {
            talentsTraitsList.push(`${Trait.Name} - ${Trait.Description}`);
        }
        if (calc.selectedMotivation) {
            talentsTraitsList.push("");
            talentsTraitsList.push(`${calc.selectedMotivation?.Name || ''}: ${calc.selectedMotivation?.Description || ''}`);
        }

        const talentsTraitsString = talentsTraitsList.join('\n');
        return talentsTraitsString;
    }

    public static async fillPdfForm(pdfBytes: string | ArrayBuffer | Uint8Array<ArrayBufferLike>, 
        characterState: CharacterState,
        characterName: CharacterNameState,
        abilityScoreState: AbilityScoresState,
        characterBackgroundState : CharacterBackgroundState,
        characterSpeciesState: CharacterSpeciesState,
        archetypeState: ArchetypeState
    ): Promise<Uint8Array> {
        const pdfDoc : PDFDocument = await PDFDocument.load(pdfBytes)
        const form : PDFForm = pdfDoc.getForm()

        const calc = new CalculatedCharacter(
            characterState, 
            characterName, 
            abilityScoreState,
            characterBackgroundState,
            characterSpeciesState,
            archetypeState
        );    

        const formData = {           
          Species: calc.characterSpeciesName, 
          Level: '1', 
          XP: '', 
          Bounty: '', 
          slot_1: calc.hasStarterGear ? 'Backpack' : '', 
          slot_11: '', 
          Reputation: '', 
          Luck: '', 
          Motivation: calc.selectedMotivation?.Name || '', 
          ShipName: '', 
          ShipRole: '', 
          slot_2: calc.hasStarterGear ? 'Cable, Synthetic' : '', 
          slot_12: '', 
          slot_3: calc.hasStarterGear ? 'CredStick' : '', 
          slot_13: '', 
          slot_4: calc.hasStarterGear ? 'Energy Cells (2)' : '', 
          slot_14: '', 
          slot_5: calc.hasStarterGear ? 'Glowrod' : '', 
          slot_15: '', 
          slot_6: calc.hasStarterGear ? 'Grapple' : '', 
          slot_16: '', 
          slot_7: calc.hasStarterGear ? 'Rations (3 pack)' : '', 
          slot_17: '', 
          slot_8: '', 
          slot_18: '', 
          slot_9: '', 
          slot_19: '', 
          Player: '', 
          slot_10: '', 
          slot_20: '', 
          ConMod: calc.modifiedConstitution != 0 ? this.getModifier(calc.modifiedConstitution) : '',
          DexMod: calc.modifiedDexterity != 0 ? this.getModifier(calc.modifiedDexterity) : '',
          StrMod: calc.modifiedStrength != 0 ? this.getModifier(calc.modifiedStrength) : '',
          IntMod: calc.modifiedIntelligence != 0 ? this.getModifier(calc.modifiedIntelligence) : '',
          WisMod: calc.modifiedWisdom != 0 ? this.getModifier(calc.modifiedWisdom) : '',
          ChaMod: calc.modifiedCharisma != 0 ? this.getModifier(calc.modifiedCharisma) : '',
          Con: calc.modifiedConstitution != 0 ? calc.modifiedConstitution?.toString() : '',
          Dex: calc.modifiedDexterity != 0 ? calc.modifiedDexterity?.toString() : '',
          Str: calc.modifiedStrength != 0 ? calc.modifiedStrength?.toString() : '',
          Int: calc.modifiedIntelligence != 0 ? calc.modifiedIntelligence?.toString() : '',
          Wis: calc.modifiedWisdom != 0 ? calc.modifiedWisdom?.toString() : '',
          Cha: calc.modifiedCharisma != 0 ? calc.modifiedCharisma?.toString() : '',
          Name: calc.characterName?.toString(),
          Archetype: calc.selectedArchetype?.Name || '',
          Background: calc.selectedBackground?.Name || '',
          HP: calc.rolledHitPoints != 0 ? `Max HP: ${calc.totalHitPoints}` : '',
          TalentsTraits: this.buildTalentsTraitsString(calc) || '',
          characterCreds: calc.characterCreds?.toString() || ''
        }

        const fieldMappings = this.getFieldMappingList()
            
        for (const [pdfFieldName, formDataKey] of fieldMappings) {
            const field = form.getTextField(pdfFieldName)
            field.setText((formData as any)[formDataKey] || "")
        }


        // Example: Populate a text field
        //const nameField = form.getTextField('STR'); // Assuming 'nameField' is the field name
        //nameField.setText(formData.Str);

        // Example: Populate a checkbox
        // const checkboxField = form.getCheckBox('consentCheckbox'); // Assuming 'consentCheckbox'
        // if (formData.consent) {
        //   checkboxField.check();
        // } else {
        //   checkboxField.uncheck();
        // }

        const modifiedPdfBytes = await pdfDoc.save();
        return modifiedPdfBytes;
    }
}

