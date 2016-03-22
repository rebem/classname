[![npm](https://img.shields.io/npm/v/rebem-classname.svg?style=flat-square)](https://www.npmjs.com/package/rebem-classname)
[![travis](http://img.shields.io/travis/rebem/classname.svg?style=flat-square)](https://travis-ci.org/rebem/classname)
[![coverage](https://img.shields.io/codecov/c/github/rebem/classname.svg?style=flat-square)](https://codecov.io/github/rebem/classname)
[![deps](https://img.shields.io/gemnasium/rebem/classname.svg?style=flat-square)](https://gemnasium.com/rebem/classname)
[![gitter](https://img.shields.io/badge/gitter-join_chat_%E2%86%92-46bc99.svg?style=flat-square)](https://gitter.im/rebem/rebem)

Set of helpers for composing and parsing [BEM](http://getbem.com/) classNames.

## Install

```
npm i -S rebem-classname
```

## Usage

### `stringify`

```js
import { stringify } from 'rebem-classname';

const className = stringify(props);
```

#### props:

##### `block`

[Reference](https://en.bem.info/method/key-concepts/#block).

```js
stringify({
    block: 'beep'
});
// "beep"
```

##### `elem`

[Reference](https://en.bem.info/method/key-concepts/#element).

```js
stringify({
    block: 'beep',
    elem: 'boop'
});
// "beep__boop"
```

##### `mods`

[Reference](https://en.bem.info/method/key-concepts/#modifier).

```js
stringify({
    block: 'beep',
    mods: {
        foo: 'bar'
    }
});
// "beep beep_foo_bar"
```

```js
stringify({
    block: 'beep',
    mods: {
        foo: true,
        bar: false
    }
});
// "beep beep_foo"
```

```js
stringify({
    block: 'beep',
    elem: 'boop',
    mods: {
        foo: 'bar'
    }
});
// "beep__boop beep__boop_foo_bar"
```

##### `mix`

[Reference](https://en.bem.info/method/key-concepts/#mix).

```js
stringify({
    block: 'beep',
    mix: {
        block: 'boop',
        elem: 'foo'
    }
});
// "beep boop__foo"
```

```js
stringify({
    block: 'beep',
    mix: [
        {
            block: 'boop',
            elem: 'foo'
        },
        {
            block: 'bar',
            elem: 'baz',
            mods: {
                test: true
            }
        }
    ]
});
// "beep boop__foo bar__baz bar__baz_test"
```

##### `className`

```js
stringify({
    block: 'boop'
    className: 'beep'
});
// "boop beep"
```

### `parse`

*TODO*

## Environment variables

### `NODE_ENV`

`process.env.NODE_ENV` must be available. For example in webpack you can do this with `DefinePlugin`:

```js
plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV)
        }
    })
]
```

### Custom delimeters

Default delimeters are `_` for modifiers and `__` for elements, but you can change it with special environment variables:


```js
plugins: [
    new webpack.DefinePlugin({
        'process.env': {
            REBEM_MOD_DELIM: JSON.stringify('--'),
            REBEM_ELEM_DELIM: JSON.stringify('~~')
        }
    })
]
```
