import Availabilities from "@/components/Availabilities";
import SetAvailabilityForm from "@/components/SetAvailabilityForm";

const SetAvailability = () => {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT: Add New Slot Form */}
        <SetAvailabilityForm />
        {/* RIGHT: Current Schedule List */}
        <Availabilities />
      </div>
    </div>
  );
};

export default SetAvailability;
