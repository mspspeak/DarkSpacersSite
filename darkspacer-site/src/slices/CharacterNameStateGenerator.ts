import { ThingPicker } from "../generators/ThingPicker";
import { NameRepository } from "../repository/NameRepository";
import { CharacterNameState } from "./characterNameSlice";


export class CharacterNameStateGenerator {

    public static generateNew(characterNameState: CharacterNameState): CharacterNameState {
        const generatedCharacterNameState: CharacterNameState = { ...characterNameState };

        generatedCharacterNameState.name = ThingPicker.Pick<string>(NameRepository.getAll()) || 'Alf';

        return generatedCharacterNameState;
    }
}