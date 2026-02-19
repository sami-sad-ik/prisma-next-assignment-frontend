/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAvailability } from "@/app/modules/availability.server";
import { deleteAbility } from "@/app/modules/availability.service";
import { format } from "date-fns";
import { toast } from "sonner";
import { DeleteButton } from "./deleteAvailability";

const Availabilities = async () => {
  const { data: availabilities } = await getAvailability();

  //   const handleDelete = async (id: string) => {
  //     if (!confirm("Are you sure you want to remove this slot?")) return;

  //     setIsDeleting(true);
  //     const result = await deleteAbility(id);

  //     if (result.success) {
  //       toast.success("Deleted slot successfully");
  //     } else {
  //       toast.error(result.message || "Failed to delete");
  //       setIsDeleting(false);
  //     }
  //   };
  return (
    <section className="md:col-span-2 space-y-4">
      <h2 className="font-semibold">Your Existing Schedule</h2>

      {availabilities.length ? (
        availabilities?.map((avl: any) => (
          <div
            key={avl.id}
            className="flex items-center justify-between p-4 bg-gray-50 border rounded-lg">
            <div>
              <p className="font-medium text-gray-900">
                {format(new Date(avl.startTime), "EEEE MMMM d")}
              </p>
              <p className="text-sm text-gray-500">
                {format(new Date(avl.startTime), "hh:mm a")} —{" "}
                {format(new Date(avl.endTime), "hh:mm a")} (UTC)
              </p>
            </div>
            {/* delete button */}
            <DeleteButton id={avl.id} />
          </div>
        ))
      ) : (
        <div className="text-center py-10 border-2 border-dashed rounded-lg text-gray-400">
          No availability slots set for this week.
        </div>
      )}
    </section>
  );
};

export default Availabilities;
