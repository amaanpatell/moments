import {
  BasicsTransform,
  //   BasicsTransform,
  CropMode,
  FocusMode,
} from "@/types/video-transformations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { Crop, Focus, Grid3X3, Target } from "lucide-react";
import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Button } from "../../ui/button";
import { Slider } from "../../ui/slider";

type BasicsControlsProps = {
  transforms: BasicsTransform;
  onTransformChange: (Transforms: BasicsTransform) => void;
};

const aspectRatio = [
  { label: "Custom", value: "custom" },
  { label: "1:1 (Square)", value: "1-1" },
  { label: "16:9 (Wide)", value: "16-9" },
  { label: "9:16 (Portrait)", value: "9-16" },
  { label: "4:3 (Standard)", value: "4-3" },
  { label: "3:2 (Photo)", value: "3-2" },
  { label: "21:9 (Ultra Wide)", value: "21-9" },
];

const cropModes = [
  { label: "Maintain Ratio", value: "maintain_ratio" },
  { label: "Pad & Resize", value: "pad_resize" },
  { label: "Force", value: "force" },
  { label: "At Max", value: "at_max" },
  { label: "At Least", value: "at_least" },
  { label: "Extract", value: "extract" },
];

const focusModes = [
  { label: "Center", value: "center" },
  { label: "Top", value: "top" },
  { label: "Bottom", value: "bottom" },
  { label: "Left", value: "left" },
  { label: "Right", value: "right" },
  { label: "Top Left", value: "top_left" },
  { label: "Top Right", value: "top_right" },
  { label: "Bottom Left", value: "bottom_left" },
  { label: "Bottom Right", value: "bottom_right" },
  { label: "Auto", value: "auto" },
  { label: "Face", value: "face" },
  { label: "Custom", value: "custom" },
];

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

export function VideoBasicsPanel({
  transforms,
  onTransformChange,
}: BasicsControlsProps) {
  const update = (patch: Partial<BasicsTransform>) => {
    onTransformChange({ ...transforms, ...patch });
  };

  const resetDimensions = () => {
    update({ width: undefined, height: undefined, aspectRatio: undefined });
  };

  const resetFocus = () => {
    update({
      focus: undefined,
    });
  };

  const resetAll = () => {
    onTransformChange({
      width: undefined,
      height: undefined,
      aspectRatio: undefined,
      cropMode: undefined,
      focus: undefined,
      cropping: undefined,
    });
  };

  const updateCropping = (
    patch: Partial<NonNullable<BasicsTransform["cropping"]>>
  ) => {
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

  const currentCropType = transforms.cropping?.type || "none";
  const currentObjectName = transforms.cropping?.objectName;

  return (
    <div className="h-full flex flex-col space-y-1 scrollbar-hidden overflow-auto">
      <div>
        <Accordion type="multiple">
          <AccordionItem value="resize-crop">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Crop className="size-4" />
                Resize & Crop
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Width</Label>
                  <Input
                    type="number"
                    placeholder="Auto"
                    value={transforms.width || ""}
                    onChange={(e) =>
                      update({
                        width: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    className={inputStyles}
                    style={gradientBg}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-xs font-medium">Height</Label>
                  <Input
                    type="number"
                    placeholder="Auto"
                    value={transforms.height || ""}
                    onChange={(e) =>
                      update({
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

              <div className="space-y-2">
                <Label className="text-xs font-medium">Aspect Ratio</Label>
                <Select
                  value={transforms.aspectRatio || "custom"}
                  onValueChange={(value) =>
                    update({
                      aspectRatio: value === "custom" ? undefined : value,
                    })
                  }
                >
                  <SelectTrigger className={inputStyles} style={gradientBg}>
                    <SelectValue placeholder="Select ratio" />
                  </SelectTrigger>
                  <SelectContent>
                    {aspectRatio.map((ratio) => (
                      <SelectItem key={ratio.value} value={ratio.value}>
                        {ratio.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs font-medium">Crop Mode</Label>
                <Select
                  value={transforms.cropMode || "maintain_ratio"}
                  onValueChange={(value) =>
                    update({
                      cropMode:
                        value === "maintain_ratio"
                          ? undefined
                          : (value as CropMode),
                    })
                  }
                >
                  <SelectTrigger className={inputStyles} style={gradientBg}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cropModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                onClick={resetDimensions}
                className={`w-full rounded-full ${buttonStyles}`}
                style={gradientBg}
              >
                Reset Dimensions
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* Focus Zoom */}
          <AccordionItem value="focus-zoom">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Focus className="size-4" />
                Focus & Zoom
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              <div className="space-y-2">
                <Label className="text-xs font-medium">Focus Point</Label>
                <Select
                  value={transforms.focus || "center"}
                  onValueChange={(value) =>
                    update({
                      focus:
                        value === "center" ? undefined : (value as FocusMode),
                    })
                  }
                >
                  <SelectTrigger className={inputStyles} style={gradientBg}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {focusModes.map((mode) => (
                      <SelectItem key={mode.value} value={mode.value}>
                        {mode.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button
                variant="outline"
                onClick={resetFocus}
                className={`w-full rounded-full ${buttonStyles}`}
                style={gradientBg}
              >
                Reset Focus & Zoom
              </Button>
            </AccordionContent>
          </AccordionItem>

          {/* AI Cropping */}
          <AccordionItem value="ai-cropping">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Target className="size-4" />
                Smart Cropping
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
                        type: value as NonNullable<
                          BasicsTransform["cropping"]
                        >["type"],
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

              <Button
                variant="ghost"
                onClick={resetAICropping}
                className={`w-full rounded-full ${buttonStyles}`}
                style={gradientBg}
              >
                Reset Smart Cropping
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="pt-4 pb-12 px-0.5">
        <div className="flex gap-2">
          <Button
            variant={"outline"}
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
