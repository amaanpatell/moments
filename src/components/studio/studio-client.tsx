"use client";

import { SelectMediaModel } from "@/db/schema";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { SectionKey, StudioDock } from "./dock";
import { TransformationConfig } from "@/types";
import { useHistory } from "@/hooks/use-history";
import { buildImageKitUrl } from "@/lib/transformation-utils";
import { StudioHeader } from "./studio-header";
import UrlBar from "./url-bar";
import PreviewCanvas from "./preview-canvas";

type StudioClientProps = {
  media: SelectMediaModel;
};

export default function StudioClient({ media }: StudioClientProps) {
  const [isPending, startTransition] = useTransition();
  const [zoom, setZoom] = useState(100);
  const [activeSection, setActiveSection] = useState<SectionKey>("basics");

  const router = useRouter();

  const initial: TransformationConfig =
    media.transformationConfig ??
    (media.mediaType === "VIDEO" ? { type: "VIDEO" } : { type: "IMAGE" });

  const history = useHistory<TransformationConfig>(initial);

  const srcUrl = media.originalUrl;
  const builtUrl = useMemo(
    () => buildImageKitUrl(srcUrl, history.state),
    [srcUrl, history.state]
  );

  const onSave = async () => {
    // TODO: Save to DB
  };

  const onRevert = () =>
    history.reset(
      media.mediaType === "VIDEO" ? { type: "VIDEO" } : { type: "IMAGE" }
    );

  return (
    <section>
      <StudioHeader
        canUndo={history.canUndo}
        canRedo={history.canRedo}
        onUndo={history.undo}
        onRedo={history.redo}
        onRevert={onRevert}
        onSave={onSave}
        builtUrl={builtUrl}
        srcUrl={srcUrl}
        savePending={isPending}
      />

      <UrlBar url={builtUrl} />

      <section className="flex gap-6 max-md:flex-col mt-6 md:h-132 overflow-hidden">
        <PreviewCanvas
          key={builtUrl}
          builtUrl={builtUrl}
          zoom={zoom}
          onZoomChange={setZoom}
          mediaType={media.mediaType!}
        />

        
      </section>
    </section>
  );
}
