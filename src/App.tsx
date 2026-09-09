import { AppProvider, useApp } from './context/AppContext';
import DiscoverScreen from './screens/DiscoverScreen';
import CommunityScreen from './screens/CommunityScreen';
import SquadScreen from './screens/SquadScreen';
import ChatScreen from './screens/ChatScreen';
import ProfileScreen from './screens/ProfileScreen';
import { Compass, Users, Shield, MessageCircle, User } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 'community', label: 'Community', icon: Users },
  { id: 'squad', label: 'Squad', icon: Shield },
  { id: 'chat', label: 'Chat', icon: MessageCircle },
  { id: 'profile', label: 'Profile', icon: User },
] as const;

function AppInner() {
  const { currentScreen, navigateTo } = useApp();

  function renderScreen() {
    switch (currentScreen) {
      case 'discover': return <DiscoverScreen />;
      case 'community': return <CommunityScreen />;
      case 'squad': return <SquadScreen />;
      case 'chat': return <ChatScreen />;
      case 'profile': return <ProfileScreen />;
      default: return <DiscoverScreen />;
    }
  }

  return (
    <div className="app-container">
      <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {renderScreen()}
      </div>

      {/* Bottom Navigation */}
      <nav className="bottom-nav">
        {NAV_ITEMS.map(item => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          return (
            <button
              key={item.id}
              id={`nav-${item.id}`}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => navigateTo(item.id)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            >
              <div className="nav-icon" style={{ position: 'relative' }}>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                {item.id === 'chat' && !isActive && (
                  <span style={{
                    position: 'absolute',
                    top: -3,
                    right: -3,
                    width: 7,
                    height: 7,
                    background: '#ef4444',
                    borderRadius: '50%',
                    border: '1.5px solid white',
                  }} />
                )}
              </div>
              <span className="nav-label">{item.label}</span>
              {isActive && (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  width: 32,
                  height: 3,
                  background: '#6c47ff',
                  borderRadius: '0 0 3px 3px',
                }} />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
