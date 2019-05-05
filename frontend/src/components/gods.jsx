import React, {Component} from 'react';
import God from './god';
import GodSidebar from './god_sidebar';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';

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
        this.state = {godId: {}}; 
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        this.setState( { godId: {'id': e.currentTarget.attributes.value.value}})
    }

    render() {
        return (
            <Query query={GET_GODS} >   
            {({ loading, error, data }) => {
                if (loading) return <h1>loading</h1>
                if (error) return <h1>error</h1>

                return (
                    <div>
                        <ul>
                            { data.gods.map(god => 
                                <li onClick={this.handleClick} key={god.id} value={god.id}><God content={god}/></li>
                            )}
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