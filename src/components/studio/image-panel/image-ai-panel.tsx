"use client";
import { Scissors, Target, Paintbrush } from "lucide-react";

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
import { Switch } from "@/components/ui/switch";

type AiMagic = {
  background?: {
    remove?: boolean;
    mode?: "standard" | "economy";
  };
  shadowLighting?: {
    dropShadow?: {
      azimuth?: number;
      elevation?: number;
      saturation?: number;
    };
  };
  cropping?: {
    type?: "smart" | "face" | "object";
    objectName?: string;
    zoom?: number;
    width?: number;
    height?: number;
  };
};

type AiMagicControlsProps = {
  transforms: AiMagic;
  onTransformChange: (transforms: AiMagic) => void;
};

export type AiCropType = "smart" | "face" | "object";

const aiCropModes = [
  { label: "None", value: "none" },
  { label: "Smart Crop", value: "smart" },
  { label: "Face Crop", value: "face" },
  { label: "Object-aware Crop", value: "object" },
];

const cocoObjects = [
  { label: "None", value: "none" },
  { label: "Person", value: "person" },
  { label: "Bicycle", value: "bicycle" },
  { label: "Car", value: "car" },
  { label: "Motorcycle", value: "motorcycle" },
  { label: "Airplane", value: "airplane" },
  { label: "Bus", value: "bus" },
  { label: "Train", value: "train" },
  { label: "Truck", value: "truck" },
  { label: "Boat", value: "boat" },
  { label: "Traffic Light", value: "trafficLight" },
  { label: "Fire Hydrant", value: "fireHydrant" },
  { label: "Stop Sign", value: "stopSign" },
  { label: "Parking Meter", value: "parkingMeter" },
  { label: "Bench", value: "bench" },
  { label: "Bird", value: "bird" },
  { label: "Cat", value: "cat" },
  { label: "Dog", value: "dog" },
  { label: "Horse", value: "horse" },
  { label: "Sheep", value: "sheep" },
  { label: "Cow", value: "cow" },
  { label: "Elephant", value: "elephant" },
  { label: "Bear", value: "bear" },
  { label: "Zebra", value: "zebra" },
  { label: "Giraffe", value: "giraffe" },
  { label: "Backpack", value: "backpack" },
  { label: "Umbrella", value: "umbrella" },
  { label: "Handbag", value: "handbag" },
  { label: "Tie", value: "tie" },
  { label: "Suitcase", value: "suitcase" },
  { label: "Frisbee", value: "frisbee" },
  { label: "Skis", value: "skis" },
  { label: "Snowboard", value: "snowboard" },
  { label: "Sports Ball", value: "sportsBall" },
  { label: "Kite", value: "kite" },
  { label: "Baseball Bat", value: "baseballBat" },
  { label: "Baseball Glove", value: "baseballGlove" },
  { label: "Skateboard", value: "skateboard" },
  { label: "Surfboard", value: "surfboard" },
  { label: "Tennis Racket", value: "tennisRacket" },
  { label: "Bottle", value: "bottle" },
  { label: "Wine Glass", value: "wineGlass" },
  { label: "Cup", value: "cup" },
  { label: "Fork", value: "fork" },
  { label: "Knife", value: "knife" },
  { label: "Spoon", value: "spoon" },
  { label: "Bowl", value: "bowl" },
  { label: "Banana", value: "banana" },
  { label: "Apple", value: "apple" },
  { label: "Sandwich", value: "sandwich" },
  { label: "Orange", value: "orange" },
  { label: "Broccoli", value: "broccoli" },
  { label: "Carrot", value: "carrot" },
  { label: "Hot Dog", value: "hotDog" },
  { label: "Pizza", value: "pizza" },
  { label: "Donut", value: "donut" },
  { label: "Cake", value: "cake" },
  { label: "Chair", value: "chair" },
  { label: "Couch", value: "couch" },
  { label: "Potted Plant", value: "pottedPlant" },
  { label: "Bed", value: "bed" },
  { label: "Dining Table", value: "diningTable" },
  { label: "Toilet", value: "toilet" },
  { label: "TV", value: "tv" },
  { label: "Laptop", value: "laptop" },
  { label: "Mouse", value: "mouse" },
  { label: "Remote", value: "remote" },
  { label: "Keyboard", value: "keyboard" },
  { label: "Cell Phone", value: "cellPhone" },
  { label: "Microwave", value: "microwave" },
  { label: "Oven", value: "oven" },
  { label: "Toaster", value: "toaster" },
  { label: "Sink", value: "sink" },
  { label: "Refrigerator", value: "refrigerator" },
  { label: "Book", value: "book" },
  { label: "Clock", value: "clock" },
  { label: "Vase", value: "vase" },
  { label: "Scissors", value: "scissors" },
  { label: "Teddy Bear", value: "teddyBear" },
  { label: "Hair Drier", value: "hairDrier" },
  { label: "Toothbrush", value: "toothbrush" },
];

const inputStyles =
  "rounded-full px-4 h-8 focus-visible:ring-0 shadow-none border-transparent ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50";

const buttonStyles =
  "rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer";

const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

