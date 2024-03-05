/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { prisma } from './typePrisma.js';
import { ProfileType } from './profile.js';
import { PostType } from './post.js';

export const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    balance: { type: new GraphQLNonNull(GraphQLFloat) },
    profile: {
      type: ProfileType,
      resolve: async (user) => {
        return await prisma.profile.findUnique({
          where: { userId: user.id },
        });
      },
    },
    posts: {
      type: new GraphQLList(PostType),
      resolve: async (user) => {
        return await prisma.post.findMany({
          where: { authorId: user.id },
        });
      },
    },
    userSubscribedTo: {
      type: new GraphQLList(UserType),
      resolve: async (user) => {
        const subscriptions = await prisma.subscribersOnAuthors.findMany({
          where: { subscriberId: user.id },
          include: {
            author: true,
          },
        });
        return subscriptions.map((subscription) => subscription.author);
      },
    },
    subscribedToUser: {
      type: new GraphQLList(UserType),
      resolve: async (user) => {
        const subscribers = await prisma.subscribersOnAuthors.findMany({
          where: { authorId: user.id },
          include: {
            subscriber: true,
          },
        });
        return subscribers.map((subscription) => subscription.subscriber);
      },
    },
  }),
});
