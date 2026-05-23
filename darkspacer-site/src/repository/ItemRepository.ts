//Loads Items from Json files in the repository
import { Repository } from './Repository';
import { Item } from '../models/rules/Item';
import itemData from '../data/Item.json'; // Assuming you have a JSON file with item data

export class ItemRepository {   
    public static getAll(): Item[] {
        return Repository.getAll<Item>(itemData, Item.FromObject);
    }    
}