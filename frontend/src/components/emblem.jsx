import React from 'react'; 

class Emblem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
        <ul className="emblem-list">
            {this.props.emblems.map(emblem => <li>{emblem.name}</li>)}
        </ul>
    )
    }
}

export default Emblem;