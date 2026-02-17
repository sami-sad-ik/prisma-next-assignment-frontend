import { TutorCard } from "@/components/TutorCard";
import { getFeaturedTutors } from "../modules/tutor.service";

export interface Tutor {
  id: string;
  name: string;
  bio: string;
  hourlyRate: number;
  avgRating: number;
  totalReviews: number;
}

export default async function Home() {
  const featuredTutors = await getFeaturedTutors();

  return (
    <div className="  font-sans dark:bg-black">
      <div className="my-5">
        {featuredTutors.data.map((tutor: Tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} showFeaturedBadge={true} />
        ))}
      </div>
    </div>
  );
}
