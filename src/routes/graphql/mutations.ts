/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { GraphQLNonNull } from 'graphql';
import { UserType } from './types/user.js';
import { ProfileType } from './types/profile.js';
import { PostType } from './types/post.js';
import { MemberType, MemberIdType } from './types/member.js';
import { GraphQLContext } from './types/context.js';
import { UUIDType } from './types/uuid.js';

// const createUser = {
//   type: new GraphQLNonNull(UserType),
//   args: {
//     dto: {}
//   },
//   async resolve(_parent, args, context: GraphQLContext) {
//     return context.prisma.user.create({data: args.dto})
//   }
// }

// const changeUser = {
//   type: new GraphQLNonNull(UserType),
//   args: {
//     dto: {}
//   },
//   async resolve(_parent, args, context: GraphQLContext) {
//     return context.prisma.user.create({data: args.dto})
//   }
// }

// const createProfile = {
//   type: new GraphQLNonNull(ProfileType),
//   args: {
//     dto: {}
//   },
//   async resolve(_parent, args, context: GraphQLContext) {
//     return context.prisma.profile.create({data: args.dto})
//   }
// }

// const changeProfile = {
//   type: new GraphQLNonNull(ProfileType),
//   args: {
//     dto: {}
//   },
//   async resolve(_parent, args, context: GraphQLContext) {
//     return context.prisma.profile.create({data: args.dto})
//   }
// }

// const createPost = {
//   type: new GraphQLNonNull(PostType),
//   args: {
//     dto: {}
//   },
//   async resolve(_parent, args, context: GraphQLContext) {
//     return context.prisma.post.create({data: args.dto})
//   }
// }

// const changePost = {
//   type: new GraphQLNonNull(PostType),
//   args: {
//     dto: {}
//   },
//   async resolve(_parent, args, context: GraphQLContext) {
//     return context.prisma.post.create({data: args.dto})
//   }
// }

// export const mutationFields = {
//   createUser: { ...createUser },
//   changeUser: { ...changeUser },
//   createProfile: { ...createProfile },
//   changeProfile: { ...changeProfile },
//   createPost: { ...createPost },
//   changePost: { ...changePost },
// };
