import { z } from "zod"

export const EnvSchema = z.object({
	STORE_URL: z.string().min(1),
	CONSUMER_KEY: z.string().min(1),
	CONSUMER_SECRET: z.string().min(1),
	COOKIE_SECRET: z.string().optional(),
})

export type Env = z.infer<typeof EnvSchema>
