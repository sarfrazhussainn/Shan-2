import {
  FileText,
  FlaskConical,
  Gauge,
  Layers,
  Search,
  ShieldCheck,
  Truck,
  Wrench,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  flask: FlaskConical,
  search: Search,
  gauge: Gauge,
  truck: Truck,
  layers: Layers,
  file: FileText,
  shield: ShieldCheck,
  wrench: Wrench,
};

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  const Icon = map[name] ?? FlaskConical;
  return <Icon className={className} aria-hidden />;
}
