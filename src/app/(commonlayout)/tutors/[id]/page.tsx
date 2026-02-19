import { getSpecificTutor } from "@/app/modules/tutor.service";
import TutorDetails from "@/components/TutorDetails";

const TutorDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data: tutorData } = await getSpecificTutor(id);
  console.log(tutorData);

  return (
    <div>
      <TutorDetails data={tutorData} />
    </div>
  );
};

export default TutorDetailsPage;
