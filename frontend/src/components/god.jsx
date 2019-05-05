import React, {Component} from 'react';

class God extends React.Component {
    constructor(props) {
        super(props)
    }

    introContent() {
        return (
            <div>
                <li>{this.props.content.name}</li>
            </div>
        )
    }

    render() {
        return (
            <div>
                {this.introContent()}
            </div>
        )
    }
}

export default God;