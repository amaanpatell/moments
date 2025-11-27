"use client";
import { Paintbrush, Droplet, Square, Sparkles } from "lucide-react";

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

  const updateShadow = (patch: Partial<NonNullable<Enhancements["shadow"]>>) => {
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
    
    // If there's no current background and no type in patch, do nothing
    if (!currentBackground && !patch.type) {
      return;
    }

    const newBackground = {
      ...(currentBackground || {}),
      ...patch,
    } as NonNullable<Enhancements["background"]>;

    // Only update if type is defined
    if (newBackground.type) {
      update({ background: newBackground });
    } else {
      update({ background: undefined });
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

  const currentBgType = transforms.background?.type;

  return (
    <div className="h-full flex flex-col space-y-1 scrollbar-hidden overflow-auto">
      <div>
        <Accordion type="multiple">
          {/* Blur */}
          <AccordionItem value="blur">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Droplet className="size-4" />
                Blur
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  Blur Intensity {transforms.blur ? `(${transforms.blur})` : "(0)"}
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
            </AccordionContent>
          </AccordionItem>

          {/* Sharpen */}
          <AccordionItem value="sharpen">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4" />
                Sharpen
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  Sharpen Amount {transforms.sharpen ? `(${transforms.sharpen})` : "(0)"}
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

          {/* Shadow */}
          <AccordionItem value="shadow">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Square className="size-4" />
                Shadow
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <p className="text-[10px] text-muted-foreground mb-2">
                Adds shadow under solid objects in transparent images (max 2MP)
              </p>

              {/* Shadow Blur */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  Blur {transforms.shadow?.blur ?? 10}
                </Label>
                <Slider
                  min={0}
                  max={15}
                  step={1}
                  value={[transforms.shadow?.blur ?? 10]}
                  onValueChange={([value]) =>
                    updateShadow({ blur: value === 10 ? undefined : value })
                  }
                  className="w-full"
                />
              </div>

              {/* Shadow Saturation */}
              <div className="space-y-2">
                <Label className="text-xs font-medium">
                  Saturation {transforms.shadow?.saturation ?? 30}
                </Label>
                <Slider
                  min={0}
                  max={100}
                  step={1}
                  value={[transforms.shadow?.saturation ?? 30]}
                  onValueChange={([value]) =>
                    updateShadow({ saturation: value === 30 ? undefined : value })
                  }
                  className="w-full"
                />
              </div>

              {/* Shadow Offsets */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-[10px] text-muted-foreground">
                    X Offset (%)
                  </Label>
                  <Input
                    type="number"
                    placeholder="2"
                    value={transforms.shadow?.offsetX ?? ""}
                    onChange={(e) =>
                      updateShadow({
                        offsetX: e.target.value ? parseInt(e.target.value) : undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div>
                  <Label className="text-[10px] text-muted-foreground">
                    Y Offset (%)
                  </Label>
                  <Input
                    type="number"
                    placeholder="2"
                    value={transforms.shadow?.offsetY ?? ""}
                    onChange={(e) =>
                      updateShadow({
                        offsetY: e.target.value ? parseInt(e.target.value) : undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
              </div>

              <Button
                variant="ghost"
                onClick={resetShadow}
                className="w-full rounded-full"
              >
                Reset Shadow
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* Background */}
          <AccordionItem value="background">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Paintbrush className="size-4" />
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
                      updateBackground({ type: value as "solid" | "blurred" | "dominant" });
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

              {/* Solid Color Background */}
              {currentBgType === "solid" && (
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Color (Hex)</Label>
                  <Input
                    type="text"
                    placeholder="FFFFFF or FF0000"
                    value={transforms.background?.color || ""}
                    onChange={(e) =>
                      updateBackground({ color: e.target.value || undefined })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                  <p className="text-[10px] text-muted-foreground">
                    Enter 6-digit RGB hex (e.g., FF0000) or 8-digit RGBA hex
                  </p>
                </div>
              )}

              {/* Blurred Background */}
              {currentBgType === "blurred" && (
                <>
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Blur Intensity</Label>
                    <Select
                      value={
                        transforms.background?.blurIntensity === "auto"
                          ? "auto"
                          : transforms.background?.blurIntensity?.toString() || "auto"
                      }
                      onValueChange={(value) => {
                        updateBackground({
                          blurIntensity: value === "auto" ? "auto" : parseInt(value),
                        });
                      }}
                    >
                      <SelectTrigger className={inputStyles} style={gradientBg}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="auto">Auto</SelectItem>
                        {Array.from({ length: 21 }, (_, i) => i * 5).map((val) => (
                          <SelectItem key={val} value={val.toString()}>
                            {val}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
                        updateBackground({ brightness: value === 0 ? undefined : value })
                      }
                      className="w-full"
                    />
                    <p className="text-[10px] text-muted-foreground">
                      Negative values darken, positive values lighten
                    </p>
                  </div>

                  <p className="text-[10px] text-muted-foreground">
                    Note: Only works with pad_resize crop mode
                  </p>
                </>
              )}

              {/* Dominant Color Background */}
              {currentBgType === "dominant" && (
                <p className="text-[10px] text-muted-foreground">
                  Automatically uses the dominant color from image borders. Works with
                  pad_resize and pad_extract.
                </p>
              )}

              <Button
                variant="ghost"
                onClick={resetBackground}
                className="w-full rounded-full"
              >
                Reset Background
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Action Buttons */}
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