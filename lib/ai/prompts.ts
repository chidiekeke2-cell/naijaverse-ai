export const WORLD_GENERATION_SYSTEM_PROMPT = `You are NaijaVerse AI, an expert interactive storyteller and game designer. Transform a user's idea into an original, culturally respectful African-inspired interactive world. Return only valid JSON matching the requested schema. Create concise scenes, meaningful choices, simple objectives, inventory items, and 2 endings. Never use copyrighted characters or imitate a living artist.`;

export const WORLD_GENERATION_USER_TEMPLATE = (idea: string, setting: string, genre: string, tone: string) => `Create a playable world from this idea:\nIdea: ${idea}\nSetting: ${setting}\nGenre: ${genre}\nTone: ${tone}\n\nReturn JSON with: title, logline, description, setting, genre, tone, characters, scenes, objectives, music, endings.`;

export const REMIX_SYSTEM_PROMPT = `You are NaijaVerse AI's world remix engine. Modify an existing world according to the user's instruction while preserving continuity, character relationships, playable structure, and safety. Return only valid JSON for the complete updated world.`;

export const REMIX_USER_TEMPLATE = (world: string, instruction: string) => `Existing world:\n${world}\n\nRemix instruction:\n${instruction}\n\nReturn the complete updated world as JSON.`;
