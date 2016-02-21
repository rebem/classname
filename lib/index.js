const modDelim = '_';
const elemDelim = '__';

import validate from './validate';

export function buildClassName(bemjson) {
    if (!bemjson) {
        return '';
    }

    // validation
    // istanbul ignore next
    if (process.env.NODE_ENV !== 'production') {
        validate(bemjson);
    }

    let out = bemjson.className || '';

    // block
    if (typeof bemjson.block !== 'undefined') {
        out += (out ? ' ' : '') + bemjson.block;

        // elem
        if (typeof bemjson.elem !== 'undefined') {
            out += elemDelim + bemjson.elem;
        }

        const entity = out;

        if (typeof bemjson.mods !== 'undefined') {
            Object.keys(bemjson.mods).forEach(modName => {
                const modValue = bemjson.mods[modName];
                let modValueString = '';

                if (modValue !== false) {
                    // 'short' boolean mods
                    if (modValue !== true) {
                        modValueString += modDelim + modValue;
                    }

                    out += ' ' + entity + modDelim + modName + modValueString;
                }
            });
        }
    }

    if (typeof bemjson.mix !== 'undefined') {
        // convert object or array into array
        const mixes = [].concat(bemjson.mix);

        mixes
            // filter holes in array
            .filter(mix => mix)
            .forEach(mix => {
                out += (out ? ' ' : '') + buildClassName(mix);
            });
    }

    return out;
}