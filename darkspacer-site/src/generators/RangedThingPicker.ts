// class that can randomly pick a ranged thing
import { RangedThing } from "../models/rules/RangedThing";
import { RandomNumberGenerator } from "./RandomNumberGenerator";

export class RangedThingPicker {
    public static Pick<T extends RangedThing>(list: T[]): T | null {
        if (list.length === 0) {
            return null;
        }

        const min = list.reduce((min, rt) => Math.min(min, rt.RollMin), Infinity)
        const max = list.reduce((max, rt) => Math.max(max, rt.RollMax), -Infinity)

        const r: RandomNumberGenerator = new RandomNumberGenerator();
        const roll = r.generate(min, max);

        // Find the first item where the roll is within the range
        for (const item of list) {
            if (roll >= item.RollMin && roll <= item.RollMax) {
                return item;
            }
        }

        // If no item matches, return null
        return null;
    }    
}