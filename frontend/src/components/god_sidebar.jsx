import React, {Component} from 'react'; 
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Abode from './abode';
import Emblem from './emblem';

const GET_GOD = gql` 
    query God($id: ID!) {
        god(id: $id) {
            id,
            name,
            type,
            description,
            abode {
                id,
                name
            }, 
            emblems {
                id,
                name
            }

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
                        <div>{data.god.name}</div>
                        <div>{data.god.type}</div>
                        <div>{data.god.description}</div>
                       <Abode abode={data.god.abode}/>
                       <Emblem emblems={data.god.emblems} />
                    </div>
                );
            }}
        </Query>
        );
    }
}; 

export default GodSidebar;