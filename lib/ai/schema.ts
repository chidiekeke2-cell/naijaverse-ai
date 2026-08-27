import { z } from 'zod';

export const choiceSchema = z.object({ id: z.string(), text: z.string(), nextSceneId: z.string(), givesItemId: z.string().optional(), requiresItemId: z.string().optional() });
export const sceneSchema = z.object({ id: z.string(), title: z.string(), description: z.string().optional(), narration: z.string().optional(), choices: z.array(choiceSchema).min(1) });
export const worldSchema = z.object({ title: z.string(), logline: z.string(), description: z.string(), setting: z.string(), genre: z.string(), tone: z.string(), characters: z.array(z.object({ id: z.string(), name: z.string(), role: z.string(), description: z.string() })), scenes: z.array(sceneSchema).min(1), objectives: z.array(z.string()), music: z.object({ title: z.string(), mood: z.string(), description: z.string() }), endings: z.array(z.object({ id: z.string(), title: z.string(), description: z.string() })) });
export type GeneratedWorld = z.infer<typeof worldSchema>;
