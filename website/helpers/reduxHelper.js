import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';

const reducer = createReducer({
    noop: function() {
        return {};
    }
});

const store = createStore(reducer, {}, applyMiddleware(
    thunkMiddleware,
    createLogger()
));

function createReducer(asyncReducers={}) {
    return combineReducers({
        ...asyncReducers
    });
}

// 支持异步加载reducer的注册函数
export function injectAsyncReducer(name, reducer) {
    if (!store.asyncReducers) {
        store.asyncReducers = {};
    }
    store.asyncReducers[name] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
}

export { store };
