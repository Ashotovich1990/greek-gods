const graphql = require('graphql');
const { GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLID } = graphql;
const mongoose = require('mongoose');
const God = mongoose.model('god');
const GodType = require('./god_type');

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        newGod: {
            type: GodType,
            args: {
                name: { type: GraphQLString },
                type: { type: GraphQLString },
                generation: { type: GraphQLInt },
                description: { type: GraphQLString }
            },
            resolve(parentValue, { name, type, generation, description }) {
                return ( new God({ name, type, generation, description })).save();
            }
        }, 

        deleteGod: {
            type: GodType,
            args: {
                id: { type: GraphQLID},
            },
            resolve(parentValue, {id} ) {
               return God.deleteOne({_id: id}, (err,god)=> {
                   return god;
               })       
            }
        }, 

        updateGod: {
            type: GodType,
            args: { 
                id: { type: GraphQLID }, 
                name: { type: GraphQLString },
                type: { type: GraphQLString },
                generation: { type: GraphQLInt },
                description: { type: GraphQLString }
            },
            resolve(parentValue, { id, name, type, generation, description }) {
                const updateObj = {};
        
                updateObj.id = id;
                if (name) updateObj.name = name;
                if (type) updateObj.type = type;
                if (generation) updateObj.generation = generation;
                if (description) updateObj.description = description;
        
                return God.findOneAndUpdate({ _id: id }, { $set: updateObj }, { new: true }, (err, god) => {
                    return god;
                });
            }
        },

        addGodRelative: {
            type: GodType,
            args: {
                godId: { type: GraphQLID },
                relativeId: { type: GraphQLID },
                relationship: { type: GraphQLString }
            },
            resolve(parentValue, { godId, relativeId, relationship }) {
                return God.addRelative(godId, relativeId, relationship);
            }
        },


    }
});

module.exports = mutation;

// mutation ($n: String, $t: String, $g: Int, $d: String ) {
//   newGod(name: $n, type: $t, generation: $g, description: $d) {
//     name
//   }
// }

// {
//     "name": "dummy",
//     "id": "5cc78feaf517bc1ecfe5fe99"
//   },
//   {
//     "name": "dummy1",
//     "id": "5cc78ff0f517bc1ecfe5fe9b"
//   },
//   {
//     "name": "dummy2",
//     "id": "5cc78ff5f517bc1ecfe5fe9c"
//   }
// ]
// }