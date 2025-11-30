"use client";
import { Volume2, VolumeX } from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export type VideoAudio = {
  mute?: boolean;
};

type VideoAudioPanelProps = {
  transforms: VideoAudio;
  onTransformChange: (audio: VideoAudio) => void;
};

const gradientBg = {
  backgroundImage:
    "linear-gradient(to top left, rgba(236,72,153,0.08), rgba(236,72,153,0.00))",
};

const VideoAudioPanel = ({ transforms, onTransformChange }: VideoAudioPanelProps) => {
  const update = (patch: Partial<VideoAudio>) => {
    onTransformChange({ ...transforms, ...patch });
  };

  const resetAll = () => {
    onTransformChange({});
  };

  return (
    <div className="h-full flex flex-col space-y-1 scrollbar-hidden overflow-auto">
      <div>
        <Accordion type="multiple" defaultValue={["audio-controls"]}>
          <AccordionItem value="audio-controls">
            <AccordionTrigger className="py-3 cursor-pointer">
              <div className="flex items-center gap-2">
                <Volume2 className="size-4" />
                Audio Controls
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-4 pt-2 px-0.5">
              {/* Mute Audio */}
              <div
                className="flex items-center justify-between p-3 rounded-lg border border-pink-500/20"
                style={gradientBg}
              >
                <div className="flex items-center gap-3">
                  <VolumeX className="size-5 text-pink-600 dark:text-pink-400" />
                  <div>
                    <Label className="text-sm font-medium cursor-pointer">
                      Mute Audio
                    </Label>
                    <p className="text-[10px] text-muted-foreground">
                      Remove audio stream from video (ac-none)
                    </p>
                  </div>
                </div>
                <Switch
                  checked={transforms.mute || false}
                  onCheckedChange={(checked) =>
                    update({ mute: checked || undefined })
                  }
                />
              </div>

              {/* Info box when muted */}
              {transforms.mute && (
                <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 p-3">
                  <p className="text-[10px] text-blue-600 dark:text-blue-400">
                    ℹ️ The video will be muted. You can still control the video
                    codec separately.
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Action Buttons */}
      <div className="pt-4 pb-12 px-0.5">
        <div className="flex gap-2">
          <button
            onClick={resetAll}
            className="flex-1 rounded-full h-8 bg-transparent shadow-none border-0 ring-1 ring-pink-500/20 dark:ring-pink-400/15 dark:bg-background/50 cursor-pointer text-sm hover:bg-pink-500/5 transition-colors"
            style={gradientBg}
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoAudioPanel;
        
