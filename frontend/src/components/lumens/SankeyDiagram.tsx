import React, { useState } from 'react';
import { SankeyData } from '../../types';

interface SankeyDiagramProps {
  data: SankeyData;
  cutoffHa?: number;
  onCutoffChange?: (val: number) => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  forest: '#10b981',
  agroforestry: '#14b8a6',
  cropland: '#f59e0b',
  grassland: '#84cc16',
  settlement: '#ef4444',
  water: '#38bdf8',
  bare_soil: '#d97706',
  wetland: '#06b6d4',
  other: '#94a3b8',
};

export const SankeyDiagram: React.FC<SankeyDiagramProps> = ({
  data,
  cutoffHa = 100,
  onCutoffChange,
}) => {
  const [hoveredLink, setHoveredLink] = useState<any | null>(null);

  const { nodes = [], links = [] } = data;
  const filteredLinks = links.filter((l) => l.value >= cutoffHa);

  const width = 720;
  const height = 300;
  const leftX = 80;
  const rightX = width - 80;

  // Split nodes into T1 (left) and T2 (right)
  const leftNodes = nodes.filter((_, idx) => idx < nodes.length / 2);
  const rightNodes = nodes.filter((_, idx) => idx >= nodes.length / 2);

  // Compute node Y positions
  const computeNodePositions = (nodeList: any[], xPos: number) => {
    const totalCount = nodeList.length || 1;
    const padding = 12;
    const availableHeight = height - (totalCount + 1) * padding;
    const nodeHeight = Math.max(20, availableHeight / totalCount);

    return nodeList.map((node, i) => ({
      ...node,
      x: xPos,
      y: padding + i * (nodeHeight + padding),
      width: 14,
      height: nodeHeight,
      color: CATEGORY_COLORS[node.category || 'other'] || '#10b981',
    }));
  };

  const positionedLeft = computeNodePositions(leftNodes, leftX);
  const positionedRight = computeNodePositions(rightNodes, rightX);
  const allPositioned = [...positionedLeft, ...positionedRight];

  // Helper to draw bezier curve for links
  const createPath = (sourceIdx: number, targetIdx: number, val: number) => {
    const s = allPositioned[sourceIdx];
    const t = allPositioned[targetIdx];
    if (!s || !t) return '';

    const startX = s.x + s.width;
    const startY = s.y + s.height / 2;
    const endX = t.x;
    const endY = t.y + t.height / 2;
    const curvature = 0.5;
    const xi = (1 - curvature) * startX + curvature * endX;
    const xf = curvature * startX + (1 - curvature) * endX;

    const strokeWidth = Math.min(28, Math.max(2, (val / 22000) * 40));

    return {
      d: `M ${startX} ${startY} C ${xi} ${startY}, ${xf} ${endY}, ${endX} ${endY}`,
      strokeWidth,
    };
  };

  return (
    <div className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-xs font-sans space-y-3">
      {/* Controls Bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2">
        <div>
          <span className="font-bold text-slate-200">Pre-QuES Dynamic Sankey Flow</span>
          <p className="text-[11px] text-slate-400">Land Cover Transitions (T1 → T2 in Hectares)</p>
        </div>
        {onCutoffChange && (
          <div className="flex items-center space-x-2 text-[11px] text-slate-400">
            <span>Cutoff Filter:</span>
            <input
              type="range"
              min="0"
              max="1000"
              step="50"
              value={cutoffHa}
              onChange={(e) => onCutoffChange(Number(e.target.value))}
              className="w-24 accent-emerald-500 cursor-pointer"
            />
            <span className="font-mono text-emerald-400 font-semibold">{cutoffHa} ha</span>
          </div>
        )}
      </div>

      {/* SVG Canvas */}
      <div className="relative overflow-x-auto flex justify-center">
        <svg width={width} height={height} className="overflow-visible select-none">
          {/* Render Links */}
          <g>
            {filteredLinks.map((link, idx) => {
              const pathInfo = createPath(link.source, link.target, link.value);
              if (!pathInfo) return null;

              const isHovered = hoveredLink === link;
              const sourceNode = allPositioned[link.source];
              const strokeColor = sourceNode ? sourceNode.color : '#10b981';

              return (
                <path
                  key={idx}
                  d={pathInfo.d}
                  fill="none"
                  stroke={strokeColor}
                  strokeWidth={pathInfo.strokeWidth}
                  strokeOpacity={isHovered ? 0.85 : 0.35}
                  className="transition-all duration-150 cursor-pointer hover:stroke-opacity-90"
                  onMouseEnter={() => setHoveredLink(link)}
                  onMouseLeave={() => setHoveredLink(null)}
                />
              );
            })}
          </g>

          {/* Render Nodes */}
          <g>
            {allPositioned.map((node, idx) => {
              const isLeft = idx < leftNodes.length;
              return (
                <g key={idx}>
                  <rect
                    x={node.x}
                    y={node.y}
                    width={node.width}
                    height={node.height}
                    fill={node.color}
                    rx={3}
                    className="shadow-md"
                  />
                  <text
                    x={isLeft ? node.x - 8 : node.x + node.width + 8}
                    y={node.y + node.height / 2 + 4}
                    textAnchor={isLeft ? 'end' : 'start'}
                    className="fill-slate-300 text-[10px] font-medium"
                  >
                    {node.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Hover Tooltip */}
        {hoveredLink && (
          <div className="absolute top-2 right-4 bg-slate-900 border border-emerald-500/40 rounded px-2.5 py-1.5 shadow-xl text-[11px] font-mono pointer-events-none">
            <span className="text-emerald-400 font-bold capitalize">
              {hoveredLink.from_class} → {hoveredLink.to_class}
            </span>
            <div className="text-slate-200">
              Flux: <strong className="text-white">{hoveredLink.value.toLocaleString()} ha</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
