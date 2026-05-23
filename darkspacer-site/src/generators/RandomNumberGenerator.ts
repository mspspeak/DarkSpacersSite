import { NumberGenerator } from "./NumberGenerator";

class RandomNumberGenerator implements NumberGenerator {    
    generate(min: number, max: number): number {
        if (min >= max) {
            throw new Error("Min must be less than max");
        }
        if (min < 0 || max < 0) {
            throw new Error("Min and max must be non-negative");
        }
        // Generate a random number between min (inclusive) and max (exclusive) 
        // Math.random() generates a number between 0 (inclusive) and 1 (exclusive)
        // We scale it to the range [min, max) by multiplying by (max - min) and adding min
        // Math.floor is used to round down to the nearest whole number
        // This ensures that the generated number is always within the specified range
        if (max - min <= 0) {
            throw new Error("Range must be greater than zero");
        }
        if (!Number.isInteger(min) || !Number.isInteger(max)) {
            throw new Error("Min and max must be integers");
        }
        return Math.floor(Math.random() * ((max + 1) - min)) + min;
    }
}
export { RandomNumberGenerator };