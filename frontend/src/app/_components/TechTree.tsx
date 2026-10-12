"use client";

import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Network } from "lucide-react";
import SectionHeading from "./SectionHeading";
import EmptyState from "./EmptyState";
import type { Skill } from "./types";

const CATEGORY_ORDER = [
  "FRONTEND",
  "BACKEND",
  "LANGUAGE",
  "DATABASE",
  "ORM",
  "DEVOPS",
  "AUTHENTICATION",
  "OTHER",
] as const;

const CATEGORY_LABEL: Record<string, string> = {
  FRONTEND: "Frontend",
  BACKEND: "Backend",
  LANGUAGE: "Languages",
  DATABASE: "Data",
  ORM: "ORM",
  DEVOPS: "DevOps",
  AUTHENTICATION: "Auth",
  OTHER: "Other",
};

const LEVEL_COLOR: Record<string, string> = {
  ADVANCED: "var(--accent)",
  INTERMEDIATE: "var(--accent-3)",
  BEGINNER: "var(--muted)",
};

type NodeKind = "root" | "category" | "leaf";

interface LayoutNode {
  id: string;
  kind: NodeKind;
  x: number;
  y: number;
  label: string;
  depth: number;
  category?: string;
  skill?: Skill;
  side?: "left" | "right";
  radius?: number;
}

interface LayoutEdge {
  id: string;
  from: LayoutNode;
  to: LayoutNode;
  depth: number;
  index: number;
}

interface Layout {
  nodes: LayoutNode[];
  edges: LayoutEdge[];
  height: number;
}

function buildLayout(
  skills: Skill[],
  width: number,
  orientation: "horizontal" | "vertical",
): Layout {
  const groups = CATEGORY_ORDER.map((category) => ({
    category,
    skills: skills.filter((s) => s.category === category),
  })).filter((g) => g.skills.length > 0);

  const nodes: LayoutNode[] = [];
  const edges: LayoutEdge[] = [];
  const root: LayoutNode = {
    id: "root",
    kind: "root",
    x: 0,
    y: 0,
    label: "Tech Stack",
    depth: 0,
  };

  if (orientation === "horizontal") {
    const row = 58;
    const padTop = 48;
    const totalLeaves = groups.reduce((n, g) => n + g.skills.length, 0);
    const height = Math.max(460, padTop * 2 + (totalLeaves - 1) * row);
    const rootX = 62;
    const catX = Math.max(230, width * 0.36);
    const leafX = Math.max(catX + 150, width - 200);

    let leafIndex = 0;
    const categoryNodes: { node: LayoutNode; ys: number[] }[] = [];

    groups.forEach((group) => {
      const catNode: LayoutNode = {
        id: `cat-${group.category}`,
        kind: "category",
        x: catX,
        y: 0,
        label: CATEGORY_LABEL[group.category] ?? group.category,
        depth: 1,
        category: group.category,
      };

      const ys = group.skills.map(() => {
        const y = padTop + leafIndex * row;
        leafIndex += 1;
        return y;
      });
      catNode.y = ys.reduce((a, b) => a + b, 0) / ys.length;
      categoryNodes.push({ node: catNode, ys });

      group.skills.forEach((skill, i) => {
        const leaf: LayoutNode = {
          id: `leaf-${skill.name}`,
          kind: "leaf",
          x: leafX,
          y: ys[i],
          label: skill.name,
          depth: 2,
          category: group.category,
          skill,
        };
        nodes.push(leaf);
        edges.push({ id: `e-${catNode.id}-${leaf.id}`, from: catNode, to: leaf, depth: 2, index: i });
      });

      nodes.push(catNode);
      edges.push({ id: `e-root-${catNode.id}`, from: root, to: catNode, depth: 1, index: 0 });
    });

    root.x = rootX;
    root.y = height / 2;
    // recompute root edges now that root.x/y are known
    edges.forEach((e) => {
      if (e.from.id === "root") e.from = root;
    });
    nodes.unshift(root);
    return { nodes, edges, height };
  }

  // vertical (tablet/phone) layout — central trunk, leaves alternate left/right
  const isTablet = width >= 600;
  const cx = width / 2;
  const leafRow = isTablet ? 54 : 46;
  const catBlock = isTablet ? 46 : 42;
  const groupGap = isTablet ? 34 : 26;
  const allSkills = groups.flatMap((g) => g.skills);
  const maxLabelW =
    allSkills.reduce((m, s) => Math.max(m, s.name.length), 0) * 6.8;
  const offset = Math.max(46, Math.min(150, width / 2 - maxLabelW - 36));

  root.x = cx;
  root.y = 40;
  let cursor = root.y + 74;
  let leafIndex = 0;

  groups.forEach((group) => {
    const catNode: LayoutNode = {
      id: `cat-${group.category}`,
      kind: "category",
      x: cx,
      y: cursor,
      label: CATEGORY_LABEL[group.category] ?? group.category,
      depth: 1,
      category: group.category,
    };
    nodes.push(catNode);
    edges.push({ id: `e-root-${catNode.id}`, from: root, to: catNode, depth: 1, index: 0 });
    cursor += catBlock;

    group.skills.forEach((skill) => {
      const side: "left" | "right" = leafIndex % 2 === 0 ? "right" : "left";
      const leaf: LayoutNode = {
        id: `leaf-${skill.name}`,
        kind: "leaf",
        x: side === "right" ? cx + offset : cx - offset,
        y: cursor,
        label: skill.name,
        depth: 2,
        category: group.category,
        skill,
        side,
        radius: isTablet ? 24 : 20,
      };
      nodes.push(leaf);
      edges.push({ id: `e-${catNode.id}-${leaf.id}`, from: catNode, to: leaf, depth: 2, index: leafIndex });
      cursor += leafRow;
      leafIndex += 1;
    });
    cursor += groupGap;
  });

  nodes.unshift(root);
  return { nodes, edges, height: cursor + 24 };
}

