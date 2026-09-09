export type Mood = 'Chill & Chat' | 'Ranked Focus' | 'Try Something New' | 'Just Talk';

export interface GameEntry {
  name: string;
  rank?: string;
}

export interface User {
  id: string;
  name: string;
  age: number;
  avatar: string; // initials fallback
  avatarColor: string;
  bio: string;
  games: GameEntry[];
  interests: string[];
  moods: Mood[];
  availability: string[];
  status: string;
  memberSince?: string;
  topicTags?: string[];
  chemistry?: number;
  verified?: boolean;
}

export interface Community {
  id: string;
  name: string;
  icon: string;
  category: 'Games' | 'Movies & TV' | 'Sports' | 'Anime' | 'Other';
  members: number;
  color: string;
  bgColor: string;
  topics: string[];
  description: string;
}

export interface Message {
  id: string;
  senderId: string; // 'me' or user id
  text: string;
  time: string;
}

export interface Conversation {
  id: string;
  userId: string;
  messages: Message[];
}

export interface Squad {
  id: string;
  name: string;
  game: string;
  members: number;
  maxMembers: number;
  joined: boolean;
}

export interface PartyPost {
  id: string;
  title: string;
  game: string;
  playersNeeded: number;
  mood: Mood;
  startTime: string;
  joined: boolean;
  userId: string;
}

// ─── Users ───────────────────────────────────────────────────────────────────

export const CURRENT_USER: User = {
  id: 'me',
  name: 'Nawasorn',
  age: 21,
  avatar: 'NW',
  avatarColor: '#6c47ff',
  bio: 'Competitive gamer who still spends too much time talking about Marvel.',
  games: [
    { name: 'VALORANT', rank: 'Diamond 2' },
    { name: 'FIFA', rank: 'Elite' },
  ],
  interests: ['Marvel', 'Star Wars', 'Anime', 'Football'],
  moods: ['Ranked Focus', 'Chill & Chat'],
  availability: ['Evenings', 'Weekends'],
  verified: true,
  status: 'Online',
};

