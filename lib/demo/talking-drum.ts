import { World } from '@/types/game';

export const talkingDrum: World = {
  id: 'demo-talking-drum', title: 'The Talking Drum',
  logline: 'A young girl discovers a mysterious drum connected to her missing grandfather.',
  setting: 'Enugu, Nigeria', genre: 'Mystery Adventure',
  items: [{ id: 'brass-key', name: 'Brass Key', description: 'A small key engraved with the same spiral as the drum.' }],
  endings: [
    { id: 'truth', title: 'The Truth Revealed', description: 'The drum leads Ama to a hidden letter and the truth about her grandfather.' },
    { id: 'guardian', title: 'Keeper of the Rhythm', description: 'Ama chooses to protect the drum and its secret for the next generation.' }
  ],
  scenes: [
    { id: 'discovery', title: 'The Discovery', narration: 'Rain taps the zinc roof as Ama hears three impossible beats beneath the floor. Under a loose board, she finds an old talking drum covered in symbols.', dialogue: { speaker: 'Ama', text: 'Grandpa said the drum only speaks to someone who is ready to listen.' }, choices: [{ id: 'drum', text: 'Pick up the drum', nextSceneId: 'symbols', givesItemId: 'brass-key' }, { id: 'symbols', text: 'Examine the symbols', nextSceneId: 'symbols' }, { id: 'leave', text: 'Leave the room', nextSceneId: 'courtyard' }] },
    { id: 'symbols', title: 'The Symbols', narration: 'Spiral markings glow along the drum. A tiny brass key falls from a hidden compartment.', choices: [{ id: 'key', text: 'Take the brass key', nextSceneId: 'courtyard', givesItemId: 'brass-key' }, { id: 'listen', text: 'Listen to the rhythm', nextSceneId: 'courtyard' }] },
    { id: 'courtyard', title: 'The Courtyard', narration: 'Outside, an old stone doorway is half-covered by vines. The brass key fits a small lock.', choices: [{ id: 'unlock', text: 'Use the brass key', nextSceneId: 'letter', requiresItemId: 'brass-key' }, { id: 'wait', text: 'Wait for the rhythm', nextSceneId: 'guardian' }] },
    { id: 'letter', title: 'Grandfather’s Letter', narration: 'Inside is a letter explaining that the drum was entrusted to the family as a keeper of stories.', choices: [{ id: 'truth', text: 'Follow the final clue', nextSceneId: 'truth-ending' }, { id: 'protect', text: 'Keep the secret safe', nextSceneId: 'guardian-ending' }] },
    { id: 'truth-ending', title: 'The Truth Revealed', narration: 'Ama follows the clue to a hidden box containing her grandfather’s final recording.', choices: [] },
    { id: 'guardian-ending', title: 'Keeper of the Rhythm', narration: 'Ama returns the drum to its place, promising to protect the story until the right moment.', choices: [] },
    { id: 'guardian', title: 'The Guardian', narration: 'The rhythm becomes softer. Ama realizes the choice is not about finding every answer, but deciding which stories deserve protection.', choices: [] }
  ]
};
