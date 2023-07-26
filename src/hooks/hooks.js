import { camelCase } from 'lodash';

/**Cmaelize key valye of array and objects */
export const camelizeKeys = (obj) => {
    if (Array.isArray(obj)) {
        return obj.map(v => camelizeKeys(v));
    } if (obj !== null && obj.constructor === Object) {
        return Object.keys(obj).reduce(
            (result, key) => ({
                ...result,
                [camelCase(key)]: camelizeKeys(obj[key]),
            }),
            {},
        );
    }
    return obj;
}
