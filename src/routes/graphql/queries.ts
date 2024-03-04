/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { GraphQLList, GraphQLNonNull } from 'graphql';
import { UserType } from './types/user.js';
import { ProfileType } from './types/profile.js';
import { PostType } from './types/post.js';
import { MemberType, MemberIdType } from './types/member.js';
import { GraphQLContext } from './types/context.js';
import { UUIDType } from './types/uuid.js';

const users = {
  type: new GraphQLList(UserType),
  resolve: async (_parent, _args, context: GraphQLContext) =>
    context.prisma.user.findMany(),
};

const user = {
  type: UserType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_parent, args, context: GraphQLContext) =>
    context.prisma.user.findUnique({
      where: { id: args.id },
      include: {
        userSubscribedTo: {},
        subscribedToUser: true,
      },
    }),
};

const posts = {
  type: new GraphQLList(PostType),
  resolve: async (_parent, _args, context: GraphQLContext) =>
    context.prisma.post.findMany(),
};

const post = {
  type: PostType,
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_parent, args, context: GraphQLContext) =>
    context.prisma.post.findUnique({ where: { id: args.id } }),
};

const profiles = {
  type: new GraphQLList(ProfileType),
  resolve: async (_parent, _args, context: GraphQLContext) =>
    context.prisma.profile.findMany(),
};

const profile = {
  type: new GraphQLNonNull(ProfileType),
  args: {
    id: { type: new GraphQLNonNull(UUIDType) },
  },
  resolve: async (_parent, args, context: GraphQLContext) =>
    context.prisma.profile.findUnique({ where: { id: args.id } }),
};

const memberTypes = {
  type: new GraphQLList(MemberType),
  resolve: async (_parent, _args, context: GraphQLContext) =>
    context.prisma.memberType.findMany(),
};

const memberType = {
  type: MemberType,
  args: {
    id: { type: new GraphQLNonNull(MemberIdType) },
  },
  resolve: async (_parent, args, context: GraphQLContext) =>
    context.prisma.memberType.findUnique({ where: { id: args.id } }),
};

export const queryFields = {
  users: { ...users },
  user: { ...user },
  posts: { ...posts },
  post: { ...post },
  profiles: { ...profiles },
  profile: { ...profile },
  memberTypes: { ...memberTypes },
  memberType: { ...memberType },
};