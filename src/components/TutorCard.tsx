import { Tutor } from "@/app/(commonlayout)/page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";

export function TutorCard({
  tutor,
  showFeaturedBadge,
}: {
  tutor: Tutor;
  showFeaturedBadge: boolean;
}) {
  const { id, name, avgRating, totalReviews } = tutor;
  return (
    <Card className="w-full max-w-sm ">
      <CardHeader>
        <CardAction>
          {showFeaturedBadge && <Badge variant="secondary">Featured</Badge>}
        </CardAction>
        <CardTitle className="mt-4 text-xl">{name}</CardTitle>
        <div className="flex items-center gap-1 mt-1">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm font-medium">{avgRating.toFixed(1)}</span>
          <span className="text-sm text-muted-foreground">
            ({totalReviews} reviews)
          </span>
        </div>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/tutors/${id}`}>View Tutor details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
