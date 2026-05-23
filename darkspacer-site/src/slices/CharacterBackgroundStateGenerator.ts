import { RangedThingPicker } from "../generators/RangedThingPicker";
import { Background } from "../models/rules/Background";
import { BackgroundRepository } from "../repository/BackgroundRepository";
import { CharacterBackgroundState } from "./characterBackgroundsSlice";


export class CharacterBackgroundStateGenerator {

    public static generateNew(characterBackgroundState: CharacterBackgroundState): CharacterBackgroundState {
        const generatedCharacterBackgroundState: CharacterBackgroundState = { ...characterBackgroundState };

        generatedCharacterBackgroundState.characterBackgroundId = RangedThingPicker.Pick<Background>(BackgroundRepository.getAll())?.Id || null;

        return generatedCharacterBackgroundState;
    }
}