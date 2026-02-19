"use client";
import { CalendarIcon, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { format, set } from "date-fns";
import { useState } from "react";
import { setAvailability } from "@/app/modules/availability.service";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const SetAvailabilityForm = () => {
  const router = useRouter();
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSetAvailability = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !startTime || !endTime) return;

    try {
      setIsLoading(true);
      const [startHour, startMinute] = startTime.split(":").map(Number);
      const [endHour, endMinute] = endTime.split(":").map(Number);

      const finalStart = set(date, {
        hours: startHour,
        minutes: startMinute,
        seconds: 0,
        milliseconds: 0,
      });
      const finalEnd = set(date, {
        hours: endHour,
        minutes: endMinute,
        seconds: 0,
        milliseconds: 0,
      });

      await setAvailability(finalStart, finalEnd);

      toast.success("Availability set successfully");
      router.refresh();
      setIsLoading(false);
      setDate(undefined);
      setStartTime("");
      setEndTime("");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Manage Availability</h1>
        <p className="text-gray-500">
          Set the time slots when students can book you.
        </p>
      </header>
      <form onSubmit={handleSetAvailability} className="space-y-4">
        <Card className="shadow-sm border-muted">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl">Add New Slot</CardTitle>
            <CardDescription>
              Pick a date and set your start/end hours.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Date Selection Section */}
            <div className="space-y-2">
              <Label htmlFor="date">Select Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal border-input hover:bg-accent">
                    <CalendarIcon className="mr-2 h-4 w-4 opacity-70" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Time Selection Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="start-time">Start Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="start-time"
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="pl-9 appearance-none"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="end-time">End Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="end-time"
                    type="time"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="pl-9 appearance-none"
                  />
                </div>
              </div>
            </div>

            {/* Action Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full font-semibold">
              <Plus className="mr-2 h-4 w-4" />
              {isLoading ? "Saving..." : "Save Availability "}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default SetAvailabilityForm;