function hash(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) h = (h * 31 + str.charCodeAt(i)) % 997;
  return h / 997;
}

const DEPTH_FACTOR = [3, 8, 14];

// Root node circle has r=30 (60px diameter); ~20% padding per side.
const ROOT_LOGO_SIZE = 36;

function factors(node: LayoutNode) {
  const base = DEPTH_FACTOR[node.depth] ?? 10;
  const jitter = 0.78 + 0.44 * hash(node.id);
  return { x: base * jitter, y: base * 0.55 * jitter };
}

function buildPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  orientation: "horizontal" | "vertical",
) {
  if (orientation === "horizontal") {
    const dx = (x2 - x1) * 0.5;
    return `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;
  }
  const dy = (y2 - y1) * 0.5;
  return `M ${x1} ${y1} C ${x1} ${y1 + dy}, ${x2} ${y2 - dy}, ${x2} ${y2}`;
}

interface ConnectorProps {
  edge: LayoutEdge;
  orientation: "horizontal" | "vertical";
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  highlighted: boolean;
  dimmed: boolean;
  delay: number;
}

function Connector({
  edge,
  orientation,
  sx,
  sy,
  highlighted,
  dimmed,
  delay,
}: ConnectorProps) {
  const ff = factors(edge.from);
  const tf = factors(edge.to);

  const x1 = useTransform(sx, (v) => edge.from.x + v * ff.x);
  const y1 = useTransform(sy, (v) => edge.from.y + v * ff.y);
  const x2 = useTransform(sx, (v) => edge.to.x + v * tf.x);
  const y2 = useTransform(sy, (v) => edge.to.y + v * tf.y);

  const ref = useRef<SVGPathElement>(null);

  useEffect(() => {
    const update = () => {
      if (ref.current) {
        ref.current.setAttribute(
          "d",
          buildPath(x1.get(), y1.get(), x2.get(), y2.get(), orientation),
        );
      }
    };
    const unsubs = [x1, y1, x2, y2].map((m) => m.on("change", update));
    update();
    return () => unsubs.forEach((u) => u());
  }, [x1, y1, x2, y2, orientation]);

  return (
    <motion.path
      ref={ref}
      d={buildPath(edge.from.x, edge.from.y, edge.to.x, edge.to.y, orientation)}
      fill="none"
      strokeLinecap="round"
      initial={{ pathLength: 0, opacity: 0 }}
      whileInView={{ pathLength: 1, opacity: dimmed ? 0.15 : 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        pathLength: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        opacity: { duration: 0.35, delay },
      }}
      style={{
        stroke: highlighted ? "var(--accent)" : "var(--line-2)",
        strokeWidth: highlighted ? 2 : 1.25,
      }}
      className="transition-[stroke,stroke-width] duration-300"
    />
  );
}

interface NodeViewProps {
  node: LayoutNode;
  orientation: "horizontal" | "vertical";
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  highlighted: boolean;
  dimmed: boolean;
  delay: number;
  onEnter?: (e?: React.PointerEvent) => void;
  onLeave?: (e?: React.PointerEvent) => void;
  onToggle?: () => void;
}

function NodeView({
  node,
  orientation,
  sx,
  sy,
  highlighted,
  dimmed,
  delay,
  onEnter,
  onLeave,
  onToggle,
}: NodeViewProps) {
  const f = factors(node);
  const x = useTransform(sx, (v) => v * f.x);
  const y = useTransform(sy, (v) => v * f.y);
  const opacity = dimmed ? 0.28 : 1;

  const inner = (() => {
    if (node.kind === "root") {
      return (
        <>
          <circle cx={node.x} cy={node.y} r={30} fill="var(--surface)" stroke="var(--accent)" strokeWidth="1.5" />
          <image
            href="/logo%20-%20black.png"
            x={node.x - ROOT_LOGO_SIZE / 2}
            y={node.y - ROOT_LOGO_SIZE / 2}
            width={ROOT_LOGO_SIZE}
            height={ROOT_LOGO_SIZE}
            preserveAspectRatio="xMidYMid meet"
            className="dark:hidden"
          >
            <title>Siam logo</title>
          </image>
          <image
            href="/logo%20-%20white.png"
            x={node.x - ROOT_LOGO_SIZE / 2}
            y={node.y - ROOT_LOGO_SIZE / 2}
            width={ROOT_LOGO_SIZE}
            height={ROOT_LOGO_SIZE}
            preserveAspectRatio="xMidYMid meet"
            className="hidden dark:block"
          >
            <title>Siam logo</title>
          </image>
          <text
            x={orientation === "vertical" ? node.x + 42 : node.x}
            y={orientation === "vertical" ? node.y + 4 : node.y + 56}
            textAnchor={orientation === "vertical" ? "start" : "middle"}
            fontSize="10"
            letterSpacing="0.18em"
            fill="var(--muted)"
            style={{ fontFamily: "var(--font-jetbrains)" }}
          >
            TECH STACK
          </text>
          {orientation === "horizontal" && (
            <line x1={node.x + 30} y1={node.y} x2={node.x + 30} y2={node.y} stroke="transparent" />
          )}
        </>
      );
    }

    if (node.kind === "category") {
      const w = node.label.length * 7.4 + 30;
      return (
        <>
          <rect
            x={node.x - w / 2}
            y={node.y - 14}
            width={w}
            height={28}
            rx={14}
            fill={highlighted ? "var(--accent-soft)" : "var(--surface-2)"}
            stroke={highlighted ? "var(--accent)" : "var(--line-2)"}
            strokeWidth="1"
          />
          <text
            x={node.x}
            y={node.y + 4}
            textAnchor="middle"
            fontSize="11"
            letterSpacing="0.12em"
            fill={highlighted ? "var(--ink)" : "var(--muted)"}
            style={{ fontFamily: "var(--font-jetbrains)", textTransform: "uppercase" }}
          >
            {node.label.toUpperCase()}
          </text>
        </>
      );
    }

    const skill = node.skill!;
    const r = node.radius ?? 20;
    const side = node.side ?? "right";
    const levelColor = LEVEL_COLOR[skill.level] ?? "var(--muted)";
    return (
      <>
        <circle
          cx={node.x}
          cy={node.y}
          r={r + (onEnter ? 6 : 0)}
          fill="transparent"
        />
        <circle cx={node.x} cy={node.y} r={r} fill="var(--surface)" stroke="var(--line)" strokeWidth="1" />
        <circle cx={node.x} cy={node.y} r={r + 3} fill="none" stroke={levelColor} strokeWidth={highlighted ? 2 : 1.25} opacity={highlighted ? 1 : 0.75} />
        {skill.icon ? (
          <image
            href={skill.icon}
            x={node.x - 13}
            y={node.y - 13}
            width={26}
            height={26}
            preserveAspectRatio="xMidYMid meet"
          />
        ) : (
          <circle cx={node.x} cy={node.y} r={6} fill={levelColor} />
        )}
        <text
          x={side === "right" ? node.x + r + 10 : node.x - r - 10}
          y={node.y + 4}
          textAnchor={side === "right" ? "start" : "end"}
          fontSize="12.5"
          fill={highlighted ? "var(--ink)" : "var(--muted)"}
          style={{ fontFamily: "var(--font-inter)", fontWeight: highlighted ? 600 : 500 }}
        >
          {node.label}
        </text>
        <circle
          cx={side === "right" ? node.x - r - 8 : node.x + r + 8}
          cy={node.y}
          r={2.5}
          fill={levelColor}
        />
      </>
    );
  })();

  return (
    <motion.g style={{ x, y }} opacity={opacity} className="transition-opacity duration-300">
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ delay, type: "spring", stiffness: 240, damping: 20 }}
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") onEnter?.();
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") onLeave?.();
        }}
        onClick={onToggle}
        tabIndex={node.kind === "leaf" ? 0 : undefined}
        role={node.kind === "leaf" ? "button" : undefined}
        aria-label={
          node.kind === "leaf" && node.skill
            ? `${node.skill.name}: ${node.skill.level}, ${node.skill.projectExperience} projects, last used ${node.skill.lastUsedYear}`
            : undefined
        }
        onFocus={() => onEnter?.()}
        onBlur={() => onLeave?.()}
        className="outline-none [&:focus-visible>circle:last-of-type]:stroke-accent"
      >
        {inner}
      </motion.g>
    </motion.g>
  );
}

export default function TechTree({ skills }: { skills: Skill[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [hovered, setHovered] = useState<string | null>(null);
  const reduced = useReducedMotion();

  const canHover = useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(pointer: fine)");
      mq.addEventListener("change", cb);
      return () => mq.removeEventListener("change", cb);
    },
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.7 });
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.7 });

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const orientation: "horizontal" | "vertical" =
    width >= 1024 ? "horizontal" : "vertical";

  const layout = useMemo(
    () => (width > 0 ? buildLayout(skills, width, orientation) : null),
    [skills, width, orientation],
  );

  const pathSet = useMemo(() => {
    const set = new Set<string>();
    if (!hovered || !layout) return set;
    const leaf = layout.nodes.find((n) => n.id === hovered);
    if (!leaf) return set;
    set.add(leaf.id);
    if (leaf.category) set.add(`cat-${leaf.category}`);
    set.add("root");
    return set;
  }, [hovered, layout]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!canHover || reduced || !wrapperRef.current) return;
    const r = wrapperRef.current.getBoundingClientRect();
    mx.set(Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1)));
    my.set(Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1)));
  };

  const resetMouse = () => {
    mx.set(0);
    my.set(0);
  };

  const hoveredNode = layout?.nodes.find((n) => n.id === hovered);

  return (
    <section
      id="skills"
      className="mx-auto w-full max-w-(--container-page) px-page pt-section"
    >
      <SectionHeading
        index="02"
        eyebrow="Capabilities"
        title="A stack, mapped as one living tree."
        description="Every technology connects back to a discipline. Hover a node to trace its path and see how it is actually used."
      />

      {skills.length === 0 ? (
        <div className="mt-12">
          <EmptyState
            icon={<Network className="h-5 w-5" />}
            title="No skills to display yet"
            message="Once skills are added through the API, they will grow into this tree automatically."
          />
        </div>
      ) : (
        <div
          ref={wrapperRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={resetMouse}
          className="relative mt-12"
        >
          {layout ? (
            <>
              <svg
                width={width}
                height={layout.height}
                viewBox={`0 0 ${width} ${layout.height}`}
                className="overflow-visible select-none"
                role="img"
                aria-label="Technology stack tree grouped by category"
              >
                <g className={orientation === "vertical" && !reduced ? "animate-tree-float" : undefined}>
                  {layout.edges.map((edge) => {
                    const highlighted =
                      pathSet.has(edge.from.id) && pathSet.has(edge.to.id);
                    const dimmed = Boolean(hovered) && !highlighted;
                    return (
                      <Connector
                        key={edge.id}
                        edge={edge}
                        orientation={orientation}
                        sx={sx}
                        sy={sy}
                        highlighted={highlighted}
                        dimmed={dimmed}
                        delay={0.1 + edge.depth * 0.12 + edge.index * 0.02}
                      />
                    );
                  })}
                  {layout.nodes.map((node, i) => {
                    const active = pathSet.size > 0 && pathSet.has(node.id);
                    const dimmed = pathSet.size > 0 && !active;
                    return (
                      <NodeView
                        key={`${node.id}-${orientation}`}
                        node={node}
                        orientation={orientation}
                        sx={sx}
                        sy={sy}
                        highlighted={active}
                        dimmed={dimmed}
                        delay={0.2 + node.depth * 0.15 + i * 0.015}
                        onEnter={
                          node.kind === "leaf"
                            ? () => setHovered(node.id)
                            : undefined
                        }
                        onLeave={
                          node.kind === "leaf" ? () => setHovered(null) : undefined
                        }
                        onToggle={
                          node.kind === "leaf"
                            ? () =>
                                setHovered((prev) =>
                                  prev === node.id ? null : node.id,
                                )
                            : undefined
                        }
                      />
                    );
                  })}
                </g>
              </svg>

              {hoveredNode?.skill ? (
                <div
                  className="pointer-events-none absolute z-20 w-56 rounded-2xl border border-line bg-surface/95 p-4 shadow-(--shadow) backdrop-blur-md"
                  style={{
                    left: Math.min(hoveredNode.x + 30, Math.max(8, width - 240)),
                    top: Math.max(8, hoveredNode.y - 78),
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-display text-sm font-semibold text-ink">
                      {hoveredNode.skill.name}
                    </span>
                    <span
                      className="rounded-full px-2 py-0.5 text-[0.6rem] font-bold uppercase tracking-wider"
                      style={{
                        background: "var(--accent-soft)",
                        color: "var(--accent)",
                      }}
                    >
                      {hoveredNode.skill.level}
                    </span>
                  </div>
                  <dl className="mt-3 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <dt className="text-muted">Experience</dt>
                      <dd className="font-medium text-ink">
                        {hoveredNode.skill.projectExperience}{" "}
                        {hoveredNode.skill.projectExperience === 1
                          ? "project"
                          : "projects"}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted">Last used</dt>
                      <dd className="font-medium text-ink">
                        {hoveredNode.skill.lastUsedYear}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-muted">Category</dt>
                      <dd className="font-medium text-ink">
                        {CATEGORY_LABEL[hoveredNode.category ?? ""] ??
                          hoveredNode.category}
                      </dd>
                    </div>
                  </dl>
                </div>
              ) : null}
            </>
          ) : (
            <div className="h-115 w-full" aria-hidden />
          )}

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-line pt-6">
            <span className="mono-label text-faint">Legend</span>
            {(["ADVANCED", "INTERMEDIATE", "BEGINNER"] as const).map((lvl) => (
              <span key={lvl} className="flex items-center gap-2 text-xs text-muted">
                <span
                  className="h-3.5 w-3.5 rounded-full border-2"
                  style={{ borderColor: LEVEL_COLOR[lvl] }}
                />
                {lvl.charAt(0) + lvl.slice(1).toLowerCase()}
              </span>
            ))}
            {canHover && !reduced ? (
              <span className="mono-label ml-auto hidden text-faint md:block">
                Move your cursor — the tree sways
              </span>
            ) : null}
          </div>
        </div>
      )}
    </section>
  );
}
