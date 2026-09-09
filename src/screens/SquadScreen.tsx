import { useState, type FormEvent } from 'react';
import { Plus, Users, Clock, Gamepad2, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { type Mood, USERS } from '../data/mockData';
import { Avatar } from '../components/ui';

const MOOD_COLORS: Record<string, { color: string; bg: string }> = {
  'Chill & Chat': { color: '#0ea5e9', bg: '#e0f2fe' },
  'Ranked Focus': { color: '#ef4444', bg: '#fee2e2' },
  'Try Something New': { color: '#8b5cf6', bg: '#ede9fe' },
  'Just Talk': { color: '#10b981', bg: '#d1fae5' },
};

const GAMES = ['VALORANT', 'FIFA', 'Minecraft', 'Marvel Rivals', 'League of Legends', 'Super Smash Bros', 'Elden Ring', 'Fortnite'];
const MOODS: Mood[] = ['Chill & Chat', 'Ranked Focus', 'Try Something New', 'Just Talk'];

export default function SquadScreen() {
  const { squads, toggleSquad, partyPosts, toggleParty, createParty } = useApp();
  const [showCreateModal, setShowCreateModal] = useState(false);

  const mySquads = squads.filter(s => s.joined);
  const discoverSquads = squads.filter(s => !s.joined);

  return (
    <div className="screen-content">
      <div style={{ padding: '16px 20px 0' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a2e', margin: '0 0 4px' }}>Squad</h1>
        <p style={{ fontSize: 13, color: '#888', margin: '0 0 20px' }}>Find your crew and party up.</p>

        {/* My Squads */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
            My Squads
          </div>
          {mySquads.length === 0 ? (
            <div style={{ fontSize: 13, color: '#aaa', padding: '16px 0' }}>
              You haven't joined any squads yet.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {mySquads.map(squad => (
                <SquadCard key={squad.id} squad={squad} onToggle={() => toggleSquad(squad.id)} />
              ))}
            </div>
          )}
        </div>

        {/* Discover Squads */}
        {discoverSquads.length > 0 && (
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 12 }}>
              Discover Squads
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {discoverSquads.map(squad => (
                <SquadCard key={squad.id} squad={squad} onToggle={() => toggleSquad(squad.id)} />
              ))}
            </div>
          </div>
        )}

        {/* Party Finder */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Party Finder
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn-primary"
              style={{ padding: '7px 14px', fontSize: 12, display: 'flex', alignItems: 'center', gap: 5 }}
            >
              <Plus size={14} /> Create Party
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 20 }}>
            {partyPosts.map(post => (
              <PartyCard
                key={post.id}
                post={post}
                onToggle={() => toggleParty(post.id)}
              />
            ))}
          </div>
        </div>
      </div>

      {showCreateModal && (
        <CreatePartyModal
          onClose={() => setShowCreateModal(false)}
          onCreate={post => { createParty(post); setShowCreateModal(false); }}
        />
      )}
    </div>
  );
}

function SquadCard({ squad, onToggle }: { squad: ReturnType<typeof useApp>['squads'][0]; onToggle: () => void }) {
  return (
    <div style={{
      background: '#fff',
      border: '1.5px solid #ebebef',
      borderRadius: 14,
      padding: '14px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{
          width: 42,
          height: 42,
          borderRadius: 12,
          background: '#f0ebff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
        }}>
          🎮
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e' }}>{squad.name}</div>
          <div style={{ fontSize: 12, color: '#888' }}>
            {squad.game} · {squad.members}/{squad.maxMembers} members
          </div>
        </div>
      </div>
      <button
        onClick={onToggle}
        style={{
          border: squad.joined ? '1.5px solid #ebebef' : '1.5px solid #6c47ff',
          background: squad.joined ? '#f4f4f8' : '#6c47ff',
          color: squad.joined ? '#666' : '#fff',
          borderRadius: 10,
          padding: '7px 14px',
          fontSize: 12,
          fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'all 0.15s',
        }}
      >
        {squad.joined ? 'Joined ✓' : 'Join'}
      </button>
    </div>
  );
}

