function isPlainObject(target) {
    return Object.prototype.toString.call(target) === '[object Object]';
}

export default function validate(props) {
    if (typeof props.block === 'undefined') {
        if (typeof props.elem !== 'undefined') {
            console.warn('you should provide block along with elem', props);
        }

        if (typeof props.mods !== 'undefined') {
            console.warn('you should provide block along with mods', props);
        }
    } else {
        if (typeof props.block !== 'string') {
            console.warn('block should be string', props);
        }

        if (typeof props.elem !== 'undefined') {
            if (typeof props.elem !== 'string') {
                console.warn('elem should be string', props);
            }
        }

        if (typeof props.mods !== 'undefined') {
            if (!isPlainObject(props.mods)) {
                console.warn('mods should be a plain object', props);
            }
        }
    }

    if (typeof props.mix !== 'undefined') {
        if (!isPlainObject(props.mix) && !Array.isArray(props.mix)) {
            console.warn('mix should be a plain object or array on plain objects', props);
        }
    }

    return props;
}