export const USERS: User[] = [
  {
    id: 'u1',
    name: 'Alex',
    age: 18,
    avatar: 'AX',
    avatarColor: '#22c55e',
    bio: 'Diamond grinder by day, MCU theorist by night. Down for ranked or chill.',
    games: [{ name: 'VALORANT', rank: 'Diamond 2' }, { name: 'Marvel Rivals', rank: 'Gold' }],
    interests: ['Marvel', 'Anime', 'FPS', 'Sci-Fi'],
    moods: ['Ranked Focus', 'Chill & Chat'],
    availability: ['Evenings', 'Weekends'],
    status: 'Looking for 2 chill teammates tonight.',
    chemistry: 92,
    verified: true,
    topicTags: ['MCU', 'FPS', 'Ranked'],
  },
  {
    id: 'u2',
    name: 'Jamie',
    age: 19,
    avatar: 'JM',
    avatarColor: '#a855f7',
    bio: 'Marvel nerd. Spider-Man is peak fiction, change my mind.',
    games: [{ name: 'Marvel Rivals', rank: 'Platinum' }, { name: 'Minecraft' }],
    interests: ['Marvel', 'Comics', 'Spider-Man', 'X-Men'],
    moods: ['Chill & Chat', 'Just Talk'],
    availability: ['Weekends', 'Late Nights'],
    status: 'Still convinced the next Avengers movie will be insane.',
    chemistry: 78,
    memberSince: '8 months',
    topicTags: ['MCU', 'X-Men', 'Spider-Man'],
  },
  {
    id: 'u3',
    name: 'Chris',
    age: 22,
    avatar: 'CR',
    avatarColor: '#f59e0b',
    bio: 'FUT grinder and Star Wars lore guy. Will talk for hours about the Mandalorian.',
    games: [{ name: 'FIFA', rank: 'Ultimate' }, { name: 'VALORANT', rank: 'Platinum 1' }],
    interests: ['Star Wars', 'Football', 'Sci-Fi', 'FPS'],
    moods: ['Ranked Focus', 'Try Something New'],
    availability: ['Mornings', 'Evenings'],
    status: 'Rebuilding my FUT squad after a rough weekend.',
    chemistry: 84,
    verified: true,
    topicTags: ['Star Wars', 'FIFA', 'FUT'],
  },
  {
    id: 'u4',
    name: 'Mia',
    age: 20,
    avatar: 'MI',
    avatarColor: '#ec4899',
    bio: 'Minecraft builder and anime binge-watcher. Looking for a chill server crew.',
    games: [{ name: 'Minecraft' }, { name: 'Stardew Valley' }],
    interests: ['Anime', 'Manga', 'K-Pop', 'Building'],
    moods: ['Chill & Chat', 'Just Talk'],
    availability: ['Afternoons', 'Weekends'],
    status: 'Looking for someone to build a mega base with.',
    chemistry: 64,
  },
  {
    id: 'u5',
    name: 'Jordan',
    age: 23,
    avatar: 'JD',
    avatarColor: '#14b8a6',
    bio: 'League one-trick and esports enthusiast. Bronze but I\'m learning.',
    games: [{ name: 'League of Legends', rank: 'Bronze 2' }, { name: 'Teamfight Tactics' }],
    interests: ['Esports', 'Anime', 'Board Games', 'Strategy'],
    moods: ['Try Something New', 'Chill & Chat'],
    availability: ['Evenings', 'Late Nights'],
    status: 'Watching LCK and contemplating my life choices.',
    chemistry: 71,
  },
  {
    id: 'u6',
    name: 'Sam',
    age: 24,
    avatar: 'SM',
    avatarColor: '#ef4444',
    bio: 'FIFA pro-am player and weekend FIFA champion. Competitive to the core.',
    games: [{ name: 'FIFA', rank: 'Elite' }, { name: 'Rocket League', rank: 'Diamond' }],
    interests: ['Football', 'Sports', 'MMA', 'FPS'],
    moods: ['Ranked Focus'],
    availability: ['Evenings', 'Weekends'],
    status: 'Running pro-am lobbies tonight. Spots open.',
    chemistry: 77,
  },
  {
    id: 'u7',
    name: 'Priya',
    age: 19,
    avatar: 'PR',
    avatarColor: '#8b5cf6',
    bio: 'Anime fan & board game addict. Currently obsessed with One Piece.',
    games: [{ name: 'Nintendo Switch Sports' }, { name: 'Animal Crossing' }],
    interests: ['Anime', 'One Piece', 'Board Games', 'Art'],
    moods: ['Just Talk', 'Chill & Chat'],
    availability: ['Afternoons', 'Weekends'],
    status: 'On episode 800+ of One Piece. Send help.',
    chemistry: 59,
    memberSince: '3 months',
    topicTags: ['Anime', 'One Piece', 'Board Games'],
  },
  {
    id: 'u8',
    name: 'Tyler',
    age: 21,
    avatar: 'TY',
    avatarColor: '#0ea5e9',
    bio: 'Valorant Radiant on a bad day. Coach me or let me coach you.',
    games: [{ name: 'VALORANT', rank: 'Immortal 3' }, { name: 'CS2', rank: 'Global' }],
    interests: ['FPS', 'Esports', 'Tech', 'Cars'],
    moods: ['Ranked Focus', 'Try Something New'],
    availability: ['Late Nights', 'Weekends'],
    status: 'Grinding clip reviews. Need IGL for ranked.',
    chemistry: 86,
    verified: true,
    topicTags: ['VALORANT', 'FPS', 'Ranked'],
  },
  {
    id: 'u9',
    name: 'Aisha',
    age: 20,
    avatar: 'AI',
    avatarColor: '#d946ef',
    bio: 'D&D dungeon master + Elden Ring enthusiast. Always down for a story.',
    games: [{ name: 'Elden Ring' }, { name: 'Baldur\'s Gate 3' }],
    interests: ['Fantasy', 'D&D', 'Anime', 'Books'],
    moods: ['Just Talk', 'Try Something New'],
    availability: ['Evenings', 'Weekends'],
    status: 'Building my next campaign. Anyone want to play?',
    chemistry: 68,
    memberSince: '1 year',
    topicTags: ['D&D', 'Fantasy', 'RPG'],
  },
  {
    id: 'u10',
    name: 'Leo',
    age: 25,
    avatar: 'LE',
    avatarColor: '#f97316',
    bio: 'Nintendo fanboy and game developer wannabe. Played every Zelda twice.',
    games: [{ name: 'Legend of Zelda' }, { name: 'Super Smash Bros', rank: 'Elite' }],
    interests: ['Nintendo', 'Game Dev', 'Retro Gaming', 'Comics'],
    moods: ['Chill & Chat', 'Try Something New'],
    availability: ['Mornings', 'Weekends'],
    status: 'Trying to beat my Smash tournament score.',
    chemistry: 73,
    verified: true,
    topicTags: ['Nintendo', 'Zelda', 'Smash'],
  },
  {
    id: 'u11',
    name: 'Zara',
    age: 18,
    avatar: 'ZR',
    avatarColor: '#10b981',
    bio: 'Marvel Rivals main. 100% Team Captain America.',
    games: [{ name: 'Marvel Rivals', rank: 'Diamond' }, { name: 'Fortnite', rank: 'Gold' }],
    interests: ['Marvel', 'Comics', 'FPS', 'Drawing'],
    moods: ['Ranked Focus', 'Chill & Chat'],
    availability: ['Evenings', 'Late Nights'],
    status: 'Cap main and proud of it.',
    chemistry: 91,
    memberSince: '5 months',
    topicTags: ['Marvel', 'Comics', 'X-Men'],
  },
  {
    id: 'u12',
    name: 'Marcus',
    age: 22,
    avatar: 'MK',
    avatarColor: '#64748b',
    bio: 'MMA fan and Street Fighter player. Scrappy but effective.',
    games: [{ name: 'Street Fighter 6', rank: 'Platinum' }, { name: 'Tekken 8' }],
    interests: ['MMA', 'Fighting Games', 'Sports', 'Hip-Hop'],
    moods: ['Ranked Focus', 'Try Something New'],
    availability: ['Evenings', 'Weekends'],
    status: 'Watching UFC and labbing combos.',
    chemistry: 55,
  },
  {
    id: 'u13',
    name: 'Nina',
    age: 21,
    avatar: 'NI',
    avatarColor: '#c084fc',
    bio: 'Star Wars lore encyclopedia. Ask me anything about the Clone Wars.',
    games: [{ name: 'Star Wars: SWTOR' }, { name: 'LEGO Star Wars' }],
    interests: ['Star Wars', 'Sci-Fi', 'Anime', 'Cosplay'],
    moods: ['Just Talk', 'Chill & Chat'],
    availability: ['Afternoons', 'Evenings'],
    status: 'Rewatching Clone Wars for the 4th time.',
    chemistry: 80,
    memberSince: '6 months',
    topicTags: ['Star Wars', 'Clone Wars', 'Lore'],
  },
  {
    id: 'u14',
    name: 'Kai',
    age: 23,
    avatar: 'KI',
    avatarColor: '#06b6d4',
    bio: 'Board game café regular. Catan champion 3 years running.',
    games: [{ name: 'Catan' }, { name: 'Wingspan' }],
    interests: ['Board Games', 'Strategy', 'Coffee', 'Podcasts'],
    moods: ['Just Talk', 'Chill & Chat'],
    availability: ['Weekends', 'Afternoons'],
    status: 'Hosting board game night this Saturday.',
    chemistry: 66,
    memberSince: '11 months',
    topicTags: ['Board Games', 'Strategy', 'D&D'],
  },
  {
    id: 'u15',
    name: 'Diane',
    age: 20,
    avatar: 'DI',
    avatarColor: '#fb923c',
    bio: 'FIFA career mode legend. Built 6 clubs from League 2 to Champions League.',
    games: [{ name: 'FIFA', rank: 'Gold 2' }, { name: 'Minecraft' }],
    interests: ['Football', 'Sports', 'Building', 'Reality TV'],
    moods: ['Chill & Chat', 'Try Something New'],
    availability: ['Evenings', 'Weekends'],
    status: 'Looking for a co-op Minecraft survival partner.',
    chemistry: 69,
    topicTags: ['FIFA', 'Football', 'Career Mode'],
  },
];

