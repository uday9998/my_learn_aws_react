export function parseFloat(value) {
   return `$${ Number.parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }`;
}

export function parseFloatNew(value) {
   return `$${ Number.parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }`;
}


export function parseFloatNewWithoutPrice(value) {
   return `${ Number.parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') }`;
}
