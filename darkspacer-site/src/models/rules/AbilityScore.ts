export class AbilityScore {
    constructor(value: number) {
        this.value = value;
        //set modifier based on value
        if (value >= 10) {
            this.modifier = Math.floor((value - 10) / 2);
        }
        else {
            this.modifier = Math.ceil((value - 10) / 2);
        }        
    }
    value: number;
    modifier: number;
}