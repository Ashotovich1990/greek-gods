import React from 'react'; 

class Abode extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="adobe">
                Abode: {this.props.abode ? this.props.abode.name : ""}
            </div>
        )
    }
}

export default Abode;