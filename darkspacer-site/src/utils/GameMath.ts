
export class GameMath {
    public static AbilityScoreToModifier(score: number): number {      
        return Math.floor((score - 10) / 2);      
    }

    public static AbilityScoreToModifierString(score: number): string {
        const modifier = this.AbilityScoreToModifier(score);
        return modifier >= 0 ? `+${modifier}` : `${modifier}`;
    }
}