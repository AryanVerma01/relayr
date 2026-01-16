import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth";
import { polarClient } from "./polar";


// If your Prisma file is located elsewhere, you can change the path
import prisma from "./db";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: { 
        enabled: true,
        autoSignIn: true 
      }, 
      socialProviders: { 
        github: { 
          clientId: process.env.GITHUB_CLIENT_ID as string, 
          clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        }, 
      }, 
    
      plugins: [
        polar({
            client: polarClient,
            createCustomerOnSignUp: true,
            use: [
                checkout({
                    products: [
                        {
                            productId: "196bc9f6-7c50-490a-ab57-4bc20aa5d7da",
                            slug: "pro" // Custom slug for easy reference in Checkout URL, e.g. /checkout/relayr
                        }
                    ],
                    successUrl: process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly: true
                }),
                portal()
            ],
        }),
    ]
});