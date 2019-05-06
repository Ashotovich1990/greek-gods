import React, {Component} from 'react';

class God extends React.Component {
    constructor(props) {
        super(props)
    }

    introContent() {
        return (
            <div>
                {this.props.content.name}
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