// ─── Communities ─────────────────────────────────────────────────────────────

export const COMMUNITIES: Community[] = [
  {
    id: 'c1',
    name: 'Marvel',
    icon: '🦸',
    category: 'Movies & TV',
    members: 48200,
    color: '#dc2626',
    bgColor: '#fef2f2',
    topics: ['MCU', 'Comics', 'X-Men', 'Spider-Man', 'Fan Theories', 'Marvel Rivals'],
    description: 'Earth\'s mightiest fandom. Discuss MCU, comics, fan theories and more.',
  },
  {
    id: 'c2',
    name: 'Star Wars',
    icon: '⭐',
    category: 'Movies & TV',
    members: 41000,
    color: '#f59e0b',
    bgColor: '#fffbeb',
    topics: ['Films', 'Clone Wars', 'The Mandalorian', 'Lore', 'Games', 'Comics'],
    description: 'A galaxy far, far away. Explore the Star Wars universe together.',
  },
  {
    id: 'c3',
    name: 'VALORANT',
    icon: '🎯',
    category: 'Games',
    members: 35600,
    color: '#ef4444',
    bgColor: '#fef2f2',
    topics: ['Ranked', 'Agent Tips', 'Clips', 'LFG', 'Updates', 'Esports'],
    description: 'Find teammates, share clips, and climb ranks together.',
  },
  {
    id: 'c4',
    name: 'FIFA',
    icon: '⚽',
    category: 'Games',
    members: 29100,
    color: '#22c55e',
    bgColor: '#f0fdf4',
    topics: ['FUT', 'Career Mode', 'Pro Clubs', 'Transfers', 'Tactics', 'Weekend League'],
    description: 'The ultimate football gaming community.',
  },
  {
    id: 'c5',
    name: 'Minecraft',
    icon: '⛏️',
    category: 'Games',
    members: 52300,
    color: '#65a30d',
    bgColor: '#f7fee7',
    topics: ['Survival', 'Builds', 'Mods', 'Servers', 'Redstone', 'Seeds'],
    description: 'Build, survive, create. Share your world with fellow crafters.',
  },
  {
    id: 'c6',
    name: 'Comics & Anime',
    icon: '📚',
    category: 'Anime',
    members: 22800,
    color: '#a855f7',
    bgColor: '#faf5ff',
    topics: ['Manga', 'Shonen', 'Seinen', 'DC', 'Marvel Comics', 'Recommendations'],
    description: 'Where comic books and anime collide.',
  },
  {
    id: 'c7',
    name: 'Board Games',
    icon: '🎲',
    category: 'Other',
    members: 8400,
    color: '#06b6d4',
    bgColor: '#ecfeff',
    topics: ['Catan', 'D&D', 'Strategy', 'Card Games', 'Reviews', 'Game Nights'],
    description: 'Tabletop enthusiasts unite. Find players and discover new games.',
  },
  {
    id: 'c8',
    name: 'League of Legends',
    icon: '⚔️',
    category: 'Games',
    members: 44700,
    color: '#c2a020',
    bgColor: '#fefce8',
    topics: ['Ranked', 'Champions', 'LCS', 'Tips', 'Patch Notes', 'LFG'],
    description: 'The Rift awaits. Find your lane partner.',
  },
  {
    id: 'c9',
    name: 'Nintendo',
    icon: '🎮',
    category: 'Games',
    members: 31500,
    color: '#ef4444',
    bgColor: '#fef2f2',
    topics: ['Zelda', 'Mario', 'Pokémon', 'Smash Bros', 'Switch', 'Splatoon'],
    description: 'For the players who still believe gaming should be fun.',
  },
  {
    id: 'c10',
    name: 'MMA & Combat',
    icon: '🥊',
    category: 'Sports',
    members: 16200,
    color: '#f97316',
    bgColor: '#fff7ed',
    topics: ['UFC', 'Boxing', 'Wrestling', 'Predictions', 'Training', 'Highlights'],
    description: 'Combat sports talk — from UFC predictions to training tips.',
  },
];

