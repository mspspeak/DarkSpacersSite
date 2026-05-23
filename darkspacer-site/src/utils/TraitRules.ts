import { TraitRepository } from "../repository/TraitRepository";
import { CharacterSpeciesState } from "../slices/characterSpeciesSlice";

export class TraitRules {
    public static isAmbitious(characterSpeciesState: CharacterSpeciesState): boolean {  
        let characterSpeciesTraitIsAmbitious = false;
        if (characterSpeciesState.characterSpeciesTraitId) {
            const trait = TraitRepository.getAll().find(t => t.Id === characterSpeciesState.characterSpeciesTraitId);
            if (trait && trait.Name === 'Ambitious') {
                // used in summary
                characterSpeciesTraitIsAmbitious = true;
            }
        } 
        return characterSpeciesTraitIsAmbitious;
    }
}
