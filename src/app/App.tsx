import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
} from "lucide-react";
import {
  ElectricCarCard,
  type Car,
} from "./components/ElectricCarCard";

const CARS: Car[] = [
  {
    id: "tesla-model-s",
    brand: "Tesla",
    model: "Model S",
    trim: "Plaid Edition",
    price: 89990,
    originalPrice: 99990,
    badge: "Ludicrous Mode",
    image: "1617788138017-80ad40651399",
    specs: {
      range: "405 mi",
      acceleration: "1.99s",
      topSpeed: "200 mph",
      power: "1,020 hp",
      charging: "250 kW",
      seats: 5,
    },
    colors: [
      { name: "Pearl White", hex: "#f0ede8" },
      { name: "Midnight Silver", hex: "#94a3b8" },
      { name: "Deep Blue", hex: "#1d4ed8" },
      { name: "Solid Black", hex: "#1e293b" },
      { name: "Red Multi-Coat", hex: "#dc2626" },
    ],
    accentHex: "#06b6d4",
  },
  {
    id: "tesla-model-3",
    brand: "Tesla",
    model: "Model 3",
    trim: "Long Range AWD",
    price: 45990,
    badge: "Best Value",
    image: "1561580125-028ee3bd62eb",
    specs: {
      range: "358 mi",
      acceleration: "4.2s",
      topSpeed: "145 mph",
      power: "346 hp",
      charging: "170 kW",
      seats: 5,
    },
    colors: [
      { name: "Pearl White", hex: "#f0ede8" },
      { name: "Stealth Grey", hex: "#6b7280" },
      { name: "Ultra Red", hex: "#ef4444" },
      { name: "Midnight Black", hex: "#111827" },
      { name: "Quicksilver", hex: "#d1d5db" },
    ],
    accentHex: "#10b981",
  },
  {
    id: "bmw-ix",
    brand: "BMW",
    model: "iX xDrive50",
    trim: "Sport Package",
    price: 87100,
    badge: "German Precision",
    image: "1555215695-3004980ad54e",
    specs: {
      range: "324 mi",
      acceleration: "4.6s",
      topSpeed: "124 mph",
      power: "516 hp",
      charging: "195 kW",
      seats: 5,
    },
    colors: [
      { name: "Mineral White", hex: "#f5f5f4" },
      { name: "Storm Bay Metallic", hex: "#374151" },
      { name: "Phytonic Blue", hex: "#2563eb" },
      { name: "Sophisto Grey", hex: "#9ca3af" },
      { name: "Carbon Black", hex: "#0f172a" },
    ],
    accentHex: "#8b5cf6",
  },
  {
    id: "rivian-r1t",
    brand: "Rivian",
    model: "R1T",
    trim: "Adventure Package",
    price: 73000,
    badge: "Off-Road Ready",
    image: "1654475677184-2c3ebb2b5b50",
    specs: {
      range: "314 mi",
      acceleration: "3.0s",
      topSpeed: "110 mph",
      power: "835 hp",
      charging: "220 kW",
      seats: 5,
    },
    colors: [
      { name: "Limestone", hex: "#d4c5a9" },
      { name: "Forest Edge", hex: "#166534" },
      { name: "Launch Green", hex: "#4d7c0f" },
      { name: "Midnight", hex: "#1c1917" },
      { name: "Canyon Red", hex: "#b45309" },
    ],
    accentHex: "#f59e0b",
  },
];

