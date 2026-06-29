"use client";

import type { CSSProperties } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Monitor,
  FileText,
  UserCheck,
  PenLine,
  Building2,
  Armchair,
  GraduationCap,
  ShieldCheck,
  BarChart3,
} from "lucide-react";

type RoadmapItem = {
  step: string;
  label: string;
  icon: LucideIcon;
  highlight?: boolean;
};

const roadmapItems: RoadmapItem[] = [
  { step: "01", label: "Perfil e conversa", icon: Monitor },
  { step: "02", label: "COF", icon: FileText },
  { step: "03", label: "Aprovação", icon: UserCheck },
  { step: "04", label: "Contrato", icon: PenLine },
  { step: "05", label: "Ponto comercial", icon: Building2 },
  { step: "06", label: "Implantação", icon: Armchair },
  { step: "07", label: "Treinamento", icon: GraduationCap },
  { step: "08", label: "Inauguração", icon: ShieldCheck, highlight: true },
  { step: "09", label: "Acompanhamento", icon: BarChart3 },
];

const VIEW_W = 1200;
const VIEW_H = 360;
const TOP_Y = 150;
const BOTTOM_Y = 230;

const isTop = (index: number) => index % 2 === 1;
const xFor = (index: number) =>
  ((index + 0.5) / roadmapItems.length) * VIEW_W;

const ZIG_PATH = roadmapItems
  .map((_, index) => {
    const y = isTop(index) ? TOP_Y : BOTTOM_Y;
    return `${index === 0 ? "M" : "L"}${xFor(index).toFixed(1)},${y}`;
  })
  .join(" ");

function ZigBox({ item }: { item: RoadmapItem }) {
  const Icon = item.icon;
  return (
    <div className={`roadmap-zig__box${item.highlight ? " roadmap-zig__box--active" : ""}`}>
      <Icon className="roadmap-zig__icon" aria-hidden="true" />
    </div>
  );
}

function ZigNode({ item, index }: { item: RoadmapItem; index: number }) {
  const top = isTop(index);
  const left = (xFor(index) / VIEW_W) * 100;
  const topPct = ((top ? TOP_Y : BOTTOM_Y) / VIEW_H) * 100;

  return (
    <div
      className={`roadmap-zig__node roadmap-zig__node--${top ? "top" : "bottom"}`}
      style={{ left: `${left}%`, top: `${topPct}%` } as CSSProperties}
    >
      <div className="roadmap-zig__text">
        <span className="roadmap-zig__num">{item.step}</span>
        <span className="roadmap-zig__label">{item.label}</span>
      </div>
      <ZigBox item={item} />
    </div>
  );
}

function ZigCard({ item }: { item: RoadmapItem }) {
  return (
    <article className="roadmap-zigcard">
      <ZigBox item={item} />
      <div className="roadmap-zigcard__text">
        <span className="roadmap-zig__num">{item.step}</span>
        <span className="roadmap-zig__label">{item.label}</span>
      </div>
    </article>
  );
}

export default function RoadmapSection() {
  return (
    <section className="roadmap-print-section" id="suporte">
      <div className="roadmap-print-container">
        <div className="roadmap-print-header">
          <div className="section-kicker section-kicker--light">
            Da intenção à inauguração
          </div>
          <h2>
            Passo a passo para se tornar{" "}
            <span className="text-[#38B549]">franqueado</span>
          </h2>
          <p>
            Uma jornada clara diminui insegurança e mostra que você não precisa
            descobrir tudo sozinho. É mais rápido do que você imagina.
          </p>
        </div>

        <div className="roadmap-zig" aria-label="Passo a passo para se tornar um franqueado">
          <svg
            className="roadmap-zig__line"
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            role="presentation"
          >
            <path d={ZIG_PATH} />
          </svg>

          {roadmapItems.map((item, index) => (
            <ZigNode key={item.step} item={item} index={index} />
          ))}
        </div>

        <div className="roadmap-ziglist">
          {roadmapItems.map((item) => (
            <ZigCard key={item.step} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
