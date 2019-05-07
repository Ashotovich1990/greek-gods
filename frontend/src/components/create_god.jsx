import React from 'react'; 
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

const CREATE_GOD = gql`
mutation createGod($name:String, $type: String, $description: String, $generation: Int) {
    newGod(name: $name, type: $type, description:$description, generation: $generation) {
      id,
      name,
      description,
      type,
    } 
}
`;

class AddGod extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false};
        this.handleClick = this.handleClick.bind(this);
    };

    content() {
        return this.state.open ? this.godForm() : <div></div>;
    };

    handleClick() {
        this.setState((state,prop) => (
            {open: !state.open }
        ));
    }

    openForm() {
        const msg = this.state.open ? "Close the tab" : "Create god"
        return (
            <div className="create-god">
                <button className="create-god-button" onClick={this.handleClick}>{msg}</button>
            </div>
        )
    }

    godForm() {
        return (
        <Mutation mutation={CREATE_GOD}>
            {(newGod, {data}) => (
            <div>
                <form className="new-god-form" onSubmit={(e)=> {
                    e.preventDefault(); 
                    newGod({variables: {
                        name: e.target.name.value,
                        type: e.target.type.value,
                        generation: parseInt(e.target.generation.value),
                        description: e.target.description.value,
                    }})
                }}>
                    <label>
                        <input type="text" placeholder="    name..." name="name"/>
                    </label>
                    <label>
                        <input type="text" placeholder="    type.." name="type"/>
                    </label>
                    <label>
                        <input type="number" placeholder="   generation..." name="generation"/>
                    </label>
                    <label>
                        <textarea name="description" placeholder="   description"></textarea>
                    </label>
                    <input type="submit" value="submit"/>
                </form>
            </div>
            )}
            </Mutation>
        )
    };

    render() {
        return (
            <div className="add-new-god">
                {this.openForm()}
                {this.content()}
            </div>
        )
    }
}

export default AddGod;