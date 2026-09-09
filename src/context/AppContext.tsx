import { createContext, useContext, useState, useEffect, useCallback, useMemo, type ReactNode } from 'react';
import {
  CURRENT_USER,
  USERS,
  COMMUNITIES,
  INITIAL_CONVERSATIONS,
  INITIAL_SQUADS,
  INITIAL_PARTY_POSTS,
  type User,
  type Community,
  type Conversation,
  type Message,
  type Squad,
  type PartyPost,
  type Mood,
} from '../data/mockData';

interface AppContextType {
  // Profile
  currentUser: User;
  updateProfile: (updates: Partial<User>) => void;

  // Discover
  discoverUsers: User[];
  selectedMood: Mood | null;
  setSelectedMood: (mood: Mood | null) => void;
  skipUser: (userId: string) => void;
  expressInterest: (userId: string) => void;
  matchedUser: User | null;
  dismissMatch: () => void;
  skippedIds: string[];

  // Communities
  communities: Community[];
  joinedCommunityIds: Set<string>;
  toggleJoinCommunity: (id: string) => void;
  selectedCommunity: Community | null;
  setSelectedCommunity: (c: Community | null) => void;

  // Chat
  conversations: Conversation[];
  openConversation: (userId: string) => void;
  sendMessage: (conversationId: string, text: string) => void;
  activeConversationId: string | null;
  setActiveConversationId: (id: string | null) => void;

  // Squad
  squads: Squad[];
  toggleSquad: (id: string) => void;
  partyPosts: PartyPost[];
  toggleParty: (id: string) => void;
  createParty: (post: Omit<PartyPost, 'id' | 'joined' | 'userId'>) => void;

  // Navigation helper
  navigateTo: (screen: string) => void;
  currentScreen: string;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('squadup_profile');
    return saved ? { ...CURRENT_USER, ...JSON.parse(saved) } : CURRENT_USER;
  });

  const [selectedMood, setSelectedMood] = useState<Mood | null>(null);
  const [skippedIds, setSkippedIds] = useState<string[]>([]);
  const [matchedUser, setMatchedUser] = useState<User | null>(null);

  const [joinedCommunityIds, setJoinedCommunityIds] = useState<Set<string>>(new Set(['c1', 'c3']));
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);

  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  const [squads, setSquads] = useState<Squad[]>(INITIAL_SQUADS);
  const [partyPosts, setPartyPosts] = useState<PartyPost[]>(INITIAL_PARTY_POSTS);

  const [currentScreen, setCurrentScreen] = useState('discover');

  // Persist profile
  useEffect(() => {
    localStorage.setItem('squadup_profile', JSON.stringify(currentUser));
  }, [currentUser]);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updates }));
  }, []);

  // Compute discover users — filter by mood and skipped
  const discoverUsers = useMemo(() => {
    let users = USERS.filter(u => !skippedIds.includes(u.id));
    if (selectedMood) {
      users = users.filter(u => u.moods.includes(selectedMood));
      if (users.length === 0) users = USERS.filter(u => !skippedIds.includes(u.id));
    }
    return users.sort((a, b) => (b.chemistry ?? 0) - (a.chemistry ?? 0));
  }, [skippedIds, selectedMood]);

  const skipUser = useCallback((userId: string) => {
    setSkippedIds(prev => [...prev, userId]);
  }, []);

  const expressInterest = useCallback((userId: string) => {
    const user = USERS.find(u => u.id === userId);
    if (user) setMatchedUser(user);
    setSkippedIds(prev => [...prev, userId]);
  }, []);

  const dismissMatch = useCallback(() => {
    setMatchedUser(null);
  }, []);

  const toggleJoinCommunity = useCallback((id: string) => {
    setJoinedCommunityIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const openConversation = useCallback((userId: string) => {
    const existing = conversations.find(c => c.userId === userId);
    if (existing) {
      setActiveConversationId(existing.id);
    } else {
      const newConv: Conversation = {
        id: `conv_${userId}_${Date.now()}`,
        userId,
        messages: [],
      };
      setConversations(prev => [newConv, ...prev]);
      setActiveConversationId(newConv.id);
    }
    setCurrentScreen('chat');
  }, [conversations]);

  const sendMessage = useCallback((conversationId: string, text: string) => {
    const newMsg: Message = {
      id: `msg_${Date.now()}`,
      senderId: 'me',
      text,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    };
    setConversations(prev =>
      prev.map(c =>
        c.id === conversationId
          ? { ...c, messages: [...c.messages, newMsg] }
          : c
      )
    );
  }, []);

  const toggleSquad = useCallback((id: string) => {
    setSquads(prev =>
      prev.map(s => s.id === id ? { ...s, joined: !s.joined, members: s.joined ? s.members - 1 : s.members + 1 } : s)
    );
  }, []);

  const toggleParty = useCallback((id: string) => {
    setPartyPosts(prev =>
      prev.map(p => p.id === id ? { ...p, joined: !p.joined } : p)
    );
  }, []);

  const createParty = useCallback((post: Omit<PartyPost, 'id' | 'joined' | 'userId'>) => {
    const newPost: PartyPost = {
      ...post,
      id: `party_${Date.now()}`,
      joined: true,
      userId: 'me',
    };
    setPartyPosts(prev => [newPost, ...prev]);
  }, []);

  const navigateTo = useCallback((screen: string) => {
    setCurrentScreen(screen);
  }, []);

  return (
    <AppContext.Provider value={{
      currentUser,
      updateProfile,
      discoverUsers,
      selectedMood,
      setSelectedMood,
      skipUser,
      expressInterest,
      matchedUser,
      dismissMatch,
      skippedIds,
      communities: COMMUNITIES,
      joinedCommunityIds,
      toggleJoinCommunity,
      selectedCommunity,
      setSelectedCommunity,
      conversations,
      openConversation,
      sendMessage,
      activeConversationId,
      setActiveConversationId,
      squads,
      toggleSquad,
      partyPosts,
      toggleParty,
      createParty,
      navigateTo,
      currentScreen,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
