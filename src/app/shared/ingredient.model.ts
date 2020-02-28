export class Ingredient {
    public name: string;
    public amount: number;

    constructor(name: string, amount: number) {
        this.setName(name);
        this.setAmount(amount);
    }

    private setName(name: string): void {
        this.name = name;
    }

    private setAmount(amount: number): void {
        this.amount = amount;
    }
}