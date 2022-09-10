import { createClient } from 'redis';

export const redis = createClient({
    password: process.env.REDIS_PASSWORD ?? 'redis',
    url: process.env.REDIS_URL,
});

export async function connectCache(): Promise<void> {
    try {
        await redis.connect();
    } catch (err) {
        console.error(err);
    }
}

export async function disconnectCache(): Promise<void> {
    await redis.disconnect();
}

export default redis;