function PartyCard({ post, onToggle }: { post: ReturnType<typeof useApp>['partyPosts'][0]; onToggle: () => void }) {
  const moodStyle = MOOD_COLORS[post.mood] ?? { color: '#6c47ff', bg: '#f0ebff' };
  const host = USERS.find(u => u.id === post.userId);

  return (
    <div style={{
      background: '#fff',
      border: '1.5px solid #ebebef',
      borderRadius: 14,
      padding: '14px 16px',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{ flex: 1, paddingRight: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', marginBottom: 6 }}>
            {post.title}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#888' }}>
              <Gamepad2 size={11} /> {post.game}
            </span>
            <span style={{
              fontSize: 11, fontWeight: 600,
              color: moodStyle.color, background: moodStyle.bg,
              padding: '2px 7px', borderRadius: 99,
            }}>
              {post.mood}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#888' }}>
              <Clock size={11} /> {post.startTime}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: '#888' }}>
              <Users size={11} /> Need {post.playersNeeded}
            </span>
          </div>
        </div>
        <button
          onClick={onToggle}
          style={{
            border: post.joined ? '1.5px solid #ebebef' : '1.5px solid #6c47ff',
            background: post.joined ? '#f4f4f8' : '#6c47ff',
            color: post.joined ? '#666' : '#fff',
            borderRadius: 10,
            padding: '7px 12px',
            fontSize: 12,
            fontWeight: 700,
            cursor: 'pointer',
            fontFamily: 'inherit',
            transition: 'all 0.15s',
            whiteSpace: 'nowrap',
          }}
        >
          {post.joined ? 'Leave' : 'Join'}
        </button>
      </div>
      {host && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, paddingTop: 8, borderTop: '1px solid #f0f0f5' }}>
          <Avatar initials={host.avatar} color={host.avatarColor} size={20} />
          <span style={{ fontSize: 11, color: '#aaa' }}>Posted by {host.name}</span>
        </div>
      )}
    </div>
  );
}

function CreatePartyModal({
  onClose,
  onCreate,
}: {
  onClose: () => void;
  onCreate: (post: any) => void;
}) {
  const [title, setTitle] = useState('');
  const [game, setGame] = useState('VALORANT');
  const [playersNeeded, setPlayersNeeded] = useState(2);
  const [mood, setMood] = useState<Mood>('Chill & Chat');
  const [startTime, setStartTime] = useState('Tonight 9 PM');

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate({ title, game, playersNeeded, mood, startTime });
  }

  return (
    <div className="modal-overlay">
      <div className="modal-sheet">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1a1a2e', margin: 0 }}>Create Party</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888' }}>
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>Title</label>
            <input
              className="input-base"
              placeholder="e.g. Need 2 for VALORANT ranked"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>Game</label>
            <select
              className="input-base"
              value={game}
              onChange={e => setGame(e.target.value)}
              style={{ cursor: 'pointer' }}
            >
              {GAMES.map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>
              Players Needed: {playersNeeded}
            </label>
            <input
              type="range"
              min={1}
              max={9}
              value={playersNeeded}
              onChange={e => setPlayersNeeded(Number(e.target.value))}
              style={{ width: '100%', accentColor: '#6c47ff' }}
            />
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>Mood</label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {MOODS.map(m => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMood(m)}
                  style={{
                    border: mood === m ? '2px solid #6c47ff' : '2px solid #ebebef',
                    background: mood === m ? '#f0ebff' : '#fff',
                    borderRadius: 10,
                    padding: '8px 10px',
                    fontSize: 12,
                    fontWeight: 600,
                    color: mood === m ? '#6c47ff' : '#666',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    transition: 'all 0.15s',
                  }}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: '#555', display: 'block', marginBottom: 6 }}>When?</label>
            <input
              className="input-base"
              placeholder="e.g. Tonight 9 PM, This weekend..."
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-primary" style={{ marginTop: 4 }}>
            Create Party 🎮
          </button>
        </form>
      </div>
    </div>
  );
}
