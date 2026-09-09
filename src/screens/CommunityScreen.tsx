import { useState } from 'react';
import { Search, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { type Community } from '../data/mockData';
import CommunityFinderScreen from './CommunityFinderScreen';

const CATEGORIES = ['All', 'Games', 'Movies & TV', 'Sports', 'Anime', 'Other'] as const;

const CATEGORY_COLORS: Record<string, { color: string; bg: string }> = {
  'Games': { color: '#6c47ff', bg: '#f0ebff' },
  'Movies & TV': { color: '#ef4444', bg: '#fee2e2' },
  'Sports': { color: '#f59e0b', bg: '#fef3c7' },
  'Anime': { color: '#a855f7', bg: '#f3e8ff' },
  'Other': { color: '#06b6d4', bg: '#ecfeff' },
};

function formatMembers(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export default function CommunityScreen() {
  const { communities, joinedCommunityIds, toggleJoinCommunity, selectedCommunity, setSelectedCommunity } = useApp();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  if (selectedCommunity) {
    return <CommunityFinderScreen community={selectedCommunity} onBack={() => setSelectedCommunity(null)} />;
  }

  const filtered = communities.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || c.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="screen-content">
      {/* Header */}
      <div style={{ padding: '16px 20px 0' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a2e', margin: '0 0 4px' }}>
          Communities
        </h1>
        <p style={{ fontSize: 13, color: '#888', margin: '0 0 16px' }}>
          Find your people by fandom, game, or interest.
        </p>

        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <Search
            size={16}
            color="#aaa"
            style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)' }}
          />
          <input
            id="community-search"
            className="input-base"
            placeholder="Search communities..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 38 }}
          />
        </div>

        {/* Category filter */}
        <div style={{ display: 'flex', gap: 6, overflowX: 'auto', paddingBottom: 4 }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                border: 'none',
                borderRadius: 99,
                padding: '7px 14px',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'inherit',
                background: activeCategory === cat ? '#6c47ff' : '#f4f4f8',
                color: activeCategory === cat ? '#fff' : '#666',
                transition: 'all 0.15s',
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{ padding: '16px 20px 20px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {filtered.map(community => (
          <CommunityCard
            key={community.id}
            community={community}
            joined={joinedCommunityIds.has(community.id)}
            onJoin={() => toggleJoinCommunity(community.id)}
            onOpen={() => setSelectedCommunity(community)}
          />
        ))}
        {filtered.length === 0 && (
          <div style={{
            gridColumn: '1 / -1',
            textAlign: 'center',
            padding: '40px 0',
            color: '#aaa',
            fontSize: 14,
          }}>
            No communities found.
          </div>
        )}
      </div>
    </div>
  );
}

function CommunityCard({
  community,
  joined,
  onJoin,
  onOpen,
}: {
  community: Community;
  joined: boolean;
  onJoin: () => void;
  onOpen: () => void;
}) {
  const catColors = CATEGORY_COLORS[community.category] ?? { color: '#6c47ff', bg: '#f0ebff' };

  return (
    <div
      style={{
        background: '#fff',
        border: '1.5px solid #ebebef',
        borderRadius: 16,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.transform = '';
        (e.currentTarget as HTMLElement).style.boxShadow = '';
      }}
      onClick={onOpen}
    >
      {/* Color bar */}
      <div style={{ height: 4, background: community.color }} />

      <div style={{ padding: '14px 12px 12px' }}>
        <div style={{ fontSize: 28, marginBottom: 6 }}>{community.icon}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', marginBottom: 4, lineHeight: 1.2 }}>
          {community.name}
        </div>
        <div style={{ marginBottom: 10 }}>
          <span style={{
            fontSize: 10,
            fontWeight: 600,
            color: catColors.color,
            background: catColors.bg,
            padding: '2px 7px',
            borderRadius: 99,
          }}>
            {community.category}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 }}>
          <Users size={12} color="#aaa" />
          <span style={{ fontSize: 11, color: '#aaa', fontWeight: 500 }}>
            {formatMembers(community.members)} members
          </span>
        </div>
        <button
          onClick={e => { e.stopPropagation(); onJoin(); }}
          style={{
            width: '100%',
            border: joined ? '1.5px solid #ebebef' : `1.5px solid ${community.color}`,
            background: joined ? '#f4f4f8' : community.color,
            color: joined ? '#666' : '#fff',
            borderRadius: 10,
            padding: '8px 0',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.15s',
          }}
        >
          {joined ? 'Joined ✓' : 'Join'}
        </button>
      </div>
    </div>
  );
}
