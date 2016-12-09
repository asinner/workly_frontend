export function toArray(x: Object): Array<any> {
    let r = [];
    for (let id in x) r.push(x[id])
    return r
}