import { AbilityScoreGenerator } from "../generators/AbilityScoreGenerator";
import { AbilityScoresState } from "./abilityScoresSlice";

export class AbilityScoreStateGenerator {

    public static generateNew(characterAbilityScores: AbilityScoresState, abilityScoreGenerator: AbilityScoreGenerator): AbilityScoresState {
        const generatedAbilityScoresState: AbilityScoresState = { ...characterAbilityScores };

        generatedAbilityScoresState.characterStr = abilityScoreGenerator.generate().value;
        generatedAbilityScoresState.characterDex = abilityScoreGenerator.generate().value;
        generatedAbilityScoresState.characterCon = abilityScoreGenerator.generate().value;
        generatedAbilityScoresState.characterInt = abilityScoreGenerator.generate().value;
        generatedAbilityScoresState.characterWis = abilityScoreGenerator.generate().value;
        generatedAbilityScoresState.characterCha = abilityScoreGenerator.generate().value;

        return generatedAbilityScoresState;
    }
}