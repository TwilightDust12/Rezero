export const storyNodes = {
  start: {
    id: "start",
    text: "You awaken in a dark alleyway in the capital city of Lugnica. Three thugs block your exit. You have no money and no magic. What do you do?",
    checkpoint: true,
    options: [
      { text: "Fight back bravely!", nextNode: "fight_thugs" },
      { text: "Call for help at the top of your lungs!", nextNode: "call_help" }
    ]
  },
  fight_thugs: {
    id: "fight_thugs",
    text: "You swing your fists, but you are quickly overwhelmed. One of the thugs draws a knife...",
    options: [
      { text: "Accept your fate...", nextNode: "death_alley" }
    ]
  },
  death_alley: {
    id: "death_alley",
    text: "The knife pierces your chest. The alley fades to black as the Witch's shadow envelops you. Your life ends here.",
    isDeath: true,
    resetNode: "start"
  },
  call_help: {
    id: "call_help",
    text: "A red-haired girl named Felt runs past, chased by a silver-haired girl named Emilia. Hearing your screams, Emilia stops and uses her spirit magic to scare off the thugs.",
    checkpoint: true,
    options: [
      { text: "Thank her and offer to help find her stolen insignia", nextNode: "help_emilia" },
      { text: "Tell her you're busy and walk away", nextNode: "walk_away" }
    ]
  },
  walk_away: {
    id: "walk_away",
    text: "You wander into the slums alone at night. Out of the darkness, a woman with a chilling smile approaches and slices your stomach open before you can react.",
    isDeath: true,
    resetNode: "call_help"
  },
  help_emilia: {
    id: "help_emilia",
    text: "You and Emilia track the stolen insignia to a loot house in the slums. You open the door. Inside, you find a giant giant-man named Rom and Felt. Suddenly, the temperature drops. Elsa Granhiert, the Bowel Hunter, appears behind you.",
    checkpoint: true,
    options: [
      { text: "Stand in front of Emilia and try to block Elsa's blades!", nextNode: "block_elsa" },
      { text: "Grab Emilia and dive out of the window!", nextNode: "dive_window" }
    ]
  },
  block_elsa: {
    id: "block_elsa",
    text: "You rush forward, but Elsa is inhumanly fast. She sidesteps you and slices your stomach open. You collapse onto the floor, bleeding out as you watch Emilia suffer the same fate.",
    isDeath: true,
    resetNode: "help_emilia"
  },
  dive_window: {
    id: "dive_window",
    text: "You crash through the glass window into the canal below, carrying Emilia to safety. Behind you, Reinhard van Astrea rushes into the loot house and subdues Elsa. You have survived the first loop!",
    options: [
      { text: "Celebrate your survival! (Reset Loop to start another attempt)", nextNode: "start" }
    ]
  }
};
