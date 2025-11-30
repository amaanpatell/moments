"use client";
import { Video, Palette, Square, RotateCw, Circle } from "lucide-react";

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
import { BasicsTransform } from "@/types/video-transformations";

type VideoBasicsPanelProps = {
  transforms: BasicsTransform;
  onTransformChange: (basics: BasicsTransform) => void;
};

const inputStyles =
  "rounded-full px-4 h-8 focus-visible:ring-0 shadow-none border-transparent ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50";

const buttonStyles =
  "rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";

const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

const VideoEnhancementsPanel = ({
  transforms,
  onTransformChange,
}: VideoBasicsPanelProps) => {
  const update = (patch: Partial<BasicsTransform>) => {
    onTransformChange({ ...transforms, ...patch });
  };

  const updateBackground = (
    patch: Partial<NonNullable<BasicsTransform["background"]>>
  ) => {
    const currentBackground = transforms.background;

    if (!currentBackground && !patch.type) {
      return;
    }

    const newBackground = {
      ...(currentBackground || {}),
      ...patch,
    } as NonNullable<BasicsTransform["background"]>;

    if (newBackground.type) {
      update({ background: newBackground });
    } else {
      update({ background: undefined });
    }
  };

  const updateBorder = (
    patch: Partial<NonNullable<BasicsTransform["border"]>>
  ) => {
    const currentBorder = transforms.border;
    const newBorder = {
      ...(currentBorder || { width: 5, color: "000000" }),
      ...patch,
    } as NonNullable<BasicsTransform["border"]>;

    update({ border: newBorder });
  };

  const resetAll = () => {
    onTransformChange({});
  };

  const resetBackground = () => {
    update({ background: undefined });
  };

  const resetBorder = () => {
    update({ border: undefined });
  };

  const currentBgType = transforms.background?.type;
  const hasBorder = transforms.border !== undefined;

  return (
    <div className="h-full flex flex-col space-y-1 scrollbar-hidden overflow-auto">
      <div>
        <Accordion type="multiple">
          {/* Rotate */}
          <AccordionItem value="rotate">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <RotateCw className="size-4" />
                Rotate
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Rotation Angle</Label>
                <Select
                  value={transforms.rotate?.toString() || "0"}
                  onValueChange={(value) => {
                    const angle = parseInt(value) as 0 | 90 | 180 | 270 | 360;
                    update({ rotate: angle === 0 ? undefined : angle });
                  }}
                >
                  <SelectTrigger className={inputStyles} style={gradientBg}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0° (No rotation)</SelectItem>
                    <SelectItem value="90">90° (Clockwise)</SelectItem>
                    <SelectItem value="180">180° (Upside down)</SelectItem>
                    <SelectItem value="270">270° (Counter-clockwise)</SelectItem>
                    <SelectItem value="360">360° (Full rotation)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground">
                  Rotate the video by specified degrees
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* Border */}
          <AccordionItem value="border">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Square className="size-4" />
                Border
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="flex items-center justify-between mb-3">
                <Label className="text-xs font-medium">Enable Border</Label>
                <input
                  type="checkbox"
                  checked={hasBorder}
                  onChange={(e) => {
                    if (e.target.checked) {
                      updateBorder({ width: 5, color: "000000" });
                    } else {
                      resetBorder();
                    }
                  }}
                  className="rounded border-pink-500/20"
                />
              </div>

              {hasBorder && (
                <>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label className="text-[10px] text-muted-foreground">
                        Width (px)
                      </Label>
                      <Input
                        type="number"
                        placeholder="5"
                        min="1"
                        value={transforms.border?.width || ""}
                        onChange={(e) =>
                          updateBorder({
                            width: e.target.value ? parseInt(e.target.value) : 5,
                          })
                        }
                        className={inputStyles}
                        style={gradientBg}
                      />
                    </div>
                    <div>
                      <Label className="text-[10px] text-muted-foreground">
                        Color (Hex)
                      </Label>
                      <Input
                        type="text"
                        placeholder="000000"
                        maxLength={6}
                        value={transforms.border?.color || ""}
                        onChange={(e) =>
                          updateBorder({ color: e.target.value })
                        }
                        className={inputStyles}
                        style={gradientBg}
                      />
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground">
                    Syntax: b-{transforms.border?.width || "width"}_
                    {transforms.border?.color || "hexcode"}
                  </p>
                </>
              )}
            </AccordionContent>
          </AccordionItem>

          {/* Radius */}
          <AccordionItem value="radius">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Circle className="size-4" />
                Radius
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium">Corner Radius</Label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      update({ radius: transforms.radius === "max" ? undefined : "max" })
                    }
                    className="h-6 text-[10px] px-2"
                  >
                    {transforms.radius === "max" ? "Reset" : "Set to Max"}
                  </Button>
                </div>

                {transforms.radius !== "max" && (
                  <>
                    <Slider
                      min={0}
                      max={200}
                      step={5}
                      value={[typeof transforms.radius === "number" ? transforms.radius : 0]}
                      onValueChange={([value]) =>
                        update({ radius: value === 0 ? undefined : value })
                      }
                      className="w-full"
                    />
                    <p className="text-[10px] text-muted-foreground">
                      Current: {transforms.radius || 0}px
                    </p>
                  </>
                )}

                {transforms.radius === "max" && (
                  <div className="rounded-lg bg-purple-500/10 border border-purple-500/20 p-3">
                    <p className="text-[10px] text-purple-600 dark:text-purple-400">
                      Max radius creates a circle (1:1) or oval (rectangular) shape
                    </p>
                  </div>
                )}
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
                        type: value as "solid" | "blurred",
                      });
                    }
                  }}
                >
                  <SelectTrigger className={inputStyles} style={gradientBg}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None (Black)</SelectItem>
                    <SelectItem value="solid">Solid Color</SelectItem>
                    <SelectItem value="blurred">Blurred</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-[10px] text-muted-foreground">
                  Used with pad_resize crop mode or radius
                </p>
              </div>

              {/* Solid Color Background */}
              {currentBgType === "solid" && (
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Color</Label>
                  <Input
                    type="text"
                    placeholder="FFFFFF or red"
                    maxLength={8}
                    value={transforms.background?.color || ""}
                    onChange={(e) =>
                      updateBackground({ color: e.target.value || undefined })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                  <p className="text-[10px] text-muted-foreground">
                    6-digit hex (FF0000), 8-digit RGBA (FF000050), or color name (red)
                  </p>
                </div>
              )}

              {/* Blurred Background */}
              {currentBgType === "blurred" && (
                <>
                  <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3 mb-3">
                    <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium">
                      ℹ️ Only works with <strong>cm-pad_resize</strong> crop mode
                    </p>
                  </div>

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
                </>
              )}

              {/* {currentBgType && currentBgType !== "none" && (
                <Button
                  variant="ghost"
                  onClick={resetBackground}
                  className="w-full rounded-full"
                >
                  Reset Background
                </Button>
              )} */}
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

export default VideoEnhancementsPanel;