import React from 'react'; 

class Relatives extends React.Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="relative">
                <h1>{this.props.relationship}</h1>
                <ul className="relative-list">
                    {this.props.relatives.map(god => <li key={god.id}>{god.name}</li>)}
                </ul>
            </div>
        )
    }
};

export default Relatives;