import { tutorService } from "@/app/modules/tutor.service";
import { TutorCard } from "@/components/TutorCard";

export interface Tutor {
  id: string;
  name: string;
  bio: string;
  hourlyRate: number;
  avgRating: number;
  totalReviews: number;
}

const tutorPage = async () => {
  const tutors = await tutorService.getAllTutors();
  return (
    <div>
      <div className="my-5">
        {tutors.data.map((tutor: Tutor) => (
          <TutorCard key={tutor.id} tutor={tutor} showFeaturedBadge={false} />
        ))}
      </div>
    </div>
  );
};

export default tutorPage;
