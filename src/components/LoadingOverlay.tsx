import { useAppStore } from "@/feature/appStore";
import { cn } from "@/lib/utils";
import { LoaderCircle } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

interface LoadingOverlayProps {
  className?: string;
}

const LoadingOverlay = ({ className }: LoadingOverlayProps) => {
  const { loading, message } = useAppStore();
  if (!loading) {
    return null;
  }
  return (
    <div
      className={cn(
        "fixed inset-0 z-100 flex flex-col items-center justify-center",
        "bg-background/1 backdrop-blur-xs transition-all animate-in fade-in duration-300",
        className,
      )}
    >
      <div className="flex flex-col items-center gap-4 p-6 ">
        <div className="animate-spin text-primary ">
          <HugeiconsIcon
            icon={LoaderCircle}
            size={32}
            color="currentColor"
            strokeWidth={2}
          />
        </div>
        {message && (
          <p className="text-md font-extrabold text-muted-foreground animate-pulse">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingOverlay;
