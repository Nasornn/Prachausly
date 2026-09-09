import type { ReactNode } from 'react';

interface AvatarProps {
  initials: string;
  color: string;
  size?: number;
  className?: string;
}

export function Avatar({ initials, color, size = 40, className = '' }: AvatarProps) {
  return (
    <div
      className={`avatar ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.35,
        letterSpacing: '0.5px',
      }}
    >
      {initials}
    </div>
  );
}

interface ChemistryBadgeProps {
  score: number;
}

export function ChemistryBadge({ score }: ChemistryBadgeProps) {
  const color = score >= 85
    ? { bg: '#dcfce7', text: '#15803d', dot: '#22c55e' }
    : score >= 70
    ? { bg: '#dbeafe', text: '#1d4ed8', dot: '#3b82f6' }
    : { bg: '#fef9c3', text: '#a16207', dot: '#eab308' };

  return (
    <span
      className="chemistry-badge"
      style={{ background: color.bg, color: color.text }}
    >
      <span
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: color.dot,
          display: 'inline-block',
        }}
      />
      {score}% Chemistry
    </span>
  );
}

interface ChipProps {
  children: ReactNode;
  color?: string;
  bg?: string;
  className?: string;
  onClick?: () => void;
  active?: boolean;
}

export function Chip({ children, color = '#6c47ff', bg = '#f0ebff', className = '', onClick, active }: ChipProps) {
  return (
    <span
      className={`chip ${className}`}
      onClick={onClick}
      style={{
        background: active !== undefined ? (active ? color : '#f4f4f8') : bg,
        color: active !== undefined ? (active ? '#fff' : '#555') : color,
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.15s',
      }}
    >
      {children}
    </span>
  );
}