// ─── Conversations ────────────────────────────────────────────────────────────

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv1',
    userId: 'u1',
    messages: [
      { id: 'm1', senderId: 'u1', text: 'You playing tonight?', time: '7:42 PM' },
      { id: 'm2', senderId: 'me', text: 'Yeah probably around 8.', time: '7:44 PM' },
      { id: 'm3', senderId: 'u1', text: 'Ranked or chill?', time: '7:44 PM' },
      { id: 'm4', senderId: 'me', text: 'Ranked for sure. I\'m so close to Diamond 3.', time: '7:45 PM' },
      { id: 'm5', senderId: 'u1', text: 'Let\'s gooo 🔥 I\'ll be on by 8:15', time: '7:46 PM' },
    ],
  },
  {
    id: 'conv2',
    userId: 'u2',
    messages: [
      { id: 'm1', senderId: 'u2', text: 'Did you see the new Deadpool 3 trailer??', time: '3:21 PM' },
      { id: 'm2', senderId: 'me', text: 'YES. I screamed.', time: '3:24 PM' },
      { id: 'm3', senderId: 'u2', text: 'Hugh Jackman is back!! 😭', time: '3:25 PM' },
      { id: 'm4', senderId: 'me', text: 'Best casting decision in MCU history, no debate.', time: '3:26 PM' },
      { id: 'm5', senderId: 'u2', text: 'We need to watch it together when it drops', time: '3:27 PM' },
    ],
  },
  {
    id: 'conv3',
    userId: 'u3',
    messages: [
      { id: 'm1', senderId: 'me', text: 'Gg last game. That final minute was insane.', time: '10:12 PM' },
      { id: 'm2', senderId: 'u3', text: 'Bro I was sweating so hard 😂', time: '10:15 PM' },
      { id: 'm3', senderId: 'u3', text: 'Same time next weekend?', time: '10:16 PM' },
    ],
  },
  {
    id: 'conv4',
    userId: 'u8',
    messages: [
      { id: 'm1', senderId: 'u8', text: 'Need an IGL for ranked. You any good?', time: '6:05 PM' },
      { id: 'm2', senderId: 'me', text: 'Diamond 2 main. Can definitely IGL.', time: '6:08 PM' },
      { id: 'm3', senderId: 'u8', text: 'Let\'s queue up. Adding you now.', time: '6:09 PM' },
    ],
  },
  {
    id: 'conv5',
    userId: 'u11',
    messages: [
      { id: 'm1', senderId: 'u11', text: 'Marvel Rivals duo? I main Cap 🛡️', time: '9:33 PM' },
      { id: 'm2', senderId: 'me', text: 'Sure! I\'ll play Iron Man, we\'ll be unstoppable.', time: '9:35 PM' },
      { id: 'm3', senderId: 'u11', text: 'Perfect combo honestly haha', time: '9:36 PM' },
    ],
  },
];

