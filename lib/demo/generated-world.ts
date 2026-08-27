import { talkingDrum } from "./talking-drum";
import type { GeneratedWorld } from "@/lib/ai/schema";

export function getDemoGeneratedWorld(): GeneratedWorld {
  return {
    title: talkingDrum.title,
    logline: talkingDrum.logline,
    description: "A cinematic mystery adventure through an old family home in Enugu, where a talking drum guards a story that has waited years to be heard.",
    setting: talkingDrum.setting,
    genre: "Mystery Adventure",
    tone: "Cinematic",
    characters: [
      { id: "ama", name: "Ama", role: "Protagonist", description: "A curious 12-year-old who is determined to understand her grandfather's final secret." },
      { id: "grandfather", name: "Grandfather", role: "Missing storyteller", description: "A family storyteller whose clues remain hidden inside the old house." }
    ],
    scenes: talkingDrum.scenes.map((scene, index) => ({
      id: scene.id,
      title: scene.title,
      description: scene.narration,
      narration: scene.narration,
      choices: scene.choices.length ? scene.choices.map(choice => ({
        id: choice.id,
        text: choice.text,
        nextSceneId: choice.nextSceneId,
        ...(choice.givesItemId ? { givesItemId: choice.givesItemId } : {}),
        ...(choice.requiresItemId ? { requiresItemId: choice.requiresItemId } : {})
      })) : [{ id: `continue-${index}`, text: "Continue", nextSceneId: scene.id }]
    })),
    objectives: ["Discover why the drum was hidden", "Find the missing clue", "Choose what to do with the family secret"],
    music: { title: "Echoes of the Talking Drum", mood: "Mysterious and warm", description: "Percussive West African-inspired textures with soft atmospheric pads." },
    endings: talkingDrum.endings
  };
}
