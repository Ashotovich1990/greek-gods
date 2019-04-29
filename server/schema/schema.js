const graphql = require('graphql');
const { GraphQLSchema } = graphql;

const RootQueryType = require('./root_query');

module.exports = new GraphQLSchema({
  query: RootQueryType
});