export class Background {
    Id: number;
    Name: string;
    Description: string;
    RollMin: number;
    RollMax: number;

    constructor(id: number, name: string, description: string, rollMin: number, rollMax: number) {
        this.Id = id;
        this.Name = name;
        this.Description = description;
        this.RollMin = rollMin;
        this.RollMax = rollMax;
    }

    public static FromObject(obj: any): Background {
        return new Background(
            obj.id,
            obj.name,
            obj.description,
            obj.rollMin,
            obj.rollMax
        );
    }
}