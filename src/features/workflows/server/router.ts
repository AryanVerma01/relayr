import prisma from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import { z } from 'zod'
import { generateSlug } from 'random-word-slugs'
import { PAGINATION } from "@/config/constants";

export const workflowsRouter = createTRPCRouter({
    
    create: protectedProcedure.mutation(({ ctx })=>{
        return prisma.workflow.create({
            data: {
                name: generateSlug(3),
                userId: ctx.auth.user.id  // ? ctx.auth comes from middleware (protectedProcedure)
            }
        })
    }),

    remove: protectedProcedure
    .input(
        z.object({
            id: z.string()
        })
    )
    .mutation(({ ctx,input })=>{
        return prisma.workflow.delete({
            where: {
                id: input.id,          // ? id of workflow you want to delete
                userId : ctx.auth.user.id     // ? only user can remove workspace
            }
        })
    }),

    updateName: protectedProcedure
    .input(
        z.object({
            id: z.string(),
            name: z.string().min(1)
        })
    )
    .mutation(({ ctx,input }) => {
        return prisma.workflow.update({
            where: {
                id: input.id,                 // ? workflowId 
                userId : ctx.auth.user.id      // ? only user can update workflow
            },
            data: {
                name: input.name
            }
        })
    }),

    getOne: protectedProcedure
    .input(
        z.object({
            id: z.string()
        })
    )
    .query(({ ctx,input }) =>{
        return prisma.workflow.findUnique({
            where: {
                id: input.id,
                userId: ctx.auth.user.id
            }
        })
    }),

    getMany: protectedProcedure
    .input(
        z.object({
            page: z.number().default(PAGINATION.DEFAULT_PAGE),
            pageSize: z.number().min(PAGINATION.MIN_PAGE_SIZE).max(PAGINATION.MAX_PAGE_SIZE).default(PAGINATION.DEFAULT_PAGE_SIZE),
            search: z.string().default('')
        })
    )
    .query(async({ ctx , input })=> {        // ? ctx comes protected procedure

        const { page , pageSize , search} = input
        
        const [items , totalCount] = await Promise.all([
            prisma.workflow.findMany({
                skip: (input.page-1) * input.pageSize,
                take: input.pageSize, 
                where: {
                    userId: ctx.auth.user.id,
                    name: {
                        contains: input.search,
                        mode: 'insensitive'
                    }
                },
                orderBy: {
                    updatedAt: 'desc'
                }
            }),

            prisma.workflow.count({
                where: {
                    userId: ctx.auth.user.id,
                    name: {
                        contains: input.search,
                        mode: 'insensitive'
                    }
                }
            })
        ])

        const totalPages = Math.ceil(totalCount / input.pageSize);
        const hasNextPage = input.page < totalPages;
        const hasPreviousPage = input.page > 1;

        return { 
            items,
            page,
            pageSize,
            totalCount,
            totalPages,
            hasNextPage,
            hasPreviousPage
        }
    })

})