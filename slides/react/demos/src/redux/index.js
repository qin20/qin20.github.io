import React from 'react';
import { createStore } from 'redux';

var reducer = (state, action) => {
    var fn = {
        add: () => state + 1,
        minus: () => state - 1
    }[action.type]

    return fn ? fn() : state;
};

var stroe = createStore(reducer, 0);

var actions = {
    add: { type: 'add' },
    minus: { type: 'minus' }
};

stroe.dispatch(actions.add)
const state1 = stroe.getState()

stroe.dispatch(actions.minus)
const state2 = stroe.getState()

export default class ReduxDemo extends React.Component {
    render() {
        return (
            <div>
                {state1}
                <br/>
                {state2}
            </div>
        )
    }
}
