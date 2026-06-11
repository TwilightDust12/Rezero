import subaruImg from '../assets/subaru.png';
import emiliaImg from '../assets/emilia.png';
import remImg from '../assets/rem.png';
import ramImg from '../assets/ram.png';
import beatriceImg from '../assets/beatrice.png';
import echidnaImg from '../assets/echidna.png';

export const characters = [
  {
    id: "subaru",
    name: "Subaru Natsuki",
    title: "The Self-Proclaimed Knight",
    color: "#a78bfa", // Soft violet
    accentClass: "border-violet-400/30 text-violet-300",
    avatar: subaruImg,
    description: "A modern-world shut-in suddenly summoned to Lugnica. Possesses no martial might, but holds the terrifying curse 'Return by Death', allowing him to loop back in time upon dying.",
    affectionLabel: "Sanity level",
    affection: 45,
    abilities: ["Return by Death", "Invisible Providence", "Shamak"],
    quotes: [
      "I'm Subaru Natsuki! Not only am I clueless, I'm broke as well!",
      "Even if you forget me, I'll never forget you. I will save you, no matter what!",
      "If I have to die to save you, I'll die a thousand times."
    ]
  },
  {
    id: "emilia",
    name: "Emilia",
    title: "The Half-Elf Candidate",
    color: "#e2e8f0", // Silver-white
    accentClass: "border-slate-300/30 text-slate-200",
    avatar: emiliaImg,
    description: "A gentle half-elf spirit-arts user candidate for the Royal Selection. Feared due to her resemblance to the Witch of Envy, but possesses a heart of gold.",
    affectionLabel: "Affection",
    affection: 85,
    abilities: ["Spirit Arts (Puck)", "Ice Brand Arts", "Huma"],
    quotes: [
      "I only have one name. I am Emilia. Just Emilia.",
      "Thank you, Subaru. For saving me, and for being by my side.",
      "I want to make a world where everyone is treated equally, regardless of birth."
    ]
  },
  {
    id: "rem",
    name: "Rem",
    title: "The Devoted Demon Maid",
    color: "#60a5fa", // Soft blue
    accentClass: "border-blue-400/30 text-blue-300",
    avatar: remImg,
    description: "A demon maid serving at the Roswaal Mansion. Initially distrusting of Subaru due to the Witch's scent, she becomes fiercely loyal and devoted after he saves her.",
    affectionLabel: "Devotion",
    affection: 100,
    abilities: ["Water Magic (El Huma)", "Demon Horn Form", "Almighty Flail"],
    quotes: [
      "When you said you hate yourself, it made me want to tell you all the wonderful things I know about you.",
      "Let us start from here. From step one... No, from zero!",
      "Rem is happiest when she is with Subaru-kun."
    ]
  },
  {
    id: "ram",
    name: "Ram",
    title: "The Proud Wind Sister",
    color: "#f87171", // Soft pink
    accentClass: "border-red-400/30 text-red-300",
    avatar: ramImg,
    description: "Ram's elder twin sister. Though she lost her demon horn in childhood, she retains powerful wind magic and handles mansion affairs with a sharp tongue and quiet pride.",
    affectionLabel: "Respect",
    affection: 55,
    abilities: ["Wind Magic (Fura)", "Clairvoyance", "Sharp Tongue"],
    quotes: [
      "Barusu, you really are hopeless.",
      "Ram is different from Rem. Ram is much less forgiving.",
      "The horn may be gone, but the spirit of the demon tribe is not so easily broken."
    ]
  },
  {
    id: "beatrice",
    name: "Beatrice",
    title: "Librarian of the Forbidden Library",
    color: "#fbbf24", // Muted gold
    accentClass: "border-amber-400/30 text-amber-300",
    avatar: beatriceImg,
    description: "An artificial spirit created by Echidna, she guarded the Forbidden Library for 400 years in isolation, waiting for 'That Person' before Subaru broke her contract.",
    affectionLabel: "Trust",
    affection: 90,
    abilities: ["Yin Magic (Minya)", "Mana Drain", "Library Crossing"],
    quotes: [
      "I suppose you think you can just wander in here as you please, in fact.",
      "Hold Beatrice's hand, Subaru. Don't let go.",
      "Four hundred years is a very long time to wait... I suppose."
    ]
  },
  {
    id: "echidna",
    name: "Echidna",
    title: "The Witch of Greed",
    color: "#94a3b8", // Pale grey
    accentClass: "border-slate-400/30 text-slate-300",
    avatar: echidnaImg,
    description: "The Witch of Greed, possessing an insatiable thirst for knowledge. She invites Subaru to her mental 'Tea Party' in the Sanctuary to observe his Return by Death.",
    affectionLabel: "Curiosity",
    affection: 95,
    abilities: ["Al Shamak", "Insatiable Intellect", "Witch's Tea Party"],
    quotes: [
      "My name is Echidna. Won't you sit down and join me for tea?",
      "I want to know everything. The future, the past, the choices you make... show me all of it.",
      "A contract with me means you will never have to walk this painful path alone."
    ]
  }
];
