const getTypeofRoom = () => {
  const room = [
    "temple",
    "cave",
    "corridor",
    "passage",
    "room",
    "hallway",
    "chamber", 
    "dungeon",
    "crypt",
    "tomb",
    "sanctuary",
    "shrine",
    "forge",
    "library",
    "storage room",
    "laboratory",
    "ritual chamber",
  ];
  return room[Math.floor(Math.random() * room.length)];
};

const getRoomEnvironment = () => {
  const environment = [
    "dark",
    "dusty",
    "spacious",
    "cramped",
    "mysterious",
    "ominous",
    "creepy",
    "abandoned",
    "ancient",
    "damp",
    "cold",
    "hot",
    "quiet",
    "noisy",
    "bright",
    "dim",
    "foggy",
    "smelly",
    "clean",
    "dirty",
    "empty",
    "cluttered",
    "spooky",
    "weird",
    "strange",
    "odd",
    "unusual",
    "strangly familiar",
    "uncomfortable",
    "comfortable",
    "cozy",
    "uninviting",
    "inviting",
    "scary",
    "frightening",
    "terrifying",
    "horrifying",
    "pleasant",
    "unpleasant",
    "beautiful",
    "ugly",
  ];
  return environment[Math.floor(Math.random() * environment.length)];
};

const getroomSounds = () => {  
    const sounds = [
        "dripping water",
        "footsteps in the distance",
        "scratching in the distance",
        "whispering coming from the walls",
        "moaning from the shadows",
        "screaming in the distance",
        "howling wind",
        "growling sound",
        "chirping of insects",
        "chattering of rats",
        "buzzing of flies",
        "murmuling of voices",
        "ringing of a distant bell",
        "clanging of metal to metal",
        "banging on the walls",
        "nothing"]
    return sounds[Math.floor(Math.random() * sounds.length)];
    };

export function getRoomDescription ()  {
    return `You have entered a ${getRoomEnvironment()} ${getTypeofRoom()}, you hear the sound of ${getroomSounds()}.`;
}