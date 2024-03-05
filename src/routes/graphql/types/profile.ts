/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  GraphQLBoolean,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
} from 'graphql';
import { UUIDType } from './uuid.js';
import { prisma } from './typePrisma.js';
import { UserType } from './user.js';
import { MemberType } from './member.js';

export const ProfileType = new GraphQLObjectType({
  name: 'Profile',
  fields: () => ({
    id: { type: new GraphQLNonNull(UUIDType) },
    isMale: { type: GraphQLBoolean },
    yearOfBirth: { type: GraphQLInt },
    user: { type: new GraphQLNonNull(UserType) },
    memberType: {
      type: new GraphQLNonNull(MemberType),
      resolve: async (profile) => {
        return await prisma.memberType.findUnique({
          where: { id: profile.memberTypeId },
        });
      },
    },
  }),
});