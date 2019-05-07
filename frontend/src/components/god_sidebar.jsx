import React, {Component} from 'react'; 
import { graphql, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Abode from './abode';
import Emblem from './emblem';
import Relatives from './relatives';
import Loading from './loading';
import Error from './error';

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
            },
            siblings {
                id, 
                name
            },

            parents {
                id,
                name
            }, 

            children {
                id,
                name
            }

        }
    }
`;

class GodSidebar extends React.Component {
    constructor(props) {
        super(props);
    };

    godInfo(god) {
        return (
            <div className="god-info">
                <div className="god-title">{god.name}</div>
                <div className="god-type-abode">
                    <Abode abode={god.abode}/>
                    <div className="god-type">Type: {god.type}</div>
                </div>
                <div className="god-description">{god.description}</div>
            </div>
        );
    };

    render() {
        return (
        <Query query={GET_GOD} variables={ this.props.godId }>
            {({ loading, error, data }) => {
                if (loading)  return <Loading />;
                if (error) return <Error error={error} />;

                return (
                    <div className="god-sidebar">
                        {this.godInfo(data.god)}
                       <Emblem emblems={data.god.emblems} />
                       <div className="relatives">
                            <Relatives relationship="Siblings" relatives={data.god.siblings}/>
                            <Relatives relationship="Parents" relatives={data.god.parents}/>
                            <Relatives relationship="Children" relatives={data.god.children}/>
                       </div>
                    </div>
                );
            }}
        </Query>
        );
    }
}; 

export default GodSidebar;