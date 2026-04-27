import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import db from './db';

function getNextMonthlyResetAt() {
  const now = new Date();

  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1, 0, 0, 0, 0),
  );
}

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: 'postgresql',
  }),
  databaseHooks: {
    user: {
      create: {
        async after(user) {
          await db.userQuota.upsert({
            where: {
              userId: user.id,
            },
            create: {
              userId: user.id,
              generationsUsed: 0,
              quotaLimit: 5,
              resetAt: getNextMonthlyResetAt(),
            },
            update: {},
          });
        },
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      //
      prompt: 'select_account',
    },
  },
});
