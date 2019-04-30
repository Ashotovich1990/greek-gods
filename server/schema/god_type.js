const mongoose = require('mongoose');

const graphql = require('graphql');

const AbodeType = require('./abode_type');

const EmblemType = require('./emblem_type');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
    GraphQLList
} = graphql; 

const GodSchema = require('../god');

const findRelatives = function(god, godId, type) {
    return god.findById(godId)
        .populate(`${type}`)
        .then(god => god[type]);
}

const GodType = new GraphQLObjectType({
    name: 'GodType',
    fields: () => ({
        id: {type: GraphQLID}, 
        name: {type: GraphQLString},
        type: {type: GraphQLString}, 
        description: {type: GraphQLString},
        domains: {type: new GraphQLList(GraphQLString)}, 

        abode: {
            type: AbodeType,
            resolve(parentValue) {
                return Abode.findById(parentValue.abode)
                    .then(abode => abode)
                    .catch(err => null)
            }
        },

        emblems: {
            type: new GraphQLList(EmblemType), 
            resolve(parentValue) {
                return God.findById(parentValue.id)
                    .populate('emblems')
                    .then(god => god.emblems);
            }
        }, 

        parents: {
            type: new GraphQLList(GodType),
            resolve(parentValue) {
                return findRelatives(God,parentValue.id, 'parents');
            }
        },

        siblings: {
            type: new GraphQLList(GodType),
            resolve(parentValue) {
                return findRelatives(God, parentValue.id, 'siblings');
            }
        },

        children: {
            type: new GraphQLList(GodType),
            resolve(parentValue) {
                return findRelatives(God, parentValue.id, 'children');
            }
        }
    })
})

module.exports = GodType;