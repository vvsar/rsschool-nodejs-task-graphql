import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { createGqlResponseSchema, gqlResponseSchema, schema } from './schemas.js';
import { graphql, validate, parse } from 'graphql';
import depthLimit from 'graphql-depth-limit';

const plugin: FastifyPluginAsyncTypebox = async (fastify) => {
  fastify.route({
    url: '/',
    method: 'POST',
    schema: {
      ...createGqlResponseSchema,
      response: {
        200: gqlResponseSchema,
      },
    },
    async handler(req) {
      const { query, variables } = req.body;

      try {
        const errors = validate(schema, parse(query), [depthLimit(5)]);

        if (errors.length) {
          return { data: null, errors };
        }
        return await graphql({
          schema: schema,
          source: query,
          variableValues: variables,
          // contextValue: { prisma: fastify.prisma },
        });

      } catch (error) {
        if (
          error &&
          typeof error === 'object' &&
          'message' in error &&
          typeof error.message === 'string'
        ) {
          throw fastify.httpErrors.badRequest(`Invalid query: ${error.message}`);
        }
        throw new Error();
      }
      
    },
  });
};

export default plugin;
