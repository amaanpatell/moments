import { TransformationConfig } from "@/types";
import { type SectionKey } from "./dock";
import { ImageBasicsPanel } from "./image-panel/image-basics-panel";
import { ImageAIPanel } from "./image-panel/image-ai-panel";
import ImageEnhancementsPanel from "./image-panel/image-enhancements-panel";
import { VideoBasicsPanel } from "./video-panel/video-basics-panel";

type TransformPanelProps = {
  activeSection: SectionKey;
  transforms: TransformationConfig;
  onTransformChange: (transforms: TransformationConfig) => void;
};

export function TransformPannel({
  activeSection,
  transforms,
  onTransformChange,
}: TransformPanelProps) {
  const getSectionTitle = (section: SectionKey) => {
    switch (section) {
      case "basics":
        return "Basic Adjustments";
      case "enhancements":
        return "Enhancements";
      // case "overlays":
      //   return "Overlays & Effects";
      case "ai":
        return "AI Magic (beta)";
      case "audio":
        return "Audio";
      default:
        return "Transform";
    }
  };

  const renderPanelContent = () => {
    switch (activeSection) {
      case "basics":
        if (transforms.type === "IMAGE") {
          return (
            <ImageBasicsPanel
              transforms={transforms.basics || {}}
              onTransformChange={(b) =>
                onTransformChange({ ...transforms, basics: b })
              }
            />
          );
        } else if (transforms.type === "VIDEO") {
          return (
            <VideoBasicsPanel 
              transforms={transforms.basics || {}}
              onTransformChange={(b) =>
                onTransformChange({ ...transforms, basics: b })
              }
            />
          );
        }
      case "enhancements":
        if (transforms.type === "IMAGE") {
          return (
            <ImageEnhancementsPanel
              transforms={transforms.enhancements || {}}
              onTransformChange={(e) =>
                onTransformChange({ ...transforms, enhancements: e })
              }            
            />
          )
        }
        return <p>Enhancements</p>;
      // case "overlays":
      //   return <p>Overlays & Effects</p>;
      case "ai":
        if (transforms.type === "IMAGE") {
          return (
            <ImageAIPanel
              transforms={transforms.ai || {}}
              onTransformChange={(ai) =>
                onTransformChange({ ...transforms, ai: ai })
              }
            />
          );
        } else if (transforms.type === "VIDEO") {
          return <p>Video AI Magic</p>;
        }
      case "audio":
        return <p>Audio</p>;
      default:
        return (
          <div className="p-4 text-center text-gray-500">
            Select a section to get started
          </div>
        );
    }
  };

  return (
    <div className="border flex flex-col border-pink-300/30 dark:border-pink-200/15 max-md:min-h-32 md:w-1/4 rounded-xl p-6">
      <div className="flex items-center justify-between pb-4 border-gray-300/30 dark:border-white/10">
        <div className="flex items-center gap-2">
          <h3 className="flex items-center gap-2 text-xs text-foreground/60">
            {getSectionTitle(activeSection)}
          </h3>
        </div>
      </div>
      <div className="max-h-full">{renderPanelContent()}</div>
    </div>
  );
}
