const PATH = "M 30 150 C 150 30, 320 230, 570 55";

export function RouteAnimation() {
  return (
    <svg
      viewBox="0 0 600 220"
      className="h-auto w-full"
      role="img"
      aria-label="Rota animada de entrega"
    >
      <defs>
        <linearGradient id="routeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ff6a3d" />
          <stop offset="55%" stopColor="#9945ff" />
          <stop offset="100%" stopColor="#14f195" />
        </linearGradient>
      </defs>

      <path
        d={PATH}
        fill="none"
        stroke="url(#routeGrad)"
        strokeWidth="2"
        strokeDasharray="7 11"
        strokeLinecap="round"
        opacity="0.55"
      />

      <g>
        <circle cx="30" cy="150" r="7" fill="#ff6a3d" />
        <circle cx="30" cy="150" r="14" fill="#ff6a3d" opacity="0.25">
          <animate attributeName="r" values="10;20;10" dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.35;0;0.35" dur="2s" repeatCount="indefinite" />
        </circle>
        <text x="30" y="180" textAnchor="middle" fontSize="11" fill="#f4f1ff" opacity="0.6">
          Empresa A
        </text>
      </g>

      <g>
        <circle cx="570" cy="55" r="7" fill="#14f195" />
        <circle cx="570" cy="55" r="14" fill="#14f195" opacity="0.25">
          <animate attributeName="r" values="10;20;10" dur="2s" begin="0.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.35;0;0.35" dur="2s" begin="0.4s" repeatCount="indefinite" />
        </circle>
        <text x="570" y="35" textAnchor="middle" fontSize="11" fill="#f4f1ff" opacity="0.6">
          Motoboy B
        </text>
      </g>

      <g fontSize="30">
        <text>🏍️</text>
        <animateMotion dur="3.2s" repeatCount="indefinite" path={PATH} />
      </g>
    </svg>
  );
}
