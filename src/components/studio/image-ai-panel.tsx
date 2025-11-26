import {
  Crop,
  Edit,
  Focus,
  Grid3X3,
  NotebookPen,
  Scissors,
  Sparkles,
  Sun,
  Target,
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
import { AiMagic } from "@/types/image-transformations";

type AiMagicControlsProps = {
  transforms: AiMagic;
  onTransformChange: (transforms: AiMagic) => void;
};
// -----------------------------------------------------

// Helper for AiMagic cropping type
export type AiCropType = "smart" | "face" | "object";

const aiCropModes = [
  { label: "None", value: "none" },
  { label: "Smart Crop", value: "smart" },
  { label: "Face Crop", value: "face" },
  { label: "Object-aware Crop", value: "object" },
];

const cocoGlasses = [
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

  const updateCropping = (patch: Partial<NonNullable<AiMagic["cropping"]>>) => {
    update({
      cropping: {
        ...(transforms.cropping || {}),
        ...patch,
      },
    });
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

  return (
    <div className="h-full flex flex-col space-y-1 scrollbar-hidden overflow-auto">
      <div>
        <Accordion type="multiple" defaultValue={["ai-cropping"]}>
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

              {/* Conditional div for Object-aware Crop */}
              {currentCropType === "object" && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-medium">Object Name</Label>
                    <Select
                      value={currentObjectName || cocoGlasses[0].value}
                      onValueChange={(value) => {
                        if (value === "none") {
                          updateCropping({ objectName: undefined });
                        } else {
                          updateCropping({
                            objectName: value,
                          });
                        }
                      }}
                    >
                      <SelectTrigger className={inputStyles} style={gradientBg}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {cocoGlasses.map((mode) => (
                          <SelectItem key={mode.value} value={mode.value}>
                            {mode.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
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
          <Button
            variant="outline"
            onClick={() =>
              update({
                background: { remove: true },
              })
            }
            className={`flex-1 ${buttonStyles}`}
            style={gradientBg}
          >
            Remove BG
          </Button>
        </div>
      </div>
    </div>
  );
}
