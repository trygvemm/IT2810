import { Prisma, PrismaClient } from "@prisma/client";
import { BookArgs, CreateCommentArgs } from "./interfaces";

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    async books(_parent: any, args: BookArgs) {
      const { filters } = args;

      if (filters === undefined || filters === null) {
        return prisma.books.findMany();
      }

      return await prisma.books.findMany({
        where: {
          AND: [
            {
              title: {
                contains: filters.title,
                mode: "insensitive",
              },
              author: {
                contains: filters.author,
                mode: "insensitive",
              },
              language: {
                contains: filters.language,
                mode: "insensitive",
              },
              year: {
                lte: filters.maxYear,
                gte: filters.minYear,
              },
            },
          ],
        },
        take: args.limit,
        skip: args.offset,
        orderBy: args.orderBy,
      });
    },

    async book(_parent: any, args: any) {
      return await prisma.books.findMany({
        where: {
          title: {
            contains: args.title,
            mode: "insensitive",
          },
        },
        include: {
          comments: true,
        },
      });
    },
    async bookId(_parent: any, args: any) {
      return await prisma.books.findMany({
        where: {
          id: {
            equals: args.id,
          },
        },
        include: {
          comments: true,
        },
      });
    },
    booksWithDistinctLanguage(_parent: any, args: any) {
      return prisma.books.findMany({
        distinct: ["language"],
      });
    },
    async commentsByBookId(_parent: any, args: any) {
      return await prisma.comments.findMany({
        where: {
          bookId: {
            equals: args.bookId,
          },
        },
      });
    },
  },
  Mutation: {
    async createComment(parent: any, args: CreateCommentArgs) {
      return await prisma.comments.create({
        data: {
          text: args.input.text as string,
          bookId: args.input.bookId as string,
        },
      });
    },
  },
};
