import React, {Component} from 'react'; 
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';

const GET_GOD = gql` 
    query God($id: ID!) {
        god(id: $id) {
            id,
            name,
            type,
            description,
        }
    }
`;

class GodSidebar extends React.Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
        <Query query={GET_GOD} variables={ this.props.godId }>
            {({ loading, error, data }) => {
                if (loading)  return <h1>loading</h1>
                if (error) return <h1>error</h1>

                return (
                    <div>
                        <ul>
                        <li>{data.god.name}</li>
                        <li>{data.god.type}</li>
                        <li>{data.god.description}</li>
                        </ul>
                    </div>
                );
            }}
        </Query>
        );
    }
}; 

export default GodSidebar;