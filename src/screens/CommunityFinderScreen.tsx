import { useState, useMemo } from 'react';
import { ArrowLeft, RefreshCw, MessageCircle, Calendar } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { type Community, USERS } from '../data/mockData';
import { Avatar, Chip } from '../components/ui';

interface Props {
  community: Community;
  onBack: () => void;
}

export default function CommunityFinderScreen({ community, onBack }: Props) {
  const { openConversation } = useApp();
  const [mode, setMode] = useState<'random' | 'topic'>('random');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [personIndex, setPersonIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  // Filter users who have topics matching the community
  const relevantUsers = useMemo(() => {
    return USERS.filter(u =>
      u.interests.some(i =>
        community.topics.some(t => t.toLowerCase().includes(i.toLowerCase()) || i.toLowerCase().includes(t.toLowerCase()))
      ) || u.topicTags?.some(tag =>
        community.name.toLowerCase().includes(tag.toLowerCase()) ||
        tag.toLowerCase().includes(community.name.toLowerCase())
      )
    );
  }, [community]);

  const filteredUsers = useMemo(() => {
    if (mode === 'topic' && selectedTopic) {
      const base = relevantUsers.length > 0 ? relevantUsers : USERS;
      return base.filter(u =>
        u.topicTags?.some(t => t.toLowerCase().includes(selectedTopic.toLowerCase())) ||
        u.interests.some(i => i.toLowerCase().includes(selectedTopic.toLowerCase()))
      );
    }
    return relevantUsers.length > 0 ? relevantUsers : USERS;
  }, [relevantUsers, mode, selectedTopic]);

  const displayUsers = filteredUsers.length > 0 ? filteredUsers : USERS;
  const currentPerson = displayUsers[personIndex % displayUsers.length];

  function randomize() {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setPersonIndex(prev => (prev + 1) % displayUsers.length);
      setAnimating(false);
    }, 200);
  }

  return (
    <div className="screen-content">
      {/* Header */}
      <div style={{ padding: '16px 20px 0', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <button
          onClick={onBack}
          style={{
            background: '#f4f4f8',
            border: 'none',
            borderRadius: 10,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <ArrowLeft size={18} color="#333" />
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: 24 }}>{community.icon}</span>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: '#1a1a2e' }}>{community.name}</div>
            <div style={{ fontSize: 12, color: '#888' }}>Find someone to talk to.</div>
          </div>
        </div>
      </div>

      {/* Mode toggle */}
      <div style={{ padding: '0 20px 16px' }}>
        <div style={{
          background: '#f4f4f8',
          borderRadius: 12,
          padding: 4,
          display: 'flex',
        }}>
          {(['random', 'topic'] as const).map(m => (
            <button
              key={m}
              onClick={() => { setMode(m); setSelectedTopic(null); }}
              style={{
                flex: 1,
                border: 'none',
                borderRadius: 9,
                padding: '8px 0',
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                background: mode === m ? '#fff' : 'transparent',
                color: mode === m ? '#1a1a2e' : '#888',
                boxShadow: mode === m ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
                transition: 'all 0.15s',
              }}
            >
              {m === 'random' ? 'Random People' : 'Choose Topic'}
            </button>
          ))}
        </div>
      </div>

      {/* Topic chips (if mode === topic) */}
      {mode === 'topic' && (
        <div style={{ padding: '0 20px 16px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {community.topics.map(topic => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(selectedTopic === topic ? null : topic)}
                style={{
                  border: selectedTopic === topic ? `2px solid ${community.color}` : '2px solid #ebebef',
                  background: selectedTopic === topic ? `${community.color}15` : '#fff',
                  color: selectedTopic === topic ? community.color : '#555',
                  borderRadius: 99,
                  padding: '7px 14px',
                  fontSize: 13,
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.15s',
                }}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Person card */}
      <div style={{ padding: '0 20px' }}>
        <div
          className={animating ? 'animate-fade-in' : ''}
          key={`${currentPerson.id}-${personIndex}`}
          style={{
            background: '#fff',
            border: '1.5px solid #ebebef',
            borderRadius: 20,
            overflow: 'hidden',
            opacity: animating ? 0 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          <div style={{ height: 5, background: community.color }} />
          <div style={{ padding: '18px 18px 0' }}>
            {/* Person header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <Avatar initials={currentPerson.avatar} color={currentPerson.avatarColor} size={50} />
              <div>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#1a1a2e' }}>
                  {currentPerson.name}, {currentPerson.age}
                </div>
                {currentPerson.memberSince && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <Calendar size={11} color="#aaa" />
                    <span style={{ fontSize: 12, color: '#aaa' }}>Member for {currentPerson.memberSince}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Topics */}
            {currentPerson.topicTags && currentPerson.topicTags.length > 0 && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: '#aaa', fontWeight: 600, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Topics
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {currentPerson.topicTags.map(tag => (
                    <span key={tag} style={{
                      background: `${community.color}15`,
                      color: community.color,
                      padding: '4px 10px',
                      borderRadius: 99,
                      fontSize: 12,
                      fontWeight: 600,
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Status */}
            <div style={{
              background: '#f8f8fc',
              borderRadius: 10,
              padding: '10px 12px',
              marginBottom: 16,
              borderLeft: `3px solid ${community.color}`,
            }}>
              <span style={{ fontSize: 13, color: '#444', fontStyle: 'italic' }}>
                "{currentPerson.status}"
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', borderTop: '1.5px solid #f0f0f5' }}>
            <button
              onClick={randomize}
              style={{
                flex: 1,
                padding: '14px 0',
                background: '#fff',
                border: 'none',
                borderRight: '1px solid #f0f0f5',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                color: '#666',
                fontFamily: 'inherit',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f8f8fc'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              <RefreshCw size={15} /> Skip
            </button>
            <button
              onClick={randomize}
              style={{
                flex: 1,
                padding: '14px 0',
                background: '#fff',
                border: 'none',
                borderRight: '1px solid #f0f0f5',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                color: '#6c47ff',
                fontFamily: 'inherit',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f5f0ff'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              <RefreshCw size={15} /> Randomize
            </button>
            <button
              onClick={() => openConversation(currentPerson.id)}
              style={{
                flex: 1,
                padding: '14px 0',
                background: '#fff',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 6,
                fontSize: 13,
                fontWeight: 600,
                color: '#22c55e',
                fontFamily: 'inherit',
                transition: 'background 0.1s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#f0fdf4'}
              onMouseLeave={e => e.currentTarget.style.background = '#fff'}
            >
              <MessageCircle size={15} /> Message
            </button>
          </div>
        </div>
      </div>

      {/* People online */}
      <div style={{ padding: '16px 20px 20px' }}>
        <div style={{ fontSize: 12, color: '#aaa', fontWeight: 600, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Also in {community.name}
        </div>
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto' }}>
          {displayUsers.filter(u => u.id !== currentPerson.id).slice(0, 6).map(u => (
            <div key={u.id} style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              minWidth: 52,
              cursor: 'pointer',
            }} onClick={() => openConversation(u.id)}>
              <Avatar initials={u.avatar} color={u.avatarColor} size={40} />
              <span style={{ fontSize: 10, color: '#555', fontWeight: 600, textAlign: 'center' }}>{u.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
