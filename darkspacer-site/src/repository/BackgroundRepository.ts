//class for fetching Backgrounds 
import { Repository } from './Repository';
import { Background } from '../models/rules/Background';
import backgroundData from '../data/Background.json'

export class BackgroundRepository {
    public static getAll(): Background[] {
        return Repository.getAll<Background>(backgroundData, Background.FromObject);
    }   
}
