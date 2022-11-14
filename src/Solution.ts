import { SaleCollection } from './SaleCollection.ts';
import { AvgType, ResType } from './CustomType.ts';
import csvjson from '../api/csvjson.json' assert {type: "json"};

export class Solution {

    private collection: SaleCollection;

    constructor(){
        this.collection = new SaleCollection();
        this.collection.setSales(csvjson);
    }

    public static toString(): void{
        const sol = new Solution();
        
        console.log("\nEl promedio de ventas por zona en el periodo 2020 - 2022");
        console.table(sol.avgZone());

        console.log("\n\nQue tienda deberia cerrarse en base menor cantidad de ventas acumuladas del 2020 al 2022");
        console.table(sol.closeShop());

        console.log("\n\nEl mejor vendedor del 2021 (el vendedor con mas ventas)");
        console.table(sol.betterSalesMan());

        console.log("\n\nEl peor vendedor del 2021 (el vendedor con menos ventas)");
        console.table(sol.worseSalesMan());

        console.log("\n\nQue vendedor deberia ser promovido o despedido tomando en cuenta su promedio de ventas acumuladas del 2020 al 2022. (El de menor promedio debe ser despedido y el mayor promovido.)");
        console.log("\nPromovidos");
        console.table(sol.promoteSaleMan(true));
        console.log("\nDespedidos");
        console.table(sol.promoteSaleMan(false));
    }

    /**
     * El promedio de ventas por zona en el periodo 2020 - 2022
     */
    private avgZone(): Array<AvgType>{
        const { group, totalSales } = this.collection.groupBy('zone', 2020, 2022);
        return group.map((item) => {
            return {
                ...item,
                "avg": Number(((item.sales*100) / totalSales).toFixed(2)) 
            }
        });
    }

    /**
     * Que tienda deberia cerrarse en base menor cantidad de ventas acumuladas del 2020 al 2022
     */
    private closeShop(): Array<ResType>{
        const { group } = this.collection.groupBy('store', 2020, 2022);
        const minSales = group.sort((a, b) => a.sales - b.sales)[0].sales;
        return group.filter((item) => item.sales === minSales);
    }

    /**
     * El mejor vendedor del 2021 (el vendedor con mas ventas)
     */
    private betterSalesMan(){
        const { group } = this.collection.groupBy('salesman', 2021, 2021);
        const maxSales = group.sort((a, b) => b.sales - a.sales)[0].sales;
        return group.filter((item) => item.sales === maxSales);
    }

    /**
     * El peor vendedor del 2021 (el vendedor con menos ventas)
     */
    private worseSalesMan(){
        const { group } = this.collection.groupBy('salesman', 2021, 2021);
        const minSales = group.sort((a, b) => a.sales - b.sales)[0].sales;
        return group.filter((item) => item.sales === minSales);
    }

    /**
     * Que vendedor deberia ser promovido o despedido tomando en cuenta su promedio de ventas acumuladas del 2020 
     * al 2022. (El de menor promedio debe ser despedido y el mayor promovido.)
     */
    private promoteSaleMan(promote: boolean): Array<AvgType>{
        const { group, totalSales } = this.collection.groupBy('salesman', 2020, 2022);
        
        const collection = group.map((item) => ({...item, "avg": Number(((item.sales*100) / totalSales).toFixed(2))}));
        const avg = collection.sort((a, b) => {
            return promote ? b.sales - a.sales : a.sales - b.sales;
        })[0].avg;

        return collection.filter((item) => item.avg === avg);
    }

}