const ALL_SPEC_KEYS = [
  { key: "range", label: "Range" },
  { key: "acceleration", label: "0–60 mph" },
  { key: "topSpeed", label: "Top Speed" },
  { key: "power", label: "Power" },
  { key: "charging", label: "DC Fast Charge" },
  { key: "seats", label: "Seats" },
] as const;

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedColors, setSelectedColors] = useState<
    Record<string, number>
  >(() => Object.fromEntries(CARS.map((c) => [c.id, 0])));
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const prev = () =>
    setActiveIndex((i) => (i - 1 + CARS.length) % CARS.length);
  const next = () =>
    setActiveIndex((i) => (i + 1) % CARS.length);

  const toggleCompare = (id: string) => {
    setComparedIds((prev) => {
      if (prev.includes(id))
        return prev.filter((x) => x !== id);
      if (prev.length >= 2) return prev;
      return [...prev, id];
    });
  };

  const comparedCars = CARS.filter((c) =>
    comparedIds.includes(c.id),
  );

  return (
    <div className="relative min-h-screen overflow-hidden bg-background font-['DM_Sans']">
      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(6,182,212,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.15) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-1/4 top-1/2 h-96 w-96 translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />

      {/* Header */}
      <header className="relative px-8 pb-6 pt-12 text-center">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-cyan-400">
          <Zap className="h-3 w-3" />
          Electric Vehicles 2025
        </div>
        <h1 className="font-['Outfit'] text-5xl font-extrabold tracking-tight text-foreground md:text-6xl">
          Drive the Future
        </h1>
        <p className="mt-3 text-base text-muted-foreground">
          Configure, compare, and reserve the world&apos;s
          finest electric vehicles.
        </p>
      </header>

      {/* Carousel */}
      <section className="relative mx-auto max-w-5xl px-4 py-8">
        {/* Side arrows */}
        <button
          onClick={prev}
          className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-card/80 p-3 text-foreground backdrop-blur-sm transition-all hover:border-white/20 hover:bg-card md:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={next}
          className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-card/80 p-3 text-foreground backdrop-blur-sm transition-all hover:border-white/20 hover:bg-card md:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Cards track */}
        <div className="overflow-hidden px-4">
          <motion.div
            className="flex"
            animate={{ x: `-${activeIndex * 100}%` }}
            transition={{
              duration: 0.45,
              ease: [0.32, 0, 0.1, 1],
            }}
          >
            {CARS.map((car, i) => (
              <div
                key={car.id}
                className="w-full flex-none px-4"
                style={{ minWidth: "100%" }}
              >
                <div className="mx-auto max-w-sm">
                  <ElectricCarCard
                    car={car}
                    selectedColorIndex={
                      selectedColors[car.id] ?? 0
                    }
                    isCompared={comparedIds.includes(car.id)}
                    canAddToCompare={comparedIds.length < 2}
                    onColorChange={(idx) =>
                      setSelectedColors((prev) => ({
                        ...prev,
                        [car.id]: idx,
                      }))
                    }
                    onToggleCompare={() =>
                      toggleCompare(car.id)
                    }
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots */}
        <div className="mt-8 flex justify-center gap-2">
          {CARS.map((car, i) => (
            <button
              key={car.id}
              onClick={() => setActiveIndex(i)}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: activeIndex === i ? 28 : 8,
                backgroundColor:
                  activeIndex === i
                    ? car.accentHex
                    : "rgba(255,255,255,0.2)",
              }}
            />
          ))}
        </div>

        {/* Car name strip */}
        <div className="mt-4 text-center">
          <motion.p
            key={activeIndex}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-['Outfit'] text-sm font-medium text-muted-foreground"
          >
            {CARS[activeIndex].brand} {CARS[activeIndex].model}{" "}
            — {CARS[activeIndex].trim}
          </motion.p>
        </div>
      </section>

      {/* Compare tray */}
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <AnimatePresence>
          {comparedIds.length > 0 && !showComparison && (
            <motion.button
              key="tray"
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 200,
              }}
              onClick={() => setShowComparison(true)}
              className="flex items-center gap-3 rounded-full border border-white/15 bg-card/90 px-6 py-3.5 text-sm font-semibold text-foreground shadow-xl backdrop-blur-md"
            >
              {comparedIds.map((id) => {
                const car = CARS.find((c) => c.id === id)!;
                return (
                  <span
                    key={id}
                    className="rounded-full px-2.5 py-0.5 text-xs font-bold text-black"
                    style={{ backgroundColor: car.accentHex }}
                  >
                    {car.model}
                  </span>
                );
              })}
              <span className="text-muted-foreground">
                {comparedIds.length === 1
                  ? "— select one more to compare"
                  : "— View comparison"}
              </span>
              {comparedIds.length === 2 && (
                <span className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-400">
                  Compare →
                </span>
              )}
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Comparison Modal */}
      <AnimatePresence>
        {showComparison && comparedCars.length === 2 && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm md:items-center"
            onClick={(e) =>
              e.target === e.currentTarget &&
              setShowComparison(false)
            }
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 260,
              }}
              className="relative w-full max-w-2xl overflow-hidden rounded-t-3xl border border-white/10 bg-card shadow-2xl md:rounded-3xl"
            >
              {/* Modal header */}
              <div className="flex items-center justify-between border-b border-white/5 px-6 py-4">
                <h2 className="font-['Outfit'] text-xl font-bold text-foreground">
                  Side-by-Side Comparison
                </h2>
                <button
                  onClick={() => setShowComparison(false)}
                  className="rounded-full border border-white/10 p-2 text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Car headers */}
              <div className="grid grid-cols-2 gap-px border-b border-white/5 bg-white/5">
                {comparedCars.map((car) => (
                  <div
                    key={car.id}
                    className="bg-card px-6 py-5"
                  >
                    <div
                      className="mb-1 inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-black"
                      style={{ backgroundColor: car.accentHex }}
                    >
                      {car.brand}
                    </div>
                    <div className="font-['Outfit'] text-xl font-bold text-foreground">
                      {car.model}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {car.trim}
                    </div>
                    <div
                      className="mt-2 font-['Outfit'] text-2xl font-extrabold"
                      style={{ color: car.accentHex }}
                    >
                      ${car.price.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Spec rows */}
              <div
                className="overflow-y-auto"
                style={{ maxHeight: "60vh" }}
              >
                {ALL_SPEC_KEYS.map(({ key, label }, rowIdx) => {
                  const vals = comparedCars.map((c) =>
                    String(c.specs[key]),
                  );
                  return (
                    <div
                      key={key}
                      className={`grid grid-cols-2 gap-px bg-white/5 ${rowIdx % 2 === 0 ? "" : ""}`}
                    >
                      {comparedCars.map((car, ci) => (
                        <div
                          key={car.id}
                          className={`bg-card px-6 py-4 ${ci === 0 ? "border-r border-white/5" : ""}`}
                        >
                          {ci === 0 && (
                            <p className="mb-1 text-xs text-muted-foreground">
                              {label}
                            </p>
                          )}
                          {ci === 1 && (
                            <p className="mb-1 text-xs text-muted-foreground">
                              {label}
                            </p>
                          )}
                          <p className="font-['Outfit'] text-lg font-semibold text-foreground">
                            {String(car.specs[key])}
                          </p>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              {/* Clear */}
              <div className="border-t border-white/5 px-6 py-4 text-center">
                <button
                  onClick={() => {
                    setComparedIds([]);
                    setShowComparison(false);
                  }}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  Clear comparison
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}