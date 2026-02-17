"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Checkbox } from "./ui/checkbox";
import { becomeTutor } from "@/app/modules/tutor.action";

export const BecomeTutorModal = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const getCats = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category`,
      );
      const json = await res.json();

      if (json?.data) {
        setCategories(json.data);
      }
    };
    getCats();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!selectedCategories) return toast.error("Please select a category");

    const formData = new FormData(e.currentTarget);
    const tutorData = {
      bio: formData.get("bio") as string,
      hourlyRate: formData.get("rate") as string,
      categoryIds: selectedCategories,
    };

    try {
      setLoading(true);

      await becomeTutor(tutorData);

      toast.success("You are a tutor now");

      router.refresh();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Become a Tutor</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Tutor Application</DialogTitle>
          <DialogDescription>
            Fill out your details to start teaching. You can change these later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            {/* Category Select */}
            <div className="space-y-2">
              <Label>Teaching Categories (Select all that apply)</Label>
              <div className="grid grid-cols-2 gap-2 border rounded-md p-3 max-h-40 overflow-y-auto">
                {categories?.map((cat) => (
                  <div key={cat.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={cat.id}
                      checked={selectedCategories.includes(cat.id)}
                      onCheckedChange={(checked) => {
                        setSelectedCategories(
                          checked
                            ? [...selectedCategories, cat.id]
                            : selectedCategories.filter((id) => id !== cat.id),
                        );
                      }}
                    />
                    <label
                      htmlFor={cat.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      {cat.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <Label htmlFor="bio">About You</Label>
            <Textarea
              id="bio"
              name="bio"
              placeholder="Describe your expertise..."
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Hourly Rate ($)</Label>
            <Input
              id="rate"
              name="rate"
              type="number"
              placeholder="30"
              required
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Processing..." : "Submit Application"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
