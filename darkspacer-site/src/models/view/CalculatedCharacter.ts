import { ArchetypeRepository } from "../../repository/ArchetypeRepository";
import { BackgroundRepository } from "../../repository/BackgroundRepository";
import { TraitRepository } from "../../repository/TraitRepository";
import { CharacterState } from "../../slices/characterSlice";
import { BonusRules } from "../../utils/BonusRules";
import { BonusType } from "../rules/BonusType";
import { Archetype } from "../rules/Archetype";
import { Background } from "../rules/Background";
import { HitPointRule } from "../rules/HitPointRule";
import { Trait } from "../rules/Trait";
import { Talent } from "../rules/Talent";
import { Motivation } from "../rules/Motivation";
import { MotivationRepository } from "../../repository/MotivationRepository";
import { GameMath } from "../../utils/GameMath";
import { CharacterNameState } from "../../slices/characterNameSlice";
import { AbilityScoresState } from "../../slices/abilityScoresSlice";
import { CharacterBackgroundState } from "../../slices/characterBackgroundsSlice";
import { CharacterSpeciesState } from "../../slices/characterSpeciesSlice";
import { ArchetypeState } from "../../slices/archetypeSlice";

export class CalculatedCharacter {

    characterName: string = '';
    characterSpeciesName: string = '';
    characterSpeciesDescriptions: string[] = [];    

    backgroundId: number | null;
    selectedBackground: Background | null;
    characterSpeciesTraitId: number | null;
    selectedCharacterSpeciesTrait: Trait | null;

    archetypeId: number | null;
    archetypeTalentId: number | null;
    archetypeTalentAddId: number | null;
    hitPoints: number;
    hitPoints2: number;
    rolledHitPoints: number;
    totalHitPoints: number;
    selectedArchetype: Archetype | null;
    selectedArchetypeFirstLevelTalents: Talent[];
    selectedArchetypeTalents: Talent[];
    selectedArchetypeFirstLevelTalent: Talent | null | undefined;
    selectedArchetypeFirstLevelTalentAdd: Talent | null | undefined;
    hasStout: boolean;
    abilityScoreMods: { [key in BonusType]: number };
    modifiedStrength!: number;
    strMod!: number;
    modifiedDexterity!: number;
    dexMod!: number;
    modifiedConstitution!: number;
    conMod!: number;
    modifiedIntelligence!: number;
    intMod!: number;
    modifiedWisdom!: number;
    wisMod!: number;
    modifiedCharisma!: number;
    chaMod!: number;
    motivationId: number | null;
    selectedMotivation: Motivation | null;

    abilityScoreRaisedByPlusTwoRule : BonusType | null;
    abilityScoreRaisedByPlusOneRule1 : BonusType | null;
    abilityScoreRaisedByPlusOneRule2 : BonusType | null;

    abilityScoreRaisedByPlusTwoRuleAdd : BonusType | null;
    abilityScoreRaisedByPlusOneRule1Add : BonusType | null;
    abilityScoreRaisedByPlusOneRule2Add : BonusType | null;

    characterCreds: number;
    hasStarterGear: boolean;

