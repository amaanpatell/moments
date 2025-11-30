// app/studio/[id]/page.tsx
import { getMedia } from "@/actions/media.action";
import NotFound from "@/app/not-found";
import StudioClient from "@/components/studio/studio-client";
import { redirect } from "next/navigation";

const Studio = async ({ params }: RouteParams) => {
  const { id } = await params;
  const media = await getMedia({ id });

  // ✅ Fixed: Check for error and !success
  if (!media.success) {
    // If it's an auth error, redirect to sign-in
    // Otherwise show not found
    return <NotFound />;
  }

  return (
    <div className="h-full flex flex-col justify-center">
      <StudioClient media={media.data} />
    </div>
  );
};

export default Studio;
