import React from 'react';

var myName = 'qyb';

var formatName = function(name) {
    return 'handsome ' + name;
};

var sayHi = <h1>Hello, {formatName(myName)}!</h1>;

var names = ['Alice', 'Emily', 'Kate'];

var list = (
    <div>
        { names.map(function (name, index) {
            return <div key={index}>Hello, {name}!</div>
        })}
    </div>
);

var userInfo = (
    <div>
        {sayHi},
        <h2>{myName} is talk</h2>
        <p>{formatName(myName)} is also nice</p>
        <ul>{list}</ul>
    </div>
);

export default class JsxDemo extends React.Component {
    render() {
        return JSON.stringify(sayHi, null, 4)
    }
}

