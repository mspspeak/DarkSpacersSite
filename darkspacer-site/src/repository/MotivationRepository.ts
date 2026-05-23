//loads Motivation from the JSON file
import { Repository } from './Repository';
import { Motivation } from '../models/rules/Motivation';
import motivationData from '../data/Motivation.json'; // Assuming you have a JSON file with motivation data
export class MotivationRepository {    
    public static getAll(): Motivation[] {
        return Repository.getAll<Motivation>(motivationData, Motivation.FromObject);
    }
}