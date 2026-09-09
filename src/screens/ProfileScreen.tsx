import { useState, type ReactNode } from 'react';
import { Edit2, Check, X, Shield, Plus, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Avatar } from '../components/ui';
import { type Mood, type GameEntry } from '../data/mockData';

const ALL_INTERESTS = ['Marvel', 'Star Wars', 'Anime', 'Football', 'FPS', 'Esports', 'Strategy', 'Comics', 'Sci-Fi', 'RPG', 'Manga', 'Board Games', 'Nintendo', 'One Piece', 'MMA', 'Fantasy', 'D&D', 'K-Pop', 'Hip-Hop', 'Art', 'Building', 'Tech', 'Cars', 'Books', 'Cosplay', 'Game Dev', 'Retro Gaming'];
const ALL_MOODS: Mood[] = ['Chill & Chat', 'Ranked Focus', 'Try Something New', 'Just Talk'];
const ALL_AVAILABILITY = ['Mornings', 'Afternoons', 'Evenings', 'Late Nights', 'Weekends'];
const ALL_GAMES = ['VALORANT', 'FIFA', 'Minecraft', 'Marvel Rivals', 'League of Legends', 'Super Smash Bros', 'Elden Ring', 'Fortnite', 'CS2', 'Teamfight Tactics', 'Nintendo Switch Sports', 'Animal Crossing', 'Street Fighter 6', 'Tekken 8'];
const RANKS: Record<string, string[]> = {
  'VALORANT': ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond 1', 'Diamond 2', 'Diamond 3', 'Immortal 1', 'Immortal 2', 'Immortal 3', 'Radiant'],
  'FIFA': ['Bronze', 'Silver', 'Gold 1', 'Gold 2', 'Gold 3', 'Platinum', 'Elite', 'Ultimate'],
  'League of Legends': ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Challenger'],
  'Marvel Rivals': ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Grandmaster'],
};

const GAME_EMOJI: Record<string, string> = {
  'VALORANT': '🎯',
  'FIFA': '⚽',
  'Minecraft': '⛏️',
  'Marvel Rivals': '🦸',
  'League of Legends': '⚔️',
  'Super Smash Bros': '🎮',
  'Elden Ring': '⚔️',
  'Fortnite': '🏗️',
};

const AVATAR_COLORS = ['#6c47ff', '#22c55e', '#a855f7', '#f59e0b', '#ec4899', '#14b8a6', '#ef4444', '#0ea5e9'];

