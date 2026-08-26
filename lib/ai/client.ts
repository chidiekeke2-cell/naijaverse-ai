import { worldSchema, type GeneratedWorld } from "./schema";
import { WORLD_GENERATION_SYSTEM_PROMPT, WORLD_GENERATION_USER_TEMPLATE } from "./prompts";

export async function generateWorld(input: { idea: string; setting: string; genre: string; tone: string }): Promise<{ world: GeneratedWorld; demo: boolean }> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("AI provider is not configured. Use demo mode.");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: process.env.AI_MODEL || "gpt-4o-mini", temperature: 0.8, response_format: { type: "json_object" }, messages: [{ role: "system", content: WORLD_GENERATION_SYSTEM_PROMPT }, { role: "user", content: WORLD_GENERATION_USER_TEMPLATE(input.idea, input.setting, input.genre, input.tone) }] })
  });
  if (!response.ok) throw new Error("AI generation failed");
  const data = await response.json();
  const parsed = worldSchema.safeParse(JSON.parse(data.choices?.[0]?.message?.content || "{}"));
  if (!parsed.success) throw new Error("AI returned invalid world data");
  return { world: parsed.data, demo: false };
}
