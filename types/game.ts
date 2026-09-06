import { z } from 'zod';

export const ChoiceSchema = z.object({
  id: z.string(),
  text: z.string(),
  nextSceneId: z.string(),
  givesItemId: z.string().optional(),
  requiresItemId: z.string().optional()
});
export const SceneSchema = z.object({
  id: z.string(),
  title: z.string(),
  narration: z.string(),
  dialogue: z.object({ speaker: z.string(), text: z.string() }).optional(),
  choices: z.array(ChoiceSchema),
  requiresItemId: z.string().optional()
});
export const ItemSchema = z.object({ id: z.string(), name: z.string(), description: z.string() });
export const WorldSchema = z.object({
  id: z.string(),
  title: z.string(),
  logline: z.string(),
  setting: z.string(),
  genre: z.string(),
  scenes: z.array(SceneSchema),
  items: z.array(ItemSchema),
  endings: z.array(z.object({ id: z.string(), title: z.string(), description: z.string() }))
});
export type Choice = z.infer<typeof ChoiceSchema>;
export type Scene = z.infer<typeof SceneSchema>;
export type World = z.infer<typeof WorldSchema>;
export type GameState = { currentSceneId: string; inventory: string[]; visited: string[]; endingId?: string };
