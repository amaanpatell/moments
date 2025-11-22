"use client";

import { SelectMediaModel } from "@/db/schema";
import { useState, useTransition } from "react";

type StudioClientProps = {
  media: SelectMediaModel;
};

export default function StudioClient({ media }: StudioClientProps) {
  const [isPending, startTransition] = useTransition();
  const [zoom, setZoom] = useState(100);
  const [activeSection, setActiveSection] = useState("basics");

  return(
    <div>Hello</div>
  )
}
