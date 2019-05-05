import React, {Component} from 'react';

class God extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hovered: false};
        this.handleMouse = this.handleMouse.bind(this);
    }

    handleMouse() {
        this.setState((state,props) => ({
            hovered: !state.hovered
        }));
    }

    fullContent() {
        return (
            <div>
                <ul>
                    <li>{this.props.content.name}</li>
                    <li>{this.props.content.type}</li>
                    <li>{this.props.content.description}</li>
                </ul>
            </div>
        )
    }

    introContent() {
        return (
            <div>
                <li>{this.props.content.name}</li>
            </div>
        )
    }

    content() {
        return this.state.hovered ? this.fullContent() : this.introContent();
    }

    render() {
        return (
            <div onMouseEnter={this.handleMouse}
                 onMouseLeave={this.handleMouse}
            >
                {this.content()}
            </div>
        )
    }
}

export default God;