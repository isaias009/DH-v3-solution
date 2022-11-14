let csvjson = require('./api/csvjson.json');

/** cvs con el rango de aÃ±os */
const csvRango = (ini, fin) => {
    return csvjson.filter((item) => {
        const [dia, mes, year] = item.Date.split('/');
        return year >= ini && year <= fin
    });
}

/** No repetidos */
const noRepetidos = (param, ini, fin) => {
    const coleccion = csvRango(ini, fin)
    const lista = coleccion.map((item) => item[param]);
    return lista.filter((item, pos) => lista.indexOf(item) == pos);
}

/** Total ventas */
const totalVentas = (param, ini, fin) => {
    const lista = noRepetidos(param, ini, fin);
    const csv = csvRango(ini, fin);
    let ventas = 0;
    let listaVentas = [];
    lista.forEach((item) => {
        contador = 0;
        csv.forEach((element) => {
            if(element[param] == item){
                contador++;
                ventas++;
            }
        });
        listaVentas = [...listaVentas, {"title": item, "ventas": contador}]
    })
    return {
           listaVentas,
           "totVentas": ventas
    }
}

/** Promediar ventas */
const promediarVentas = (param, ini, fin) => {
    const lista = totalVentas(param, ini, fin)
    return lista.listaVentas.map((item) => {
        return { "title": item.title, "promVentas": ((item.ventas/lista.totVentas)*100).toFixed(2) }
    });
}

/** lista de ventas bajas */
const listaVentasBajas = (param, ini, fin) => {
    return totalVentas(param, ini, fin).listaVentas.filter((item)=>{
        if(item.ventas === min(totalVentas(param, ini, fin).listaVentas)){
            return {"title": item.title, "ventas": item.ventas}
        }
    })
}

/** lista de ventas altas */
const listaVentasAltas = (param, ini, fin) => {
    return totalVentas(param, ini, fin).listaVentas.filter((item)=>{
        if(item.ventas === max(totalVentas(param, ini, fin).listaVentas)){
            return {"title": item.lista, "ventas": item.ventas}
        }
    })
}

/** Encontrar el mayor valor */
const max = (lista) => {
    let numMax = 0;
    lista.forEach((item)=>{
        if(item.ventas>numMax){
            numMax = item.ventas;
        }
    })
    return numMax
}

/** Encontrar el menor valor */
const min = (lista) => {
    let numMin = max(lista);
    lista.forEach((item)=>{
        if(item.ventas<numMin){
            numMin = item.ventas;
        }
    })
    return numMin
}

//** Promover Vendedor con mas ventas */

const promoverVen = (param, ini, fin) => {
    const listaVenAltas = listaVentasAltas(param, ini, fin);
    const coleccionVenTot = totalVentas(param, ini, fin);
    console.log("Promover a los siguientes empleados")
    return listaVenAltas.map((item) => {
        return { "title": item.title, "promVentas": ((item.ventas/coleccionVenTot.totVentas)*100).toFixed(2) }
    })
}

//** Despedir Vendedor con menos ventas */

const despedirVen = (param, ini, fin) => {
    const listaVenBajas = listaVentasBajas(param, ini, fin);
    const coleccionVenTot = totalVentas(param, ini, fin);
    console.log("Despedir a los siguientes empleados")
    return listaVenBajas.map((item) => {
        return { "title": item.title, "promVentas": ((item.ventas/coleccionVenTot.totVentas)*100).toFixed(2) }
    })
}

/** Inciso 1 */
console.log("inciso 1 -----------------------")
console.table(promediarVentas('Zone', 2020, 2022))

/** Inciso 2 */
console.log("inciso 2 -----------------------")
console.log("tiendas a cerrar")
console.table(listaVentasBajas('Store', 2020, 2022))

/** Inciso 3 */
console.log("inciso 3 -----------------------")
console.table(listaVentasAltas('Salesman name', 2021, 2021))

/** Inciso 4 */
console.log("inciso 4 -----------------------")
console.table(listaVentasBajas('Salesman name', 2021, 2021))

/** inciso 5 */
console.log("inciso 5 -----------------------")
console.table(promoverVen('Salesman name', 2020, 2022))
console.table(despedirVen('Salesman name', 2020, 2022))