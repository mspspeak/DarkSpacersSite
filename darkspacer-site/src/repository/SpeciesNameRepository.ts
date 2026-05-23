//class for fetching Species Names
import { Repository } from './Repository';
import nameData from '../data/SpeciesNames.json'

export class SpeciesNameRepository {
    public static getAll(): string[] {
        return Repository.getAll<string>(nameData, (obj) => obj);
    }   
}