// ─── Squads ──────────────────────────────────────────────────────────────────

export const INITIAL_SQUADS: Squad[] = [
  { id: 'sq1', name: 'Night Shift', game: 'VALORANT', members: 4, maxMembers: 5, joined: true },
  { id: 'sq2', name: 'Late Night FIFA', game: 'FIFA', members: 6, maxMembers: 8, joined: true },
  { id: 'sq3', name: 'Pixel Builders', game: 'Minecraft', members: 3, maxMembers: 6, joined: false },
  { id: 'sq4', name: 'Rivals Roster', game: 'Marvel Rivals', members: 4, maxMembers: 5, joined: false },
  { id: 'sq5', name: 'League Five', game: 'League of Legends', members: 3, maxMembers: 5, joined: false },
];

// ─── Party Posts ──────────────────────────────────────────────────────────────

export const INITIAL_PARTY_POSTS: PartyPost[] = [
  { id: 'p1', title: 'Need 2 for VALORANT ranked push', game: 'VALORANT', playersNeeded: 2, mood: 'Ranked Focus', startTime: 'Tonight 9 PM', joined: false, userId: 'u8' },
  { id: 'p2', title: 'Anyone up for Marvel Rivals?', game: 'Marvel Rivals', playersNeeded: 3, mood: 'Chill & Chat', startTime: 'Now', joined: false, userId: 'u11' },
  { id: 'p3', title: 'Looking for Minecraft survival players', game: 'Minecraft', playersNeeded: 2, mood: 'Chill & Chat', startTime: 'This weekend', joined: false, userId: 'u4' },
  { id: 'p4', title: 'FIFA pro-am lobby — need 3 more', game: 'FIFA', playersNeeded: 3, mood: 'Ranked Focus', startTime: 'Tonight 8 PM', joined: true, userId: 'u6' },
  { id: 'p5', title: 'Smash Bros casual session 🎮', game: 'Super Smash Bros', playersNeeded: 3, mood: 'Just Talk', startTime: 'Saturday afternoon', joined: false, userId: 'u10' },
  { id: 'p6', title: 'LoL flex queue — any role', game: 'League of Legends', playersNeeded: 4, mood: 'Ranked Focus', startTime: 'Tonight 10 PM', joined: false, userId: 'u5' },
  { id: 'p7', title: 'Minecraft server launch — fresh start!', game: 'Minecraft', playersNeeded: 5, mood: 'Try Something New', startTime: 'Sunday', joined: false, userId: 'u4' },
  { id: 'p8', title: 'Chill FIFA career mode tips session', game: 'FIFA', playersNeeded: 1, mood: 'Just Talk', startTime: 'Anytime', joined: false, userId: 'u15' },
  { id: 'p9', title: 'VALORANT aim training lobby', game: 'VALORANT', playersNeeded: 4, mood: 'Try Something New', startTime: 'Tomorrow morning', joined: false, userId: 'u1' },
  { id: 'p10', title: 'Elden Ring co-op — help me beat a boss!', game: 'Elden Ring', playersNeeded: 1, mood: 'Chill & Chat', startTime: 'Now', joined: false, userId: 'u9' },
];
