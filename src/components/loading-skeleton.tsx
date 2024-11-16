import { Skeleton } from "@/components/ui/skeleton";

const LoadingSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Favorates skeleton */}
      <div className="grid gap-6">
        <Skeleton className="h-[18.75rem] w-full rounded-lg" />
        <Skeleton className="h-[18.75rem] w-full rounded-lg" />
        <div className="grid gap-6 md:grid-cols-2">
          <Skeleton className="h-[18.75rem] w-full rounded-lg" />
          <Skeleton className="h-[18.75rem] w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
