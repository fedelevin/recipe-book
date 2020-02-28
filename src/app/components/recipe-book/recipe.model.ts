export class Recipe {
    public name: string;
    public description: string;
    public imagePath: string;

    constructor(name: string, description: string, imagePath: string) {
        this.setName(name);
        this.setDescription(description);
        this.setImagePath(imagePath);
    }

    private setName(name: string): void {
        this.name = name;
    }

    private setDescription(description: string): void {
        this.description = description;
    }

    private setImagePath(imagePath: string): void {
        this.imagePath = imagePath;
    }
    
}