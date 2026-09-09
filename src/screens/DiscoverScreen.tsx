import { useState } from 'react';
import { Bell, X, Check, Gamepad2, Heart, MessageCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Avatar, ChemistryBadge, Chip } from '../components/ui';
import { type Mood } from '../data/mockData';

const MOODS: { label: Mood; icon: string; color: string; bg: string }[] = [
  { label: 'Chill & Chat', icon: '😌', color: '#0ea5e9', bg: '#e0f2fe' },
  { label: 'Ranked Focus', icon: '🎯', color: '#ef4444', bg: '#fee2e2' },
  { label: 'Try Something New', icon: '✨', color: '#8b5cf6', bg: '#ede9fe' },
  { label: 'Just Talk', icon: '💬', color: '#10b981', bg: '#d1fae5' },
];

export default function DiscoverScreen() {
  const {
    currentUser,
    discoverUsers,
    selectedMood,
    setSelectedMood,
    skipUser,
    expressInterest,
    matchedUser,
    dismissMatch,
    openConversation,
    navigateTo,
  } = useApp();

  const [animating, setAnimating] = useState<'left' | 'right' | null>(null);
  const currentProfile = discoverUsers[0];

  function handleSkip() {
    if (!currentProfile || animating) return;
    setAnimating('left');
    setTimeout(() => {
      skipUser(currentProfile.id);
      setAnimating(null);
    }, 350);
  }

  function handleInterested() {
    if (!currentProfile || animating) return;
    setAnimating('right');
    setTimeout(() => {
      expressInterest(currentProfile.id);
      setAnimating(null);
    }, 350);
  }

  const chemReasons = (profile: typeof currentProfile) => {
    if (!profile) return '';
    const sharedInterests = profile.interests.filter(i =>
      currentUser.interests.includes(i)
    );
    const sharedGames = profile.games.filter(g =>
      currentUser.games.some(cg => cg.name === g.name)
    );
    const moodMatch = profile.moods.some(m => currentUser.moods.includes(m));

    const parts = [];
    if (sharedGames.length > 0) parts.push(`${sharedGames.length} shared game${sharedGames.length > 1 ? 's' : ''}`);
    if (sharedInterests.length > 0) parts.push(`${sharedInterests.length} shared interest${sharedInterests.length > 1 ? 's' : ''}`);
    if (moodMatch) parts.push('matching mood');
    return parts.join(' and ') || 'compatible vibes';
  };

  return (
    <div className="screen-content">
      {/* Header */}
      <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar initials={currentUser.avatar} color={currentUser.avatarColor} size={38} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e' }}>{currentUser.name}</div>
            <div style={{ fontSize: 12, color: '#22c55e', fontWeight: 500 }}>● Online</div>
          </div>
        </div>
        <button
          style={{
            background: '#f4f4f8',
            border: 'none',
            borderRadius: 12,
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            position: 'relative',
          }}
        >
          <Bell size={18} color="#555" />
          <span style={{
            position: 'absolute',
            top: 8,
            right: 8,
            width: 7,
            height: 7,
            background: '#ef4444',
            borderRadius: '50%',
            border: '1.5px solid white',
          }} />
        </button>
      </div>

      {/* Mood Selector */}
      <div style={{ padding: '16px 20px 0' }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: '#888', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          What are you up to?
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {MOODS.map(mood => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(selectedMood === mood.label ? null : mood.label)}
              style={{
                border: selectedMood === mood.label ? `2px solid ${mood.color}` : '2px solid #ebebef',
                background: selectedMood === mood.label ? mood.bg : '#fff',
                borderRadius: 12,
                padding: '10px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                transition: 'all 0.15s',
                fontFamily: 'inherit',
              }}
            >
              <span style={{ fontSize: 18 }}>{mood.icon}</span>
              <span style={{
                fontSize: 13,
                fontWeight: 600,
                color: selectedMood === mood.label ? mood.color : '#444',
              }}>
                {mood.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Section title */}
      <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Best Match
        </span>
        <span style={{ fontSize: 12, color: '#aaa' }}>
          {discoverUsers.length} people online
        </span>
      </div>

      {/* Profile Card */}
      <div style={{ padding: '12px 20px 0' }}>
        {currentProfile ? (
          <div
            className={
              animating === 'left' ? 'animate-slide-left' : animating === 'right' ? 'animate-slide-right' : 'animate-fade-in'
            }
            key={currentProfile.id}
            style={{
              background: '#fff',
              border: '1.5px solid #ebebef',
              borderRadius: 20,
              overflow: 'hidden',
            }}
          >
            {/* Card top color strip */}
            <div style={{ height: 6, background: `linear-gradient(90deg, ${currentProfile.avatarColor}, ${currentProfile.avatarColor}88)` }} />

            <div style={{ padding: '20px 20px 0' }}>
              {/* Name row */}
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar initials={currentProfile.avatar} color={currentProfile.avatarColor} size={52} />
                  <div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#1a1a2e' }}>
                      {currentProfile.name}, {currentProfile.age}
                    </div>
                    <div style={{ fontSize: 12, color: '#22c55e', fontWeight: 500 }}>● Online now</div>
                  </div>
                </div>
                <ChemistryBadge score={currentProfile.chemistry ?? 75} />
              </div>

              {/* Games */}
              <div style={{ marginBottom: 12 }}>
                {currentProfile.games.map(g => (
                  <div key={g.name} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Gamepad2 size={13} color="#6c47ff" />
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#333' }}>{g.name}</span>
                    {g.rank && (
                      <span style={{
                        fontSize: 11,
                        color: '#6c47ff',
                        background: '#f0ebff',
                        padding: '1px 7px',
                        borderRadius: 99,
                        fontWeight: 600,
                      }}>{g.rank}</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Interests */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
                {currentProfile.interests.map(i => (
                  <Chip key={i} color="#6c47ff" bg="#f0ebff">{i}</Chip>
                ))}
              </div>

              {/* Status */}
              <div style={{
                background: '#f8f8fc',
                borderRadius: 12,
                padding: '10px 14px',
                marginBottom: 14,
                borderLeft: '3px solid #6c47ff',
              }}>
                <span style={{ fontSize: 13, color: '#444', fontStyle: 'italic' }}>
                  "{currentProfile.status}"
                </span>
              </div>

              {/* Chemistry reason */}
              <div style={{
                background: '#f0fdf4',
                border: '1px solid #bbf7d0',
                borderRadius: 10,
                padding: '8px 12px',
                marginBottom: 16,
                display: 'flex',
                alignItems: 'flex-start',
                gap: 6,
              }}>
                <span style={{ fontSize: 14 }}>💚</span>
                <span style={{ fontSize: 12, color: '#15803d' }}>
                  <strong>High compatibility</strong> — you share {chemReasons(currentProfile)}.
                </span>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{
              display: 'flex',
              borderTop: '1.5px solid #f0f0f5',
            }}>
              <button
                onClick={handleSkip}
                style={{
                  flex: 1,
                  padding: '16px 0',
                  background: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#999',
                  fontFamily: 'inherit',
                  transition: 'background 0.1s',
                  borderRight: '1px solid #f0f0f5',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <X size={18} /> Skip
              </button>
              <button
                onClick={handleInterested}
                style={{
                  flex: 1,
                  padding: '16px 0',
                  background: '#fff',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 6,
                  fontSize: 14,
                  fontWeight: 600,
                  color: '#22c55e',
                  fontFamily: 'inherit',
                  transition: 'background 0.1s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#f0fdf4'}
                onMouseLeave={e => e.currentTarget.style.background = '#fff'}
              >
                <Check size={18} /> Interested
              </button>
            </div>
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: '#f8f8fc',
            borderRadius: 20,
            border: '1.5px solid #ebebef',
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🎮</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#333', marginBottom: 6 }}>
              You've seen everyone!
            </div>
            <div style={{ fontSize: 13, color: '#888', marginBottom: 20 }}>
              Change your mood filter to discover more people.
            </div>
            <button
              onClick={() => setSelectedMood(null)}
              className="btn-primary"
              style={{ fontSize: 13 }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Upcoming cards preview */}
      {discoverUsers.length > 1 && (
        <div style={{ padding: '12px 20px 20px' }}>
          <div style={{ fontSize: 12, color: '#aaa', marginBottom: 8, fontWeight: 500 }}>Up next</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {discoverUsers.slice(1, 4).map(u => (
              <div key={u.id} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                background: '#f8f8fc',
                borderRadius: 10,
                padding: '6px 10px',
                border: '1px solid #ebebef',
              }}>
                <Avatar initials={u.avatar} color={u.avatarColor} size={24} />
                <span style={{ fontSize: 12, fontWeight: 600, color: '#555' }}>{u.name}</span>
                <span style={{ fontSize: 11, color: u.chemistry && u.chemistry >= 80 ? '#22c55e' : '#aaa', fontWeight: 600 }}>
                  {u.chemistry}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Match overlay */}
      {matchedUser && (
        <div className="match-overlay">
          <div className="match-card animate-match-pop">
            <div style={{ fontSize: 40, marginBottom: 8 }}>🎮</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a2e', margin: '0 0 6px' }}>
              It's a Match!
            </h2>
            <p style={{ fontSize: 14, color: '#666', margin: '0 0 20px' }}>
              You and <strong>{matchedUser.name}</strong> both want to play tonight.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 20 }}>
              <Avatar initials={currentUser.avatar} color={currentUser.avatarColor} size={52} />
              <Heart size={20} color="#ef4444" fill="#ef4444" />
              <Avatar initials={matchedUser.avatar} color={matchedUser.avatarColor} size={52} />
            </div>
            <ChemistryBadge score={matchedUser.chemistry ?? 80} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
              <button
                className="btn-primary"
                style={{ width: '100%' }}
                onClick={() => {
                  dismissMatch();
                  openConversation(matchedUser.id);
                }}
              >
                <MessageCircle size={15} style={{ display: 'inline', marginRight: 6 }} />
                Message {matchedUser.name}
              </button>
              <button
                className="btn-secondary"
                style={{ width: '100%' }}
                onClick={dismissMatch}
              >
                Keep Discovering
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
