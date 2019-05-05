import React, {Component} from 'react';

class God extends React.Component {
    constructor(props) {
    }

    render() {
        return (
            <div>
                <ul>
                    <li>{this.props.name}</li>
                </ul>
            </div>
        )
    }
}