export function ImageAIPanel({
  transforms,
  onTransformChange,
}: AiMagicControlsProps) {
  const update = (patch: Partial<AiMagic>) => {
    onTransformChange({ ...transforms, ...patch });
  };

  const updateBackground = (
    patch: Partial<NonNullable<AiMagic["background"]>>
  ) => {
    const newBackground = {
      ...(transforms.background || {}),
      ...patch,
    };

    const isEffectivelyEmpty = !newBackground.remove;

    if (isEffectivelyEmpty) {
      update({ background: undefined });
    } else {
      update({ background: newBackground });
    }
  };

  const updateCropping = (patch: Partial<NonNullable<AiMagic["cropping"]>>) => {
    const newCropping = {
      ...(transforms.cropping || {}),
      ...patch,
    };

    const isEffectivelyEmpty = !newCropping.type;

    if (isEffectivelyEmpty) {
      update({ cropping: undefined });
    } else {
      update({ cropping: newCropping });
    }
  };

  const resetAICropping = () => {
    update({ cropping: undefined });
  };

  const resetAll = () => {
    onTransformChange({});
  };

  const currentCropType = transforms.cropping?.type || "none";
  const currentObjectName = transforms.cropping?.objectName;
  const currentZoom = transforms.cropping?.zoom || 1;
  const currentCropWidth = transforms.cropping?.width;
  const currentCropHeight = transforms.cropping?.height;

  return (
    <div className="h-full flex flex-col space-y-1 scrollbar-hidden overflow-auto">
      <div>
        <Accordion type="multiple">
          {/* Background Removal */}
          <AccordionItem value="bg-removal">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Scissors className="size-4" />
                Background Removal
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs font-medium" htmlFor="remove-bg">
                    Remove background
                  </Label>
                  <Switch
                    id="remove-bg"
                    checked={!!transforms.background?.remove}
                    onCheckedChange={(checked) => {
                      updateBackground({ remove: checked });
                    }}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* AI Drop Shadow */}
          {/* <AccordionItem value="drop-shadow">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Paintbrush className="size-4" />
                AI Drop Shadow
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    className="text-xs font-medium"
                    htmlFor="drop-shadow-toggle"
                  >
                    Enable drop shadow
                  </Label>
                  <Switch
                    id="drop-shadow-toggle"
                    checked={!!transforms.shadowLighting?.dropShadow}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateDropShadow({});
                      } else {
                        update({ shadowLighting: undefined });
                      }
                    }}
                  />
                </div>
              </div>
              <p className="text-[10px] text-muted-foreground mb-2">
                Note: Image must have a transparent background. Use background
                removal first.
              </p>
            </AccordionContent>
          </AccordionItem> */}

          {/* AI Cropping */}
          <AccordionItem value="ai-cropping">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Target className="size-4" />
                AI Cropping
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Crop Type</Label>
                <Select
                  value={currentCropType}
                  onValueChange={(value) => {
                    if (value === "none") {
                      update({ cropping: undefined });
                    } else {
                      updateCropping({
                        type: value as AiCropType,
                        objectName: undefined,
                        zoom: undefined,
                      });
                    }
                  }}
                >
                  <SelectTrigger className={inputStyles} style={gradientBg}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {aiCropModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Object-aware Crop Object Selection */}
              {currentCropType === "object" && (
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Object Name</Label>
                  <Select
                    value={currentObjectName || "none"}
                    onValueChange={(value) => {
                      if (value === "none") {
                        updateCropping({ objectName: undefined });
                      } else {
                        updateCropping({ objectName: value });
                      }
                    }}
                  >
                    <SelectTrigger className={inputStyles} style={gradientBg}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {cocoObjects.map((obj) => (
                        <SelectItem key={obj.value} value={obj.value}>
                          {obj.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Dimensions for cropping */}
              {currentCropType !== "none" && (
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Label className="text-[10px] text-muted-foreground">
                      Width
                    </Label>
                    <Input
                      type="number"
                      placeholder="Auto"
                      value={currentCropWidth || ""}
                      onChange={(e) =>
                        updateCropping({
                          width: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                  <div>
                    <Label className="text-[10px] text-muted-foreground">
                      Height
                    </Label>
                    <Input
                      type="number"
                      placeholder="Auto"
                      value={currentCropHeight || ""}
                      onChange={(e) =>
                        updateCropping({
                          height: e.target.value
                            ? parseInt(e.target.value)
                            : undefined,
                        })
                      }
                      className={inputStyles}
                      style={gradientBg}
                    />
                  </div>
                </div>
              )}

              {/* Zoom slider */}
              {currentCropType !== "none" && (
                <div className="space-y-2">
                  <Label className="text-xs font-medium">
                    Zoom {currentZoom ? `${currentZoom.toFixed(1)}x` : "1.0x"}
                  </Label>
                  <Slider
                    min={0.1}
                    max={5.0}
                    step={0.1}
                    value={[currentZoom]}
                    onValueChange={([value]) =>
                      updateCropping({
                        zoom: value === 1 ? undefined : value,
                      })
                    }
                    className="w-full"
                  />
                </div>
              )}

              <Button
                variant="ghost"
                onClick={resetAICropping}
                className="w-full rounded-full"
              >
                Reset AI Cropping
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
}
