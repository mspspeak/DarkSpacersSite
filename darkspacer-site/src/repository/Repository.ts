//loads objects to a specific type

export class Repository {
    public static getAll<T>(parsedObject: any, from: (obj: any) => T): T[] {
        if (!Array.isArray(parsedObject)) {
            throw new Error('Parsed content is not an array');
        }        
        return parsedObject.map(from) as T[];
    }
}