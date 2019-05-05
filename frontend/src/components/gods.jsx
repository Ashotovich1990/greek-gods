import React, {Component} from 'react';
import God from './god';
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_GODS = gql` 
query {
    gods {
        id,
        name,
        type,
        description,
        domains,
        abode {
            id
        }
    } 
}`;

class Gods extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Query query={GET_GODS} >   
            {({ loading, error, data }) => {
                if (loading) return <h1>loading</h1>
                if (error) return <h1>error</h1>

                return (
                    <div>
                        <ul>{ data.gods.map(god => <li><God content={god}/></li>) }</ul>
                    </div>
                );
            }}
            </Query>

        )
    };
};

export default Gods;