/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { UserType } from './types/user.js';
import { ProfileType } from './types/profile.js';
import { PostType } from './types/post.js';
import { MemberType, MemberIdType } from './types/member.js';
import { UUIDType } from './types/uuid.js';
import { prisma } from './types/typePrisma.js';

export const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    users: {
      type: new GraphQLList(UserType),
      resolve: async () => {
        return await prisma.user.findMany();
      },
    },

    user: {
      type: UserType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_parent, args) => {
        return await prisma.user.findUnique({
          where: { id: args.id },
          include: {
            userSubscribedTo: {},
            subscribedToUser: true,
          },
        });
      },
    },

    posts: {
      type: new GraphQLList(PostType),
      resolve: async () => {
        return await prisma.post.findMany();
      },
    },

    post: {
      type: PostType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_parent, args) => {
        return await prisma.post.findUnique({ where: { id: args.id } });
      },
    },

    profiles: {
      type: new GraphQLList(ProfileType),
      resolve: async () => {
        return await prisma.profile.findMany();
      },
    },

    profile: {
      type: ProfileType,
      args: {
        id: { type: new GraphQLNonNull(UUIDType) },
      },
      resolve: async (_parent, args) => {
        return await prisma.profile.findUnique({ where: { id: args.id } });
      },
    },

    memberTypes: {
      type: new GraphQLList(MemberType),
      resolve: async () => {
        return await prisma.memberType.findMany();
      },
    },

    memberType: {
      type: MemberType,
      args: {
        id: { type: new GraphQLNonNull(MemberIdType) },
      },
      resolve: async (_parent, args) => {
        return await prisma.memberType.findUnique({ where: { id: args.id } });
      },
    },
  },
});
