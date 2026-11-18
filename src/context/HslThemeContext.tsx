import React, { createContext, useContext, useState, useEffect } from "react";
import { HSL_PALETTES } from "../data/portfolioData";
import { HslPreset } from "../portfolio-types";

interface HslThemeContextType {
  hue: number;
  saturation: number;
  lightness: number;
  activePresetId: string;
  setHue: (h: number) => void;
  setSaturation: (s: number) => void;
  setLightness: (l: number) => void;
  applyPreset: (preset: HslPreset) => void;
  resetToDefault: () => void;
  isTunerOpen: boolean;
  setIsTunerOpen: (open: boolean) => void;
}

const HslThemeContext = createContext<HslThemeContextType | undefined>(undefined);

const DEFAULT_PRESET = HSL_PALETTES[0]; // Beige Lin Naturel (h: 36, s: 36, l: 68)

export const HslThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [hue, setHueState] = useState<number>(DEFAULT_PRESET.h);
  const [saturation, setSaturationState] = useState<number>(DEFAULT_PRESET.s);
  const [lightness, setLightnessState] = useState<number>(DEFAULT_PRESET.l);
  const [activePresetId, setActivePresetId] = useState<string>(DEFAULT_PRESET.id);
  const [isTunerOpen, setIsTunerOpen] = useState<boolean>(false);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--theme-h", `${hue}`);
    root.style.setProperty("--theme-s", `${saturation}%`);
    root.style.setProperty("--theme-l", `${lightness}%`);
    root.style.setProperty(
      "--primary-hsl",
      `hsl(${hue}, ${saturation}%, ${lightness}%)`
    );
    root.style.setProperty(
      "--primary-hsl-contrast",
      `hsl(${hue}, ${Math.min(saturation + 10, 85)}%, 38%)`
    );

    // High contrast button text: dark for light themes (e.g. Beige at 68%), white for dark themes
    const isLightBg = lightness > 55;
    root.style.setProperty(
      "--primary-btn-text",
      isLightBg ? `hsl(${hue}, 28%, 14%)` : "#FFFFFF"
    );

    // Harmonized dark color palette: maintains deep darkness (~13% lightness) while adapting to the chosen hue
    root.style.setProperty("--color-dark", `hsl(${hue}, 24%, 13%)`);
    root.style.setProperty("--color-dark-deep", `hsl(${hue}, 28%, 9%)`);
    root.style.setProperty("--color-dark-surface", `hsl(${hue}, 20%, 18%)`);
    root.style.setProperty("--color-dark-border", `hsl(${hue}, 18%, 24%)`);

    // Harmonized text hierarchy
    root.style.setProperty("--text-primary", `hsl(${hue}, 24%, 13%)`);
    root.style.setProperty("--text-secondary", `hsl(${hue}, 16%, 28%)`);
    root.style.setProperty("--text-muted", `hsl(${hue}, 12%, 42%)`);

    // Harmonized surfaces and borders (soft beige/cream palette)
    root.style.setProperty("--bg-page", `hsl(${hue}, 30%, 98%)`);
    root.style.setProperty("--bg-subtle", `hsl(${hue}, 24%, 95%)`);
    root.style.setProperty("--border-subtle", `hsl(${hue}, 20%, 89%)`);
  }, [hue, saturation, lightness]);

  const setHue = (h: number) => {
    setHueState(h);
    setActivePresetId("custom");
  };

  const setSaturation = (s: number) => {
    setSaturationState(s);
    setActivePresetId("custom");
  };

  const setLightness = (l: number) => {
    setLightnessState(l);
    setActivePresetId("custom");
  };

  const applyPreset = (preset: HslPreset) => {
    setHueState(preset.h);
    setSaturationState(preset.s);
    setLightnessState(preset.l);
    setActivePresetId(preset.id);
  };

  const resetToDefault = () => {
    applyPreset(DEFAULT_PRESET);
  };

  return (
    <HslThemeContext.Provider
      value={{
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
      }}
    >
      {children}
    </HslThemeContext.Provider>
  );
};

export function useHslTheme(): HslThemeContextType {
  const context = useContext(HslThemeContext);
  if (!context) {
    throw new Error("useHslTheme must be used within an HslThemeProvider");
  }
  return context;
}
