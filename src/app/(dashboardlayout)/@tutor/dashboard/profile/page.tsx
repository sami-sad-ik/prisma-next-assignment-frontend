// app/dashboard/profile/page.tsx
import { getCategories } from "@/app/modules/category.service";
import { getMyTutorProfile } from "@/app/modules/tutor.service";
import { UpdateTutorModal } from "@/components/UpdateTutorModal";

export default async function TutorProfilePage() {
  const { data: profile } = await getMyTutorProfile();
  const { data: allCategories } = await getCategories();

  // 1. Add a basic guard clause
  if (!profile) return <div>No profile found.</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            My Tutor Profile
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your teaching details, pricing, and expertise.
          </p>
        </div>
        {/* Ensure the button is visible and accessible */}
        <div className="shrink-0">
          <UpdateTutorModal initialData={profile} categories={allCategories} />
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Sidebar / Quick Stats */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Hourly Rate
            </p>
            <p className="text-3xl font-bold text-primary">
              ${profile.hourlyRate}
              <span className="text-sm text-muted-foreground">/hr</span>
            </p>
          </div>

          <div className="bg-card p-6 rounded-xl border shadow-sm">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">
              Specialties
            </h3>
            <div className="flex flex-wrap gap-2">
              {profile.categories.map((cat: { id: string; name: string }) => (
                <span
                  key={cat.id}
                  className="bg-secondary text-secondary-foreground px-2.5 py-0.5 rounded-full text-xs font-semibold">
                  {cat.name}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          <div className="bg-card p-6 rounded-xl border shadow-sm h-full">
            <h2 className="text-xl font-semibold mb-4">About Me</h2>
            <p className="text-card-foreground leading-relaxed whitespace-pre-line">
              {profile.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
