import { motion } from 'motion/react';
import { Battery, Zap, Gauge, Check, BarChart2, Cpu } from 'lucide-react';
import { useState } from 'react';

export type CarColor = { name: string; hex: string };

export type CarSpec = {
  range: string;
  acceleration: string;
  topSpeed: string;
  power: string;
  charging: string;
  seats: number;
};

export type Car = {
  id: string;
  brand: string;
  model: string;
  trim: string;
  price: number;
  originalPrice?: number;
  badge: string;
  image: string;
  specs: CarSpec;
  colors: CarColor[];
  accentHex: string;
};

interface ElectricCarCardProps {
  car: Car;
  selectedColorIndex: number;
  isCompared: boolean;
  canAddToCompare: boolean;
  onColorChange: (index: number) => void;
  onToggleCompare: () => void;
}

const SPEC_ROWS = [
  { key: 'range', icon: Battery, label: 'Range' },
  { key: 'acceleration', icon: Zap, label: '0–60' },
  { key: 'topSpeed', icon: Gauge, label: 'Top Speed' },
] as const;

export function ElectricCarCard({
  car,
  selectedColorIndex,
  isCompared,
  canAddToCompare,
  onColorChange,
  onToggleCompare,
}: ElectricCarCardProps) {
  const [hovered, setHovered] = useState(false);
  const selectedColor = car.colors[selectedColorIndex];

  return (
    <motion.div
      className="relative flex w-full max-w-sm flex-col overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl"
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      style={{ boxShadow: hovered ? `0 24px 60px -12px ${car.accentHex}40` : '0 8px 32px rgba(0,0,0,0.4)' }}
    >
      {/* Animated accent border */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl border-2"
        style={{ borderColor: car.accentHex }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-900">
        <motion.img
          src={`https://images.unsplash.com/photo-${car.image}?w=600&h=400&fit=crop&auto=format`}
          alt={`${car.brand} ${car.model}`}
          className="h-full w-full object-cover"
          animate={{ scale: hovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />

        {/* Color tint overlay */}
        <div
          className="absolute inset-0 transition-all duration-700"
          style={{
            backgroundColor: selectedColor.hex,
            opacity: selectedColorIndex === 0 ? 0 : 0.28,
            mixBlendMode: 'color',
          }}
        />

        {/* Gradient fade */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-card to-transparent" />

        {/* Badge */}
        <div
          className="absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-semibold text-black"
          style={{ backgroundColor: car.accentHex }}
        >
          {car.badge}
        </div>

        {/* Compare button */}
        <button
          onClick={onToggleCompare}
          disabled={!canAddToCompare && !isCompared}
          className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-all disabled:cursor-not-allowed disabled:opacity-40 hover:bg-black/70"
        >
          {isCompared ? (
            <>
              <Check className="h-3 w-3" style={{ color: car.accentHex }} />
              Compared
            </>
          ) : (
            <>
              <BarChart2 className="h-3 w-3" />
              Compare
            </>
          )}
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 p-5">
        {/* Header */}
        <div>
          <p className="font-['Outfit'] text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {car.brand}
          </p>
          <h3 className="font-['Outfit'] text-2xl font-bold text-foreground">{car.model}</h3>
          <p className="text-sm text-muted-foreground">{car.trim}</p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-3 gap-2">
          {SPEC_ROWS.map(({ key, icon: Icon, label }) => (
            <div
              key={key}
              className="flex flex-col items-center gap-1 rounded-xl border border-white/5 bg-muted p-3 transition-colors hover:border-white/10"
            >
              <Icon className="h-4 w-4" style={{ color: car.accentHex }} />
              <span className="font-['Outfit'] text-sm font-semibold text-foreground">
                {car.specs[key]}
              </span>
              <span className="text-[10px] text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>

        {/* Color Picker */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Color</span>
            <span className="text-xs font-medium text-foreground">{selectedColor.name}</span>
          </div>
          <div className="flex gap-2">
            {car.colors.map((color, i) => (
              <button
                key={color.name}
                title={color.name}
                onClick={() => onColorChange(i)}
                className="relative h-6 w-6 rounded-full border-2 transition-transform hover:scale-110"
                style={{
                  backgroundColor: color.hex,
                  borderColor: selectedColorIndex === i ? car.accentHex : 'transparent',
                  boxShadow: selectedColorIndex === i ? `0 0 0 1px ${car.accentHex}` : 'inset 0 0 0 1px rgba(255,255,255,0.15)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-['Outfit'] text-2xl font-bold text-foreground">
              ${car.price.toLocaleString()}
            </div>
            {car.originalPrice && (
              <div className="text-xs text-muted-foreground line-through">
                ${car.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          <motion.button
            className="rounded-xl px-5 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            style={{ backgroundColor: car.accentHex }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Reserve
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
