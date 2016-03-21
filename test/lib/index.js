import assert from 'assert';
import requireUncached from 'require-uncached';

import { stringify } from '../../lib/';

function test(props, className) {
    assert.strictEqual(
        stringify(props),
        className
    );
}

describe('stringify', function() {
    it('is function', function() {
        assert(typeof stringify === 'function');
    });

    it('empty class if called without argument', function() {
        assert(stringify() === '');
    });

    it('empty class if no block and mix', function() {
        test({}, '');
    });

    it('empty class if no block and mix, but with className', function() {
        test({ className: 'lol' }, 'lol');
    });

    describe('block', function() {
        it('simple', function() {
            test({ block: 'block' }, 'block');
        });

        it('props.className + block', function() {
            test(
                {
                    block: 'block2',
                    className: 'block1'
                }, 'block2 block1'
            );
        });
    });

    describe('mods', function() {
        describe('block', function() {
            it('block + mod', function() {
                test(
                    {
                        block: 'block',
                        mods: {
                            mod: 'val'
                        }
                    }, 'block block_mod_val'
                );
            });

            it('block + few mods', function() {
                test(
                    {
                        block: 'block',
                        mods: {
                            mod1: 'val1',
                            mod2: 'val2'
                        }
                    }, 'block block_mod1_val1 block_mod2_val2'
                );
            });

            it('block + shorthand mod = true', function() {
                test(
                    {
                        block: 'block',
                        mods: {
                            mod: true
                        }
                    }, 'block block_mod'
                );
            });

            it('block + shorthand mod = false', function() {
                test(
                    {
                        block: 'block',
                        mods: {
                            mod: false
                        }
                    }, 'block'
                );
            });
        });

        describe('elem', function() {
            it('block + elem + mod', function() {
                test(
                    {
                        block: 'block',
                        elem: 'elem',
                        mods: {
                            mod: 'val'
                        }
                    }, 'block__elem block__elem_mod_val'
                );
            });

            it('block + elem + few mods', function() {
                test(
                    {
                        block: 'block',
                        elem: 'elem',
                        mods: {
                            mod1: 'val1',
                            mod2: 'val2'
                        }
                    }, 'block__elem block__elem_mod1_val1 block__elem_mod2_val2'
                );
            });

            it('block + shorthand mod = true', function() {
                test(
                    {
                        block: 'block',
                        elem: 'elem',
                        mods: {
                            mod: true
                        }
                    }, 'block__elem block__elem_mod'
                );
            });

            it('block + shorthand mod = false', function() {
                test(
                    {
                        block: 'block',
                        elem: 'elem',
                        mods: {
                            mod: false
                        }
                    }, 'block__elem'
                );
            });
        });
    });

    describe('mix', function() {
        it('mix without block', function() {
            test(
                {
                    mix: {
                        block: 'block'
                    }
                }, 'block'
            );
        });

        it('block + mix', function() {
            test(
                {
                    block: 'block1',
                    mix: {
                        block: 'block2'
                    }
                }, 'block1 block2'
            );
        });

        it('block + mods + mix', function() {
            test(
                {
                    block: 'block1',
                    mods: {
                        mod: 'val'
                    },
                    mix: {
                        block: 'block2'
                    }
                }, 'block1 block1_mod_val block2'
            );
        });

        it('block + elem + mix', function() {
            test(
                {
                    block: 'block1',
                    elem: 'elem',
                    mix: {
                        block: 'block2'
                    }
                }, 'block1__elem block2'
            );
        });

        it('block + elem + mods + mix', function() {
            test(
                {
                    block: 'block1',
                    elem: 'elem',
                    mods: {
                        mod: 'val'
                    },
                    mix: {
                        block: 'block2'
                    }
                }, 'block1__elem block1__elem_mod_val block2'
            );
        });

        it('block + elem + mods + mix + className', function() {
            test(
                {
                    block: 'block1',
                    elem: 'elem',
                    mods: {
                        mod: 'val'
                    },
                    mix: {
                        block: 'block2'
                    },
                    className: 'hello'
                }, 'block1__elem block1__elem_mod_val block2 hello'
            );
        });

        it('complex mix', function() {
            test(
                {
                    block: 'block1',
                    mix: {
                        block: 'block2',
                        elem: 'elem',
                        mods: {
                            mod1: 'val1',
                            mod2: 'val2'
                        }
                    }
                }, 'block1 block2__elem block2__elem_mod1_val1 block2__elem_mod2_val2'
            );
        });

        it('multiple mixes', function() {
            test(
                {
                    block: 'block1',
                    mix: [
                        {
                            block: 'block2'
                        },
                        {
                            block: 'block3'
                        }
                    ]
                }, 'block1 block2 block3'
            );
        });

        it('multiple mixes with holes', function() {
            test(
                {
                    block: 'block1',
                    mix: [
                        undefined,
                        {
                            block: 'block2'
                        },
                        null
                    ]
                }, 'block1 block2'
            );
        });

        it('recursive mixes', function() {
            test(
                {
                    block: 'block1',
                    mix: {
                        block: 'block2',
                        mix: {
                            block: 'block3'
                        }
                    }
                }, 'block1 block2 block3'
            );
        });
    });

    describe('custom delimeters', function() {
        it('mods', function() {
            process.env.REBEM_MOD_DELIM = '~~';

            const customStringify = requireUncached('../../lib/').stringify;

            assert.strictEqual(
                customStringify({
                    block: 'block',
                    mods: {
                        mod: 'val'
                    }
                }),
                'block block~~mod~~val'
            );
        });

        it('elem', function() {
            process.env.REBEM_ELEM_DELIM = '--';

            const customStringify = requireUncached('../../lib/').stringify;

            assert.strictEqual(
                customStringify({
                    block: 'block',
                    elem: 'elem'
                }),
                'block--elem'
            );
        });
    });
});
