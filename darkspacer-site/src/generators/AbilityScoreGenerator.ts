import { AbilityScore } from "../models/rules/AbilityScore";
import { NumberGenerator } from "./NumberGenerator";

enum AbilityScoreRollType {
    Standard = 'Standard',
    RollFourDropLowest = 'RollFourDropLowest'
}

class AbilityScoreGenerator {
    constructor(public numberGenerator: NumberGenerator, public abilityScoreRollType: AbilityScoreRollType) {
        this.numberGenerator = numberGenerator;
        this.abilityScoreRollType = abilityScoreRollType;
    }

    generate(): AbilityScore {
        switch (this.abilityScoreRollType) {
            case AbilityScoreRollType.Standard:
                return this.generateStandard()
            case AbilityScoreRollType.RollFourDropLowest:
                return this.generateRollFourDropLowest();
            default:
                throw new Error("Invalid ability score roll type");
        }
    }
    
    generateStandard(): AbilityScore {        
        let roll1 = this.numberGenerator.generate(1, 6);
        let roll2 = this.numberGenerator.generate(1, 6);
        let roll3 = this.numberGenerator.generate(1, 6);
        return new AbilityScore(roll1 + roll2 + roll3);
    }

    generateRollFourDropLowest(): AbilityScore {        
        let rolls = [this.numberGenerator.generate(1, 6),
            this.numberGenerator.generate(1, 6),
            this.numberGenerator.generate(1, 6),
            this.numberGenerator.generate(1, 6)];
        rolls.sort((a, b) => b - a); // Sort rolls in descending order        
        rolls.pop(); // Remove the lowest roll        
        return new AbilityScore(rolls.reduce((a, b) => a + b, 0));
    }
}

export { AbilityScoreGenerator, AbilityScoreRollType };
