export interface Csvjson {
    "Zone": string,
    "Store": string,
    "Salesman name": string,
    "Date": string
}

export interface SelectMethod {
    "zone": string,
    "store": string,
    "salesman": string,
}

export interface ResType {
    "title": string | undefined, 
    "sales": number ,
    "year": number | undefined
}

export interface GroupType {
    "group": Array<ResType>,
    "totalSales": number
}

export interface AvgType {
    "title": string | undefined, 
    "sales": number | undefined,
    "year": number | undefined,
    "avg": number | undefined
}
