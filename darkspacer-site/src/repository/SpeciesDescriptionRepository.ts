//class for fetching SpeciesDescription 
import { Repository } from './Repository';
import data from '../data/SpeciesDescriptions.json'

export class SpeciesDescriptionRepository {
    public static getAll(): string[] {
        return Repository.getAll<string>(data, (obj) => obj);
    }   
}