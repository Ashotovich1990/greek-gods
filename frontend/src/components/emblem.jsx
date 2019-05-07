import React from 'react'; 

class Emblem extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
        <ul className="emblem-list">
            Emblems: {this.props.emblems.map(emblem => <li key={emblem.id}>{emblem.name}</li>)}
        </ul>
    )
    }
}

export default Emblem;