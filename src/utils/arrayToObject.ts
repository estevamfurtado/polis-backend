export function arrayToObject (array: any[], id: string) {
    const object = {};
    array.forEach(item => {
        if (item[id]) {
            object[item[id]] = item;
        }
    });
    return object;
}