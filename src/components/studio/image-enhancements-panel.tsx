"use client";
import {
  Paintbrush,
  Droplet,
  Square,
  Sparkles,
  Layers2,
  Palette,
  RotateCw,
  RefreshCcw,
  RotateCcw,
  SquareDashed,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

export type Enhancements = {
  blur?: number;
  sharpen?: number;
  shadow?: {
    blur?: number;
    saturation?: number;
    offsetX?: number;
    offsetY?: number;
  };
  background?: {
    type: "solid" | "blurred" | "dominant";
    color?: string;
    blurIntensity?: number | "auto";
    brightness?: number;
  };
  border?: {
    width: number | string;
    color: string;
  };
  rotate?: number | "auto" | `N${number}`;
  flip?: "h" | "v" | "h_v";
  radius?: number | "max";
};

type ImageEnhancementsPanelProps = {
  transforms: Enhancements;
  onTransformChange: (enhancements: Enhancements) => void;
};

const inputStyles =
  "rounded-full px-4 h-8 focus-visible:ring-0 shadow-none border-transparent ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50";

const buttonStyles =
  "rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";

const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

const ImageEnhancementsPanel = ({
  transforms,
  onTransformChange,
}: ImageEnhancementsPanelProps) => {
  const update = (patch: Partial<Enhancements>) => {
    onTransformChange({ ...transforms, ...patch });
  };

  const updateShadow = (
    patch: Partial<NonNullable<Enhancements["shadow"]>>
  ) => {
    const newShadow = {
      ...(transforms.shadow || {}),
      ...patch,
    };

    const isEffectivelyEmpty =
      !newShadow.blur &&
      !newShadow.saturation &&
      !newShadow.offsetX &&
      !newShadow.offsetY;

    if (isEffectivelyEmpty) {
      update({ shadow: undefined });
    } else {
      update({ shadow: newShadow });
    }
  };

  const updateBackground = (
    patch: Partial<NonNullable<Enhancements["background"]>>
  ) => {
    const currentBackground = transforms.background;
    if (!currentBackground && !patch.type) {
      return;
    }

    const newBackground = {
      ...(currentBackground || {}),
      ...patch,
    } as NonNullable<Enhancements["background"]>;

    if (newBackground.type) {
      update({ background: newBackground });
    } else {
      update({ background: undefined });
    }
  };

  const updateBorder = (
    patch: Partial<NonNullable<Enhancements["border"]>>
  ) => {
    const newBorder = {
      ...(transforms.border || { width: 5, color: "000000" }),
      ...patch,
    } as NonNullable<Enhancements["border"]>;

    if (newBorder.width && newBorder.color) {
      update({ border: newBorder });
    } else {
      update({ border: undefined });
    }
  };

  const resetAll = () => {
    onTransformChange({});
  };

  const resetShadow = () => {
    update({ shadow: undefined });
  };

  const resetBackground = () => {
    update({ background: undefined });
  };

  const resetBorder = () => {
    update({ border: undefined });
  };

  const resetRotate = () => {
    update({ rotate: undefined });
  };

  const resetFlip = () => {
    update({ flip: undefined });
  };

  const resetRadius = () => {
    update({ radius: undefined });
  };

  const currentBgType = transforms.background?.type;

  return (
    <div className="h-full flex flex-col space-y-1 scrollbar-hidden overflow-auto">
      <div>
        <Accordion type="multiple">
          {/* Rotate & Flip & Radius */}
          <AccordionItem value="basic-transforms">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <RotateCcw className="size-4" />
                Basic Transforms
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              {/* Rotate */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Rotation</Label>
                <div className="flex gap-2">
                  <Input
                    type="number"
                    placeholder="90"
                    min="-360"
                    max="360"
                    step="1"
                    value={
                      typeof transforms.rotate === "number"
                        ? transforms.rotate
                        : ""
                    }
                    onChange={(e) => {
                      const val = e.target.value
                        ? parseInt(e.target.value)
                        : undefined;
                      update({ rotate: val });
                    }}
                    className={inputStyles}
                    style={gradientBg}
                  />
                  <Select
                    value={transforms.rotate === "auto" ? "auto" : "manual"}
                    onValueChange={(value) => {
                      if (value === "auto") {
                        update({ rotate: "auto" });
                      } else if (transforms.rotate === "auto") {
                        update({ rotate: 0 });
                      }
                    }}
                  >
                    <SelectTrigger
                      className="w-1/3 rounded-full h-8 shadow-none border-transparent ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50"
                      style={gradientBg}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="manual">Manual</SelectItem>
                      <SelectItem value="auto">Auto (EXIF)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Degrees (clockwise, negative for counter-clockwise)
                </p>
              </div>

              {/* Flip */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">Flip</Label>
                <Select
                  value={transforms.flip || "none"}
                  onValueChange={(value) => {
                    update({
                      flip:
                        value === "none"
                          ? undefined
                          : (value as "h" | "v" | "h_v"),
                    });
                  }}
                >
                  <SelectTrigger className={inputStyles} style={gradientBg}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="h">Horizontal (h)</SelectItem>
                    <SelectItem value="v">Vertical (v)</SelectItem>
                    <SelectItem value="h_v">Both (h\_v)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2 space-y-2 mt5 ">
                <Button
                  variant="ghost"
                  onClick={resetFlip}
                  className={buttonStyles}
                  style={gradientBg}
                >
                  Reset Flip
                </Button>
                <Button
                  variant="ghost"
                  onClick={resetRotate}
                  className={buttonStyles}
                  style={gradientBg}
                >
                  Reset Rotation
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="enhancements">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4" />
                Enhancements
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  Blur Intensity{" "}
                  {transforms.blur ? `(${transforms.blur})` : "(0)"}
                </Label>

                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[transforms.blur || 0]}
                  onValueChange={([value]) =>
                    update({ blur: value === 0 ? undefined : value })
                  }
                  className="w-full"
                />
                <p className="text-[10px] text-muted-foreground">
                  Applies Gaussian blur (1-100)
                </p>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  Sharpen Amount{" "}
                  {transforms.sharpen ? `(${transforms.sharpen})` : "(0)"}
                </Label>
                <Slider
                  min={0}
                  max={10}
                  step={1}
                  value={[transforms.sharpen || 0]}
                  onValueChange={([value]) =>
                    update({ sharpen: value === 0 ? undefined : value })
                  }
                  className="w-full"
                />
                <p className="text-[10px] text-muted-foreground">
                  Enhances edges and finer details (1-10)
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Background */}
          <AccordionItem value="background">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Palette className="size-4" />
                Background
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Background Type</Label>
                <Select
                  value={currentBgType || "none"}
                  onValueChange={(value) => {
                    if (value === "none") {
                      update({ background: undefined });
                    } else {
                      updateBackground({
                        type: value as "solid" | "blurred" | "dominant",
                      });
                    }
                  }}
                >
                  <SelectTrigger className={inputStyles} style={gradientBg}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="solid">Solid Color</SelectItem>
                    <SelectItem value="blurred">Blurred</SelectItem>
                    <SelectItem value="dominant">Dominant Color</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {currentBgType === "solid" && (
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Color (Hex)</Label>
                  <Input
                    type="text"
                    placeholder="FFFFFF or FF0000"
                    maxLength={8}
                    value={transforms.background?.color || ""}
                    onChange={(e) =>
                      updateBackground({ color: e.target.value || undefined })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                  <p className="text-[10px] text-muted-foreground">
                    6-digit RGB hex (FF0000) or 8-digit RGBA hex (FF000050)
                  </p>
                </div>
              )}

              {currentBgType === "blurred" && (
                <>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">
                      Blur Intensity
                    </Label>
                    <Select
                      value={
                        transforms.background?.blurIntensity === "auto"
                          ? "auto"
                          : transforms.background?.blurIntensity?.toString() ||
                            "auto"
                      }
                      onValueChange={(value) => {
                        updateBackground({
                          blurIntensity:
                            value === "auto" ? "auto" : parseInt(value),
                        });
                      }}
                    >
                      <SelectTrigger className={inputStyles} style={gradientBg}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto</SelectItem>
                        {Array.from({ length: 21 }, (_, i) => i * 5).map(
                          (val) => (
                            <SelectItem key={val} value={val.toString()}>
                              {val}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <p className="text-[10px] text-muted-foreground">
                      0-100 (auto adjusts based on dimensions)
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-medium">
                      Brightness {transforms.background?.brightness ?? 0}
                    </Label>
                    <Slider
                      min={-255}
                      max={255}
                      step={5}
                      value={[transforms.background?.brightness ?? 0]}
                      onValueChange={([value]) =>
                        updateBackground({
                          brightness: value === 0 ? undefined : value,
                        })
                      }
                      className="w-full"
                    />
                    <p className="text-[10px] text-muted-foreground">
                      Negative darkens, positive lightens (-255 to 255)
                    </p>
                  </div>

                  <p className="text-[10px] text-muted-foreground">
                    ⚠️ Only works with pad_resize crop mode
                  </p>
                </>
              )}

              {currentBgType === "dominant" && (
                <p className="text-[10px] text-muted-foreground">
                  Automatically uses the dominant color from image borders.
                  Works with pad_resize and pad_extract crop modes.
                </p>
              )}

              <Button
                variant="ghost"
                onClick={resetBackground}
                className={`w-full ${buttonStyles}`}
                style={gradientBg}
              >
                Reset Background
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* Border */}
          <AccordionItem value="border">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <SquareDashed className="size-4" />
                Border
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Width (px)</Label>
                  <Input
                    type="text"
                    placeholder="5"
                    value={transforms.border?.width ?? ""}
                    onChange={(e) =>
                      updateBorder({ width: e.target.value || undefined })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Number or Arithmetic Expression
                  </p>
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Color (Hex)</Label>
                  <Input
                    type="text"
                    placeholder="FF0000"
                    maxLength={6}
                    value={transforms.border?.color ?? ""}
                    onChange={(e) =>
                      updateBorder({ color: e.target.value || undefined })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                  <p className="text-[10px] text-muted-foreground">
                    6-digit RGB hex
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                onClick={resetBorder}
                className={`w-full ${buttonStyles}`}
                style={gradientBg}
              >
                Reset Border
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="pt-4 pb-12 px-0.5">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={resetAll}
            className={`flex-1 ${buttonStyles}`}
            style={gradientBg}
          >
            Reset All
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageEnhancementsPanel;
