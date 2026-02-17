"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { updateTutorProfile } from "@/app/modules/tutor.action";

interface Category {
  id: string;
  name: string;
}

interface TutorData {
  bio: string;
  hourlyRate: number;
  categories: Category[];
}

interface UpdateTutorModalProps {
  initialData: TutorData;
  categories: Category[];
}

export const UpdateTutorModal = ({
  initialData,
  categories,
}: UpdateTutorModalProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialData?.categories?.map((c: any) => c.id) || [],
  );

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId],
    );
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedCategories.length === 0) {
      return toast.error("Please select at least one specialty");
    }

    const formData = new FormData(e.currentTarget);
    const updateData = {
      bio: formData.get("bio") as string,
      hourlyRate: formData.get("rate") as string,
      categoryIds: selectedCategories,
    };

    try {
      setLoading(true);

      await updateTutorProfile(updateData);

      toast.success("Profile updated successfully");
      setOpen(false);
      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Edit Profile</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Categories */}
          <div className="space-y-3">
            <Label>Your Specialties</Label>
            <div className="grid grid-cols-2 gap-3 p-3 border rounded-md max-h-40 overflow-y-auto">
              {categories.map((cat) => (
                <div key={cat.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`edit-${cat.id}`}
                    checked={selectedCategories.includes(cat.id)}
                    onCheckedChange={() => handleCategoryChange(cat.id)}
                  />
                  <label
                    htmlFor={`edit-${cat.id}`}
                    className="text-sm font-medium leading-none cursor-pointer">
                    {cat.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <Label htmlFor="bio">About Me</Label>
            <Textarea
              id="bio"
              name="bio"
              defaultValue={initialData?.bio}
              placeholder="Tell students about yourself..."
              required
              className="min-h-37.5"
            />
          </div>

          {/* Hourly Rate */}
          <div className="space-y-2">
            <Label htmlFor="rate">Hourly Rate ($)</Label>
            <Input
              id="rate"
              name="rate"
              type="number"
              defaultValue={initialData?.hourlyRate}
              required
              min="1"
            />
          </div>

          <DialogFooter>
            <Button
              variant="ghost"
              type="button"
              onClick={() => setOpen(false)}
              disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
