import { RandomNumberGenerator } from "./RandomNumberGenerator";

export class ThingPicker {
    public static Pick<T>(list: T[]): T | null {
        if (list.length === 0) {
            return null;
        }

        if (list.length === 1) {
            return list[0];
        }

        const min = 0;
        const max = list.length - 1;

        const r: RandomNumberGenerator = new RandomNumberGenerator();
        const roll = r.generate(min, max);
        let s = list[roll];        
        console.log(s);
        return s;
    }    
}