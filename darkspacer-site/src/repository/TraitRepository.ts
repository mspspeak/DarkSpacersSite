//this class fetches Species from a serialized source and provides them as an array of Species objects.
import { Repository } from './Repository';
import { Trait } from "../models/rules/Trait";
import traitData from '../data/Trait.json'; // Assuming you have a JSON file with trait data

export class TraitRepository {
    public static getAll(): Trait[] {
        return Repository.getAll<Trait>(traitData, Trait.FromObject);
    }
}