import React, {Component} from 'react';
import God from './god';
import GodSidebar from './god_sidebar';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Error from './error';
import AddGod from './create_god';

const GET_GODS = gql` 
query {
    gods {
        id,
        name,
    } 
}`;

class Gods extends React.Component {
    constructor(props) {
        super(props);
        this.state = {godId: {"id": "5c98e94dd5a3ca0de10a1501"}}; 
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState( { godId: {'id': e.currentTarget.attributes.value.value}})
    }

    render() {
        return (
            <Query query={GET_GODS} >   
            {({ loading, error, data }) => {
                if (loading) return <h1>Loading</h1>
                if (error) return <Error error={error}/>

                return (
                    <div className="god-container">
                        <ul className="god-list">
                            { data.gods.map(god => 
                                <li onClick={this.handleClick} key={god.id} value={god.id}><God content={god}/></li>
                            )}
                        <AddGod/>
                        </ul>
                        <GodSidebar godId={this.state.godId}/>
                    </div>
                );
            }}
            </Query>

        )
    };
};

export default Gods;