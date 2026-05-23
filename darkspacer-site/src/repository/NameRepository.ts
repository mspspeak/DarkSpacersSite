//class for fetching Backgrounds 
import { Repository } from './Repository';
import nameData from '../data/Names.json'

export class NameRepository {
    public static getAll(): string[] {
        return Repository.getAll<string>(nameData, (obj) => obj);
    }   
}