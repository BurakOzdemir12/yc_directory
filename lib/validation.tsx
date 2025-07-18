import {z} from 'zod'

export const formSchema = z.object({
    title: z.string().min(3).max(100),
    description: z.string().min(20).max(500),
    category: z.string().min(2).max(40),
     pitch: z.string().min(50),
    // image: z.string().url().optional(),
    link: z.string().url().refine(async (url) => {
        try {
            const res = await fetch(url, {method: 'HEAD'});
            const contentType = res.headers.get('content-type');

            return contentType?.startsWith('image/');
        } catch (e) {
            return false;
        }
    }),
})