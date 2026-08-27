import { worldSchema, type GeneratedWorld } from "./schema";
import { WORLD_GENERATION_SYSTEM_PROMPT, WORLD_GENERATION_USER_TEMPLATE } from "./prompts";
import { getDemoGeneratedWorld } from "@/lib/demo/generated-world";

export async function generateWorld(input: { idea: string; setting: string; genre: string; tone: string }): Promise<{ world: GeneratedWorld; demo: boolean }> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) return { world: getDemoGeneratedWorld(), demo: true };

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: process.env.AI_MODEL || "gpt-4o-mini", temperature: 0.8, response_format: { type: "json_object" }, messages: [{ role: "system", content: WORLD_GENERATION_SYSTEM_PROMPT }, { role: "user", content: WORLD_GENERATION_USER_TEMPLATE(input.idea, input.setting, input.genre, input.tone) }] })
  });
  if (!response.ok) return { world: getDemoGeneratedWorld(), demo: true };
  const data = await response.json();
  try {
    const parsed = worldSchema.safeParse(JSON.parse(data.choices?.[0]?.message?.content || "{}"));
    if (!parsed.success) return { world: getDemoGeneratedWorld(), demo: true };
    return { world: parsed.data, demo: false };
  } catch {
    return { world: getDemoGeneratedWorld(), demo: true };
  }
}
