import React from "react";
import { HSL_PALETTES } from "../data/portfolioData";
import { useHslTheme } from "../context/HslThemeContext";
import { X, Palette, RotateCcw, Check, Sparkles } from "lucide-react";

export const HslTunerModal: React.FC = () => {
  const {
    hue,
    saturation,
    lightness,
    activePresetId,
    setHue,
    setSaturation,
    setLightness,
    applyPreset,
    resetToDefault,
    isTunerOpen,
    setIsTunerOpen,
  } = useHslTheme();

  if (!isTunerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="relative bg-[#FDFBF7] border border-[#E8DFC8] rounded-3xl max-w-md w-full p-5 sm:p-6 shadow-2xl space-y-5 max-h-[90dvh] overflow-y-auto overflow-x-hidden overscroll-contain">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-[#EAE3D8]">
          <div className="flex items-center gap-2">
            <div
              style={{
                backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
              }}
              className="w-7 h-7 rounded-xl text-white flex items-center justify-center shadow-2xs"
            >
              <Palette className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#2D241E]">
                Atelier de Nuances
              </h3>
              <p className="text-[11px] text-[#7A6C5E]">
                Harmonisation des couleurs en temps réel
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsTunerOpen(false)}
            className="p-1.5 rounded-full text-[#7A6C5E] hover:text-[#2D241E] hover:bg-black/5 transition-colors cursor-pointer"
            aria-label="Fermer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Preset Cards */}
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#4A3B2F] block mb-2">
            Nuances prédéfinies
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {HSL_PALETTES.map((preset) => {
              const isSelected = activePresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset)}
                  className={`p-2.5 rounded-2xl border text-left flex items-center gap-2.5 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white border-[#2D241E] shadow-2xs ring-1 ring-[#2D241E]"
                      : "bg-[#FAF7F2] border-[#E8DFC8] hover:bg-white text-[#5C4D3E]"
                  }`}
                >
                  <span
                    style={{
                      backgroundColor: `hsl(${preset.h}, ${preset.s}%, ${preset.l}%)`,
                    }}
                    className="w-5 h-5 rounded-full shrink-0 shadow-2xs border border-white/60 flex items-center justify-center text-white"
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                  </span>
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-[#2D241E] block truncate">
                      {preset.label}
                    </span>
                    <span className="text-[10px] text-[#8C7A68] block truncate">
                      {preset.description}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sliders */}
        <div className="space-y-3.5 pt-2 border-t border-[#EAE3D8]">
          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1 text-[#635345]">
              <span>Teinte (Hue)</span>
              <span className="font-bold text-[#2D241E]">{hue}°</span>
            </div>
            <input
              type="range"
              min={0}
              max={360}
              value={hue}
              onChange={(e) => setHue(Number(e.target.value))}
              className="w-full accent-[#2D241E] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1 text-[#635345]">
              <span>Saturation</span>
              <span className="font-bold text-[#2D241E]">{saturation}%</span>
            </div>
            <input
              type="range"
              min={20}
              max={100}
              value={saturation}
              onChange={(e) => setSaturation(Number(e.target.value))}
              className="w-full accent-[#2D241E] cursor-pointer"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-mono mb-1 text-[#635345]">
              <span>Luminosité (Lightness)</span>
              <span className="font-bold text-[#2D241E]">{lightness}%</span>
            </div>
            <input
              type="range"
              min={25}
              max={78}
              value={lightness}
              onChange={(e) => setLightness(Number(e.target.value))}
              className="w-full accent-[#2D241E] cursor-pointer"
            />
          </div>
        </div>

        {/* Active color & Harmonized dark preview & Reset */}
        <div className="p-3.5 rounded-2xl bg-white border border-[#E8DFC8] space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-[#5C4D3E]">
              <span
                style={{
                  backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
                }}
                className="w-4 h-4 rounded-full border border-black/10 inline-block shadow-2xs"
                title="Couleur d'accent"
              />
              <span
                style={{
                  backgroundColor: `hsl(${hue}, 24%, 14%)`,
                }}
                className="w-4 h-4 rounded-full border border-black/10 inline-block shadow-2xs"
                title="Couleur sombre harmonisée"
              />
              <span className="font-bold text-[#2D241E]">
                {hue}° · {saturation}% · {lightness}%
              </span>
            </div>
            <button
              type="button"
              onClick={resetToDefault}
              className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#7A6C5E] hover:text-[#2D241E] hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Défaut (#D3A376)</span>
            </button>
          </div>
          <p className="text-[10px] text-[#8C7A68] leading-tight">
            ✓ Les tons sombres s'adaptent automatiquement à la teinte pour conserver un contraste et une harmonie parfaits.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsTunerOpen(false)}
          style={{
            backgroundColor: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
          }}
          className="w-full py-2.5 rounded-full text-white text-xs font-semibold shadow-xs hover:brightness-95 active:scale-95 transition-all cursor-pointer"
        >
          Appliquer & Fermer
        </button>
      </div>
    </div>
  );
};
