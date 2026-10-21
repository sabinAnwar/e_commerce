function TrustBadge({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="trust-badge">
      {children}
      <span>{label}</span>
    </div>
  );
}

function TrustBadges() {
  return (
    <div className="trust-badges">
      <TrustBadge label="Free shipping">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 18.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM18.75 18.75a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM3 6.75h12v9H3zM15 10.5h3.75L21 13.5v2.25h-6"
          />
        </svg>
      </TrustBadge>
      <TrustBadge label="30-day returns">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
          />
        </svg>
      </TrustBadge>
      <TrustBadge label="Secure checkout">
        <svg
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a1.5 1.5 0 001.5-1.5v-8.25a1.5 1.5 0 00-1.5-1.5H6.75a1.5 1.5 0 00-1.5 1.5v8.25a1.5 1.5 0 001.5 1.5z"
          />
        </svg>
      </TrustBadge>
    </div>
  );
}

export default TrustBadges;
