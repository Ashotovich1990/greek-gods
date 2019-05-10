import React, {Component} from 'react';
import DeleteGod from './delete_god';

class God extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hovered: false, delete: false};
        this.handleHover = this.handleHover.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleHover() {
        this.setState((state,prop)=> (
            {hovered: !state.hovered}
        ))

    };

    deleteButton() {
        return this.state.hovered ? <div onClick={this.handleClick}><i className="fas fa-times"></i></div> : <div></div>;
    }

    handleClick(e) {
        e.stopPropagation();
        this.setState( { delete: true});
    }

    introContent() {
        if (!this.state.delete) {
            return (
                <div className="god-list-item">
                    {this.props.content.name}
                    {this.deleteButton()}     
                </div>
            )
        } else {
            return <DeleteGod godId={this.props.content.id} />;
        }
    }

    render() {
        return (
            <div 
                onMouseEnter={this.handleHover}
                onMouseLeave={this.handleHover}
            >
                {this.introContent()}
            </div>
        )
    }
}

export default God;