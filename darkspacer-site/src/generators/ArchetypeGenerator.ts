import { Archetype } from "../models/rules/Archetype";
import { NumberGenerator } from "./NumberGenerator";
import { Talent } from "../models/rules/Talent";
import { ArchetypeRepository } from "../repository/ArchetypeRepository";

export class ArchetypeGenerator {
    public constructor(public numberGenerator: NumberGenerator) {        
        this.ArcheTypes = ArchetypeRepository.getAll();
    }

    public ArcheTypes: Archetype[];

    /**
     * Generates an Archetype object with default values.
     * @returns {Archetype} A new Archetype instance.
     */
    generate(): Archetype {                
        if (this.ArcheTypes.length === 0) {
            throw new Error("No archetypes available to generate.");
        }
        if (this.numberGenerator === null || this.numberGenerator === undefined) {
            throw new Error("Number generator is not initialized.");
        }
        // Randomly select an archetype from the list
        const randomIndex = this.numberGenerator.generate(0, this.ArcheTypes.length - 1);
        const archetype = this.ArcheTypes[randomIndex];
        if (!archetype) { 
            throw new Error(`Archetype not found at index ${randomIndex}`);
        }
        return archetype;
    }

    /**
     * Selects a talent from the provided range based on the roll.
     * @param {TalentTrait[]} talents - The list of talents to choose from.
     * @param {number} roll - The roll value to determine which talent to select.
     * @returns {TalentTrait} The selected talent.
     */
    selectTalentFromRange(talents: Talent[], roll: number): Talent {
        // Filter talents based on the roll range
        console.log(talents, roll);
        const rolledTalents = talents.filter(talent => {
            return talent.RollMin <= roll && roll <= talent.RollMax
        });
        if (rolledTalents.length === 0) {
            throw new Error(`No talents found for roll: ${roll}, ${talents}`);
        }
        if (rolledTalents.length > 1) {
            throw new Error(`More than one talent found for roll: ${roll}`);
        }
        return rolledTalents[0];
    }
}