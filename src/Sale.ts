export class Sale{

    constructor(
        private zone: string,
        private store: string,
        private salesman: string,
        private date: string
    ){}

    public getZone(): string {
        return this.zone;
    }

    public getStore(): string {
        return this.store;
    }

    public getSalesMan(): string {
        return this.salesman;
    }

    public getYear(): number {
        const [, , year] = this.date.split('/');
        return Number(year);
    }

}