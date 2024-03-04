import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema, GraphQLNonNull } from 'graphql';
import { queryFields } from './queries.js';
import { GraphQLContext } from './types/context.js';
import { UserType } from './types/user.js';
// import { mutationFields } from './mutations.js';

export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};

const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: queryFields,
});

const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  // fields: mutationFields,
  fields: {
    createUser: {
      type: new GraphQLNonNull(UserType),
    },
  },
});

export const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation,
});