export default function ProfileScreen() {
  const { currentUser, updateProfile } = useApp();
  const [editing, setEditing] = useState(false);

  // Edit state
  const [editName, setEditName] = useState(currentUser.name);
  const [editBio, setEditBio] = useState(currentUser.bio);
  const [editGames, setEditGames] = useState<GameEntry[]>(currentUser.games);
  const [editInterests, setEditInterests] = useState<string[]>(currentUser.interests);
  const [editAvailability, setEditAvailability] = useState<string[]>(currentUser.availability);
  const [editColor, setEditColor] = useState(currentUser.avatarColor);
  const [newGame, setNewGame] = useState('');
  const [newGameRank, setNewGameRank] = useState('');

  function openEdit() {
    setEditName(currentUser.name);
    setEditBio(currentUser.bio);
    setEditGames(currentUser.games);
    setEditInterests(currentUser.interests);
    setEditAvailability(currentUser.availability);
    setEditColor(currentUser.avatarColor);
    setEditing(true);
  }

  function saveEdit() {
    updateProfile({
      name: editName.trim() || currentUser.name,
      bio: editBio,
      games: editGames,
      interests: editInterests,
      availability: editAvailability,
      avatarColor: editColor,
      avatar: (editName.trim() || currentUser.name).slice(0, 2).toUpperCase(),
    });
    setEditing(false);
  }

  function toggleInterest(interest: string) {
    setEditInterests(prev =>
      prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest]
    );
  }

  function toggleAvailability(a: string) {
    setEditAvailability(prev =>
      prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
    );
  }

  function addGame() {
    if (!newGame) return;
    setEditGames(prev => [...prev, { name: newGame, rank: newGameRank || undefined }]);
    setNewGame('');
    setNewGameRank('');
  }

  function removeGame(idx: number) {
    setEditGames(prev => prev.filter((_, i) => i !== idx));
  }

  if (editing) {
    return (
      <div className="screen-content">
        <div style={{ padding: '16px 20px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
            <h1 style={{ fontSize: 20, fontWeight: 800, color: '#1a1a2e', margin: 0 }}>Edit Profile</h1>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                onClick={() => setEditing(false)}
                style={{ background: '#f4f4f8', border: 'none', borderRadius: 10, padding: '8px 14px', cursor: 'pointer', fontSize: 13, fontWeight: 600, color: '#666', fontFamily: 'inherit' }}
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="btn-primary"
                style={{ padding: '8px 16px', fontSize: 13, display: 'flex', alignItems: 'center', gap: 5 }}
              >
                <Check size={14} /> Save
              </button>
            </div>
          </div>

          {/* Avatar color */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
            <Avatar
              initials={(editName.trim() || 'ME').slice(0, 2).toUpperCase()}
              color={editColor}
              size={60}
            />
            <div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#555', marginBottom: 8 }}>Avatar Color</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {AVATAR_COLORS.map(c => (
                  <div
                    key={c}
                    onClick={() => setEditColor(c)}
                    style={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: c,
                      cursor: 'pointer',
                      border: editColor === c ? '3px solid #1a1a2e' : '2px solid transparent',
                      outline: editColor === c ? '2px solid white' : 'none',
                      outlineOffset: '-3px',
                      transition: 'all 0.15s',
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingBottom: 24 }}>
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>Name</label>
              <input
                className="input-base"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>Bio</label>
              <textarea
                className="input-base"
                value={editBio}
                onChange={e => setEditBio(e.target.value)}
                placeholder="Tell others about yourself..."
                rows={3}
                style={{ resize: 'none', lineHeight: 1.5 }}
              />
            </div>

            {/* Games */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 8 }}>Games</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 10 }}>
                {editGames.map((g, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    background: '#f8f8fc', borderRadius: 10, padding: '8px 12px',
                    border: '1.5px solid #ebebef',
                  }}>
                    <div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{g.name}</span>
                      {g.rank && <span style={{ fontSize: 12, color: '#6c47ff', marginLeft: 8 }}>{g.rank}</span>}
                    </div>
                    <button
                      onClick={() => removeGame(i)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#ef4444' }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <select
                  className="input-base"
                  value={newGame}
                  onChange={e => setNewGame(e.target.value)}
                  style={{ flex: 2 }}
                >
                  <option value="">Add game...</option>
                  {ALL_GAMES.filter(g => !editGames.some(eg => eg.name === g)).map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                {RANKS[newGame] && (
                  <select
                    className="input-base"
                    value={newGameRank}
                    onChange={e => setNewGameRank(e.target.value)}
                    style={{ flex: 1 }}
                  >
                    <option value="">Rank</option>
                    {RANKS[newGame].map(r => <option key={r} value={r}>{r}</option>)}
                  </select>
                )}
                <button
                  onClick={addGame}
                  disabled={!newGame}
                  className="btn-primary"
                  style={{ padding: '0 14px', opacity: newGame ? 1 : 0.4 }}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Interests */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 8 }}>
                Interests <span style={{ color: '#aaa', fontWeight: 400 }}>({editInterests.length} selected)</span>
              </label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ALL_INTERESTS.map(interest => (
                  <button
                    key={interest}
                    onClick={() => toggleInterest(interest)}
                    style={{
                      border: editInterests.includes(interest) ? '2px solid #6c47ff' : '2px solid #ebebef',
                      background: editInterests.includes(interest) ? '#6c47ff' : '#fff',
                      color: editInterests.includes(interest) ? '#fff' : '#555',
                      borderRadius: 99,
                      padding: '6px 12px',
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'all 0.15s',
                    }}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div>
              <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 8 }}>Availability</label>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ALL_AVAILABILITY.map(a => (
                  <button
                    key={a}
                    onClick={() => toggleAvailability(a)}
                    style={{
                      border: editAvailability.includes(a) ? '2px solid #6c47ff' : '2px solid #ebebef',
                      background: editAvailability.includes(a) ? '#6c47ff' : '#fff',
                      color: editAvailability.includes(a) ? '#fff' : '#555',
                      borderRadius: 99,
                      padding: '7px 14px',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontFamily: 'inherit',
                      transition: 'all 0.15s',
                    }}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Profile view
  return (
    <div className="screen-content">
      <div style={{ padding: '16px 20px 0' }}>
        {/* Profile header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <Avatar initials={currentUser.avatar} color={currentUser.avatarColor} size={64} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: '#1a1a2e' }}>{currentUser.name}</span>
                {currentUser.verified && (
                  <span style={{
                    background: '#dbeafe',
                    color: '#1d4ed8',
                    padding: '2px 8px',
                    borderRadius: 99,
                    fontSize: 11,
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                  }}>
                    <Shield size={10} /> Verified
                  </span>
                )}
              </div>
              <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 600 }}>● Online</div>
            </div>
          </div>
          <button
            onClick={openEdit}
            style={{
              background: '#f4f4f8',
              border: 'none',
              borderRadius: 10,
              padding: '8px 14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 600,
              color: '#555',
              fontFamily: 'inherit',
              transition: 'background 0.1s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#ebebef'}
            onMouseLeave={e => e.currentTarget.style.background = '#f4f4f8'}
          >
            <Edit2 size={13} /> Edit
          </button>
        </div>

        {/* Bio */}
        <div style={{
          background: '#f8f8fc',
          borderRadius: 12,
          padding: '12px 14px',
          marginBottom: 20,
          fontSize: 14,
          color: '#444',
          lineHeight: 1.5,
          border: '1.5px solid #ebebef',
        }}>
          {currentUser.bio}
        </div>

        {/* Games */}
        <Section title="Games">
          {currentUser.games.map(g => (
            <div key={g.name} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#fff',
              border: '1.5px solid #ebebef',
              borderRadius: 12,
              padding: '12px 14px',
              marginBottom: 8,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 20 }}>{GAME_EMOJI[g.name] ?? '🎮'}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: '#1a1a2e' }}>{g.name}</span>
              </div>
              {g.rank && (
                <span style={{
                  background: '#f0ebff',
                  color: '#6c47ff',
                  padding: '4px 10px',
                  borderRadius: 99,
                  fontSize: 12,
                  fontWeight: 700,
                }}>
                  {g.rank}
                </span>
              )}
            </div>
          ))}
        </Section>

        {/* Interests */}
        <Section title="Interests">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {currentUser.interests.map(i => (
              <span key={i} style={{
                background: '#f0ebff',
                color: '#6c47ff',
                padding: '6px 12px',
                borderRadius: 99,
                fontSize: 13,
                fontWeight: 600,
              }}>
                {i}
              </span>
            ))}
          </div>
        </Section>

        {/* Availability */}
        <Section title="Availability">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, paddingBottom: 8 }}>
            {currentUser.availability.map(a => (
              <span key={a} style={{
                background: '#d1fae5',
                color: '#059669',
                padding: '6px 12px',
                borderRadius: 99,
                fontSize: 13,
                fontWeight: 600,
              }}>
                {a}
              </span>
            ))}
          </div>
        </Section>

        {/* Badges */}
        <Section title="Badges">
          <div style={{ display: 'flex', gap: 10, paddingBottom: 16 }}>
            {[
              { icon: '🎮', label: 'Gamer', color: '#f0ebff', textColor: '#6c47ff' },
              { icon: '✅', label: 'Verified', color: '#dbeafe', textColor: '#1d4ed8' },
              { icon: '🔥', label: 'Active', color: '#fee2e2', textColor: '#dc2626' },
              { icon: '🤝', label: 'Friendly', color: '#d1fae5', textColor: '#059669' },
            ].map(badge => (
              <div key={badge.label} style={{
                background: badge.color,
                borderRadius: 10,
                padding: '8px 12px',
                textAlign: 'center',
                minWidth: 64,
              }}>
                <div style={{ fontSize: 18, marginBottom: 2 }}>{badge.icon}</div>
                <div style={{ fontSize: 10, fontWeight: 700, color: badge.textColor }}>{badge.label}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ fontSize: 13, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
        {title}
      </div>
      {children}
    </div>
  );
}
