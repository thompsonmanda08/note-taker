import { string, z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const noteRouter = createTRPCRouter({
  getAll: protectedProcedure
    .input(z.object({ topicId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.note.findMany({
        where: {
          topicId: input.topicId,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({ title: string(), content: z.string(), toppicId: z.string() })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.note.create({
        data: {
          title: input.title,
          topicId: input.toppicId,
          content: input.content,
        },
      });
    }),

  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.note.delete({
        where: {
          id: input.id,
        },
      });
    }),

  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: string(),
        content: z.string(),
        toppicId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.note.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          topicId: input.toppicId,
          content: input.content,
        },
      });
    }),
});
