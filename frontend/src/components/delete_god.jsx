import React from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag'; 

const DELETE_GOD = gql`
    mutation removeGod($id: ID) {
        deleteGod(id: $id) {
            id
        }
    }
`;

const DeleteGod = (props) => {
    return (
        <Mutation mutation={DELETE_GOD}>
        {(deleteGod, {date}) => (
            <div>{deleteGod({variables: {id: props.godId} })}</div>
        )}
        </Mutation>
    )
};

export default DeleteGod;