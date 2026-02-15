import { tutorService } from "@/app/modules/tutor.service";
import TutorDetails from "@/components/TutorDetails";

const TutorDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: tutorData } = await tutorService.getSpecificTutor(id);

  return (
    <div>
      <TutorDetails data={tutorData} />
    </div>
  );
};

export default TutorDetailsPage;
