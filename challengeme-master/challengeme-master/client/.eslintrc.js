module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb",
        'plugin:jest/recommended'
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "jest"
    ],
    "rules": {
        'jest/no-disabled-tests': 'warn',
        'jest/no-focused-tests': 'error',
        'jest/no-identical-title': 'error',
        'jest/prefer-to-have-length': 'warn',
        'jest/valid-expect': 'error',
        'jest/no-done-callback': 0,
        'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
        'linebreak-style': ['error', 'windows'],
        'func-names': ['error', 'never'],
        'react/jsx-filename-extension': 0,
        'react/jsx-fragments': 0,
        'no-underscore-dangle': 0,
        'react/jsx-no-target-blank': 0,
        'react/require-default-props': 0,
        'react/destructuring-assignment': 0,
        'jsx-a11y/label-has-associated-control': 0,
        'linebreak-style': 0,
        'max-classes-per-file': 0,
        'react/forbid-prop-types': 0,
        'react/button-has-type': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'react/prop-types': 0,
        'indent': ['error', 2, { SwitchCase: 1 }],
        'react/jsx-props-no-spreading': 0,
        'no-unused-expressions': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'react/no-deprecated': 0,
        'no-param-reassign': 0,
        'class-methods-use-this': 0,
        'import/prefer-default-export': 0,
    }
};