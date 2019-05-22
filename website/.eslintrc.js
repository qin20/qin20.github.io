module.exports = {
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        // 'airbnb',
    ],
    plugins: [
        'import',
        // 'react',
    ],
    settings: {
        react: {
            version: '^16.7.0',
        }
    },
    parser: 'babel-eslint',
    globals: {
        pjcx: true,
    },
    env: {
        browser: true,
        es6: true,
        node: true,
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
            modules: true,
        },
    },
    rules: {
        'no-unused-vars': ['error', { ignoreRestSiblings: true }],
        semi: 2, // 不强制使用分号
        'comma-dangle': ['error', 'always-multiline'],
        indent: ['error', 4],
        eqeqeq: 'warn',
        'no-bitwise': 0,
        'no-plusplus': 0,
        camelcase: [
            'error',
            {
                properties: 'never',
                allow: ['^UNSAFE_'],
            }
        ],
        quotes: [2, 'single'], // 单引号
        'prefer-destructuring': 'off',

        // react plugin
        'react/no-find-dom-node': 'off',
        'react/jsx-key': 'off',
        'react/prop-types': [
            'error',
            {
                skipUndeclared: true
            }
        ],
        'react/jsx-indent': [
            'error',
            4,
        ],
        'react/jsx-indent-props': [
            'error',
            4,
        ],
        'react/destructuring-assignment': 'off',
        'react/display-name': 'off',
        'react/jsx-curly-spacing': ['error', 'never', { allowMultiline: true }],
        'react/jsx-tag-spacing': ['error', {
            closingSlash: 'never',
            beforeSelfClosing: 'always',
            afterOpening: 'never',
            beforeClosing: 'never',
        }],
        'react/self-closing-comp': 'error',

        // Prevent missing parentheses around multilines JSX
        // https://github.com/yannickcr/eslint-plugin-react/blob/843d71a432baf0f01f598d7cf1eea75ad6896e4b/docs/rules/jsx-wrap-multilines.md
        'react/jsx-wrap-multilines': ['error', {
            declaration: 'parens-new-line',
            assignment: 'parens-new-line',
            return: 'parens-new-line',
            arrow: 'parens-new-line',
            condition: 'parens-new-line',
            logical: 'parens-new-line',
            prop: 'parens-new-line',
        }],

        // import plugin
        'import/prefer-default-export': 'off',
        // semi: 0, // 不强制使用分号
        // 'react/jsx-indent': ['error', 4],
        // 'max-len': 0,
        // 'no-unused-expressions': 0, // 允许使用表达式
        'no-console': 0, // 不禁用console
        'no-extra-boolean-cast': 0, // 禁止不必要的bool转换
        // 'no-debugger': 2, // 禁用debugger
        // 'no-irregular-whitespace': 0, // 不规则的空白不允许
        // 'no-trailing-spaces': 1, // 一行结束后面有空格就发出警告
        // 'eol-last': 0, // 文件以单一的换行符结束
        // 'no-unused-vars': 0, // 不能有声明后未被使用的变量或参数
        // // 'no-unused-vars': [2, { vars: 'all', args: 'after-used' }], // 不能有声明后未被使用的变量或参数
        // 'react/no-unused-vars': 0,
        // 'no-underscore-dangle': 0, // 标识符不能以_开头或结尾
        // 'no-alert': 2, // 禁止使用alert confirm prompt
        // 'no-lone-blocks': 0, // 禁止不必要的嵌套块
        // 'no-class-assign': 2, // 禁止给类赋值
        // 'no-cond-assign': 2, // 禁止在条件表达式中使用赋值语句
        // 'no-const-assign': 2, // 禁止修改const声明的变量
        // 'no-delete-var': 2, // 不能对var声明的变量使用delete操作符
        // 'no-dupe-keys': 2, // 在创建对象字面量时不允许键重复
        // 'no-duplicate-case': 2, // switch中的case标签不能重复
        // 'no-dupe-args': 2, // 函数参数不能重复
        // 'no-empty': 2, // 块语句中的内容不能为空
        // 'no-func-assign': 2, // 禁止重复的函数声明
        // 'no-invalid-this': 0, // 禁止无效的this，只能用在构造器，类，对象字面量
        // 'no-redeclare': 2, // 禁止重复声明变量
        // 'no-spaced-func': 2, // 函数调用时 函数名与()之间不能有空格
        // 'no-this-before-super': 0, // 在调用super()之前不能使用this或super
        // 'no-undef': 2, // 不能有未定义的变量
        // 'no-use-before-define': 2, // 未定义前不能使用
        // 'no-shadow': 0,
        // 'jsx-quotes': [2, 'prefer-double'], // 强制在JSX属性（jsx-quotes）中一致使用双引号
        // 'react/display-name': 0, // 防止在React组件定义中丢失displayName
        // 'react/forbid-prop-types': 0, // 禁止某些propTypes
        // 'react/jsx-boolean-value': 2, // 在JSX中强制布尔属性符号
        // 'react/jsx-closing-bracket-location': 0, // 在JSX中验证右括号位置
        // 'react/jsx-curly-spacing': [2, { when: 'never', children: true }], // 在JSX属性和表达式中加强或禁止大括号内的空格。
        // 'react/jsx-indent-props': 0, // 验证JSX中的props缩进
        // 'react/jsx-filename-extension': [0],
        // 'jsx-a11y/click-events-have-key-events': [0],
        // 'jsx-a11y/no-static-element-interactions': [0],
        // 'jsx-a11y/anchor-is-valid': [0], // 不用在 Link 中添加 anchor
        // 'jsx-a11y/no-noninteractive-element-interactions': [0],
        // 'jsx-a11y/media-has-caption': [0],
        // 'jsx-a11y/accessible-emoji': [0],
        // 'jsx-a11y/mouse-events-have-key-events': [0],
        // 'jsx-a11y/label-has-for': [0],
        // 'jsx-a11y/no-autofocus': [0],
        // 'jsx-a11y/no-noninteractive-tabindex': 0,
        // 'react/jsx-key': 2, // 在数组或迭代器中验证JSX具有key属性
        // 'react/jsx-max-props-per-line': 0, // 限制JSX中单行上的props的最大数量
        // 'react/jsx-no-bind': 0, // JSX中不允许使用箭头函数和bind
        // 'react/jsx-no-duplicate-props': 2, // 防止在JSX中重复的props
        // 'react/jsx-no-literals': 0, // 防止使用未包装的JSX字符串
        // 'react/jsx-no-undef': 1, // 在JSX中禁止未声明的变量
        // 'react/jsx-pascal-case': 0, // 为用户定义的JSX组件强制使用PascalCase
        // 'react/jsx-sort-props': 0, // 强化props按字母排序
        // 'react/jsx-uses-react': 1, // 防止反应被错误地标记为未使用
        // 'react/jsx-uses-vars': 2, // 防止在JSX中使用的变量被错误地标记为未使用
        // 'react/no-danger': 0, // 防止使用危险的JSX属性
        // 'react/no-did-mount-set-state': 0, // 防止在componentDidMount中使用setState
        // 'react/no-did-update-set-state': 0, // 防止在componentDidUpdate中使用setState
        // 'react/no-direct-mutation-state': 2, // 防止this.state的直接变异
        // 'react/no-multi-comp': 2, // 防止每个文件有多个组件定义
        // 'react/no-set-state': 0, // 防止使用setState
        // 'react/no-unknown-property': 2, // 防止使用未知的DOM属性
        // 'react/no-find-dom-node': 0,
        // 'react/prefer-es6-class': 2, // 为React组件强制执行ES5或ES6类
        // 'react/prop-types': 0, // 防止在React组件定义中丢失props验证
        // 'react/no-unused-prop-types': 0,
        // 'react/react-in-jsx-scope': 2, // 使用JSX时防止丢失React
        // 'react/self-closing-comp': 0, // 防止没有children的组件的额外结束标签
        // 'react/sort-comp': 0, // 强制组件方法顺序
        // 'react/no-string-refs': 0, // 允许使用ref属性
        // 'react/no-array-index-key': 0, // 防止在数组中遍历中使用数组key做索引
        // 'react/no-deprecated': 1, // 不使用弃用的方法
        // 'react/no-unused-state': 1,
        // 'react/no-typos': 0,
        // 'react/jsx-equals-spacing': 2, // 在JSX属性中强制或禁止等号周围的空格
        // 'react/require-default-props': 0,
        // 'react/default-props-match-prop-types': 0,
        // 'react/jsx-no-target-blank': 0,
        // 'no-unreachable': 0, // 不能有无法执行的代码
        // 'comma-dangle': 2, // 对象字面量项尾不能有逗号
        // 'no-mixed-spaces-and-tabs': 0, // 禁止混用tab和空格
        // 'no-mixed-operators': 0,
        // 'no-restricted-globals': 0,
        // 'prefer-arrow-callback': 0, // 比较喜欢箭头回调
        // 'arrow-parens': 0, // 箭头函数用小括号括起来
        // 'arrow-spacing': 0, //= >的前/后括号
        // 'import/first': 0,
        // 'global-require': 0,
        // 'class-methods-use-this': 0,
        // 'no-param-reassign': 0,
        // 'import/no-unresolved': 'off',
        // 'linebreak-style': 0,
        // 'import/extensions': 0,
        // 'jsx-a11y/img-has-alt': 0,
        // 'jsx-a11y/anchor-has-content': 0,
        // 'no-useless-escape': 0,
        // 'react/prefer-stateless-function': 0,
        // 'import/prefer-default-export': 0, // 不提醒 default export
        // 'import/no-extraneous-dependencies': 0, // 不提醒非 dev 的依赖包
        // 'react/jsx-closing-tag-location': 'off',
        // 'prefer-rest-params': 0,
        // 'guard-for-in': 0,
        // 'no-restricted-syntax': 0,
        // 'no-extend-native': 0,
    },
};