    constructor(
      character: CharacterState, 
      characterName: CharacterNameState,
      characterAbilityScores: AbilityScoresState,
      characterBackgroundState: CharacterBackgroundState,
      characterSpeciesState: CharacterSpeciesState,
      archetypeState: ArchetypeState
    ) {

        this.characterName = characterName.name;
        this.characterSpeciesName = characterSpeciesState.characterSpeciesName;
        this.characterSpeciesDescriptions = characterSpeciesState.characterSpeciesDescriptions || [];

        this.backgroundId = characterBackgroundState.characterBackgroundId;
        const backgrounds = BackgroundRepository.getAll();
        this.selectedBackground = backgrounds.find((bg) => bg.Id === this.backgroundId) || null;
        

        this.characterSpeciesTraitId = characterSpeciesState.characterSpeciesTraitId;
        const speciesTraitList = TraitRepository.getAll();
        this.selectedCharacterSpeciesTrait = speciesTraitList.find((sp) => sp.Id === this.characterSpeciesTraitId) || null;
        
        this.archetypeId = archetypeState.archetypeId;
        this.archetypeTalentId = archetypeState.archetypeTalentId;
        this.archetypeTalentAddId = archetypeState.archetypeTalentAddId;
        this.hitPoints = archetypeState.hitPoints;
        this.hitPoints2 = archetypeState.hitPoints2;
        const archetypes = ArchetypeRepository.getAll();  
        this.selectedArchetype = archetypes.find((archetype : Archetype ) => archetype.Id === this.archetypeId) || null;
        this.selectedArchetypeFirstLevelTalents = this.selectedArchetype ? this.selectedArchetype.FirstLevelTalents : [];
        this.selectedArchetypeTalents = this.selectedArchetype ? this.selectedArchetype.Talents : [];        
        this.selectedArchetypeFirstLevelTalent = this.archetypeTalentId ? this.selectedArchetypeFirstLevelTalents.find(talent => talent.Id === this.archetypeTalentId) : null;  
        this.selectedArchetypeFirstLevelTalentAdd = this.archetypeTalentAddId ? this.selectedArchetypeFirstLevelTalents.find(talent => talent.Id === this.archetypeTalentAddId) : null;  
        
          // If the selected archetype or the archectype first level talent has the Stout hit point rule,
        this.hasStout = this.selectedArchetype?.Talents.some(talent => talent.HitPointRule === HitPointRule.Stout) ||
          this.selectedArchetypeFirstLevelTalent?.HitPointRule === HitPointRule.Stout;

        this.rolledHitPoints = this.hasStout ? Math.max(this.hitPoints, this.hitPoints2) + 2 : this.hitPoints;
        
        this.abilityScoreMods = BonusRules.getAbilityScoreModsFrom(
            this.selectedArchetypeFirstLevelTalent?.BonusRule || null,    
            archetypeState.abilityScoreRaisedByPlusTwoRule,
            archetypeState.abilityScoreRaisedByPlusOneRule1,
            archetypeState.abilityScoreRaisedByPlusOneRule2,
            this.selectedArchetypeFirstLevelTalentAdd?.BonusRule || null,    
            archetypeState.abilityScoreRaisedByPlusTwoRuleAdd,
            archetypeState.abilityScoreRaisedByPlusOneRule1Add,
            archetypeState.abilityScoreRaisedByPlusOneRule2Add
            );
    
        this.abilityScoreRaisedByPlusTwoRule = archetypeState.abilityScoreRaisedByPlusTwoRule;
        this.abilityScoreRaisedByPlusOneRule1 = archetypeState.abilityScoreRaisedByPlusOneRule1;
        this.abilityScoreRaisedByPlusOneRule2 = archetypeState.abilityScoreRaisedByPlusOneRule2;
        
        this.abilityScoreRaisedByPlusTwoRuleAdd = archetypeState.abilityScoreRaisedByPlusTwoRuleAdd;
        this.abilityScoreRaisedByPlusOneRule1Add = archetypeState.abilityScoreRaisedByPlusOneRule1Add;
        this.abilityScoreRaisedByPlusOneRule2Add = archetypeState.abilityScoreRaisedByPlusOneRule2Add;

        this.modifiedStrength = characterAbilityScores.characterStr + (this.abilityScoreMods.Str || 0);
        this.strMod = GameMath.AbilityScoreToModifier(this.modifiedStrength);  
    
        this.modifiedDexterity = characterAbilityScores.characterDex + (this.abilityScoreMods.Dex || 0);
        this.dexMod = GameMath.AbilityScoreToModifier(this.modifiedDexterity);
    
        this.modifiedConstitution = characterAbilityScores.characterCon + (this.abilityScoreMods.Con || 0);
        this.conMod = GameMath.AbilityScoreToModifier(this.modifiedConstitution);  
    
        this.modifiedIntelligence = characterAbilityScores.characterInt + (this.abilityScoreMods.Int || 0);
        this.intMod = GameMath.AbilityScoreToModifier(this.modifiedIntelligence);
    
        this.modifiedWisdom = characterAbilityScores.characterWis + (this.abilityScoreMods.Wis || 0);
        this.wisMod = GameMath.AbilityScoreToModifier(this.modifiedWisdom);
    
        this.modifiedCharisma = characterAbilityScores.characterCha + (this.abilityScoreMods.Cha || 0);
        this.chaMod = GameMath.AbilityScoreToModifier(this.modifiedCharisma);
    
        this.motivationId = character.characterMotivationId;
        const motivations = MotivationRepository.getAll();
        this.selectedMotivation = motivations.find((mot) => mot.Id === this.motivationId) || null;

        this.totalHitPoints = BonusRules.calcHp(this.hitPoints, this.hitPoints2, this.conMod, this.hasStout);  

        this.characterCreds = character.characterCreds || 0;
        this.hasStarterGear = character.hasStarterGear || false;
    }
}