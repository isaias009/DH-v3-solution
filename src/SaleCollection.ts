import { Sale } from "./Sale.ts";
import { Csvjson, SelectMethod, GroupType } from "./CustomType.ts";

export class SaleCollection {

    private colleccion: Map<number, Sale>;

    constructor(){
        this.colleccion = new Map();
    }

    public setSales(CvsCollection: Array<Csvjson>): void{
        CvsCollection.forEach((item: Csvjson, index: number) => {
            const sale = new Sale(item.Zone, item.Store, item['Salesman name'], item.Date);
            this.colleccion.set(index, sale);
        });
    }

    public getSales(): Array<Sale> {
        let list = new Array<Sale>;
        this.colleccion.forEach((item: Sale) => {
            list = [...list, item];
        });
        return list;
    }

    public groupBy(key: keyof SelectMethod, yearIni: number, yearFin: number): GroupType{
        let totalSales = 0;
        const forDate = this.filterForDate(yearIni, yearFin);
        const group = this.noRepeatBy(key, yearIni, yearFin).map((cp) => {
            let sales = 0;
            let year: number | undefined;
            forDate.forEach((item) => {
                if(this.selectMethod(item, key) === cp){
                    sales++;
                    totalSales++;
                    year = item.getYear();
                }
            });
            return { title: cp, sales, year };
        });
        return { group, totalSales };
    }

    private filterForDate(yearIni: number, yearFin: number): Array<Sale>{
        return this.getSales().filter((item) => {
            return (
                item.getYear() >= yearIni 
                && item.getYear() <= yearFin
            );
        });
    }

    private noRepeatBy(key: keyof SelectMethod, yearIni: number, yearFin: number): Array<string | undefined>{
        const keys = this.filterForDate(yearIni, yearFin).map((item) => this.selectMethod(item, key));
        return keys.filter((item, index) => index === keys.indexOf(item));
    }

    private selectMethod(item: Sale, key: keyof SelectMethod): string | undefined{
        const option: SelectMethod = {
            'zone': item.getZone(),
            'store': item.getStore(),
            'salesman': item.getSalesMan()
        }
        return option[key];
    }
}