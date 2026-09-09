import { useState, useRef, useEffect, type FormEvent } from 'react';
import { ArrowLeft, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { USERS } from '../data/mockData';
import { Avatar } from '../components/ui';

export default function ChatScreen() {
  const {
    conversations,
    sendMessage,
    activeConversationId,
    setActiveConversationId,
  } = useApp();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConversationId);
  const activeUser = activeConv ? USERS.find(u => u.id === activeConv.userId) : null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConv?.messages]);

  function handleSend(e?: FormEvent) {
    e?.preventDefault();
    if (!input.trim() || !activeConversationId) return;
    sendMessage(activeConversationId, input.trim());
    setInput('');
  }

  if (activeConv && activeUser) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* Chat header */}
        <div style={{
          padding: '14px 16px',
          borderBottom: '1.5px solid #ebebef',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          background: '#fff',
          flexShrink: 0,
        }}>
          <button
            onClick={() => setActiveConversationId(null)}
            style={{
              background: '#f4f4f8',
              border: 'none',
              borderRadius: 10,
              width: 34,
              height: 34,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={16} color="#333" />
          </button>
          <Avatar initials={activeUser.avatar} color={activeUser.avatarColor} size={38} />
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e' }}>{activeUser.name}</div>
            <div style={{ fontSize: 11, color: '#22c55e', fontWeight: 500 }}>● Online</div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '16px',
          background: '#f8f8fc',
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
        }}>
          {activeConv.messages.length === 0 && (
            <div style={{ textAlign: 'center', color: '#aaa', fontSize: 13, marginTop: 40 }}>
              Say hi to {activeUser.name}! 👋
            </div>
          )}
          {activeConv.messages.map(msg => {
            const isMe = msg.senderId === 'me';
            return (
              <div
                key={msg.id}
                style={{
                  display: 'flex',
                  justifyContent: isMe ? 'flex-end' : 'flex-start',
                  alignItems: 'flex-end',
                  gap: 8,
                }}
              >
                {!isMe && (
                  <Avatar initials={activeUser.avatar} color={activeUser.avatarColor} size={28} />
                )}
                <div style={{ maxWidth: '72%' }}>
                  <div style={{
                    background: isMe ? '#6c47ff' : '#fff',
                    color: isMe ? '#fff' : '#1a1a2e',
                    padding: '10px 14px',
                    borderRadius: isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                    fontSize: 14,
                    lineHeight: 1.4,
                    border: isMe ? 'none' : '1.5px solid #ebebef',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  }}>
                    {msg.text}
                  </div>
                  <div style={{
                    fontSize: 10,
                    color: '#bbb',
                    marginTop: 3,
                    textAlign: isMe ? 'right' : 'left',
                    paddingLeft: isMe ? 0 : 4,
                    paddingRight: isMe ? 4 : 0,
                  }}>
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={handleSend}
          style={{
            padding: '12px 16px',
            background: '#fff',
            borderTop: '1.5px solid #ebebef',
            display: 'flex',
            gap: 10,
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <input
            id="chat-input"
            className="input-base"
            placeholder={`Message ${activeUser.name}...`}
            value={input}
            onChange={e => setInput(e.target.value)}
            style={{ flex: 1 }}
            autoFocus
          />
          <button
            type="submit"
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              background: input.trim() ? '#6c47ff' : '#f0ebff',
              border: 'none',
              cursor: input.trim() ? 'pointer' : 'default',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.15s',
              flexShrink: 0,
            }}
          >
            <Send size={16} color={input.trim() ? '#fff' : '#6c47ff'} />
          </button>
        </form>
      </div>
    );
  }

  // Conversation list
  return (
    <div className="screen-content">
      <div style={{ padding: '16px 20px 0' }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: '#1a1a2e', margin: '0 0 16px' }}>Messages</h1>

        {conversations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#aaa', fontSize: 14 }}>
            No conversations yet. Start discovering people!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {conversations.map(conv => {
              const user = USERS.find(u => u.id === conv.userId);
              if (!user) return null;
              const lastMsg = conv.messages[conv.messages.length - 1];
              const isLastFromMe = lastMsg?.senderId === 'me';

              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    padding: '14px 0',
                    borderBottom: '1px solid #f0f0f5',
                    cursor: 'pointer',
                    transition: 'background 0.1s',
                    borderRadius: 4,
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = '#fafafa'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{ position: 'relative' }}>
                    <Avatar initials={user.avatar} color={user.avatarColor} size={48} />
                    <span style={{
                      position: 'absolute',
                      bottom: 1,
                      right: 1,
                      width: 10,
                      height: 10,
                      background: '#22c55e',
                      borderRadius: '50%',
                      border: '2px solid white',
                    }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 3 }}>
                      <span style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e' }}>{user.name}</span>
                      {lastMsg && (
                        <span style={{ fontSize: 11, color: '#bbb' }}>{lastMsg.time}</span>
                      )}
                    </div>
                    <div style={{
                      fontSize: 13,
                      color: '#888',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}>
                      {lastMsg ? (
                        <>
                          {isLastFromMe && <span style={{ color: '#6c47ff' }}>You: </span>}
                          {lastMsg.text}
                        </>
                      ) : (
                        <em>No messages yet</em>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
