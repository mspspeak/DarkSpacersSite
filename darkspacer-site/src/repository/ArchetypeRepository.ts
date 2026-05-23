//loads Archetypes from the JSON file
import { Repository } from './Repository';
import { Archetype } from '../models/rules/Archetype';
import archetypeData from '../data/Archetype.json';

export class ArchetypeRepository {    
    public static getAll(): Archetype[] { 
        return Repository.getAll<Archetype>(archetypeData, Archetype.FromObject);
    }
}