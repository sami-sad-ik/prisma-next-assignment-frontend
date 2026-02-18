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

const SetAvailability = () => {
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
      setIsLoading(false);
      setStartTime("");
      setEndTime("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <header>
        <h1 className="text-2xl font-bold">Manage Availability</h1>
        <p className="text-gray-500">
          Set the time slots when students can book you.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT: Add New Slot Form */}
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

        {/* RIGHT: Current Schedule List */}
        <section className="md:col-span-2 space-y-4">
          <h2 className="font-semibold">Your Existing Schedule</h2>

          {/* Example of a slot item */}
          <div className="flex items-center justify-between p-4 bg-gray-50 border rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Monday, Oct 24</p>
              <p className="text-sm text-gray-500">09:00 AM — 11:30 AM (UTC)</p>
            </div>
            <button className="text-red-500 hover:text-red-700 text-sm font-medium">
              Remove
            </button>
          </div>

          {/* Empty State (Conditional) */}
          <div className="text-center py-10 border-2 border-dashed rounded-lg text-gray-400">
            No availability slots set for this week.
          </div>
        </section>
      </div>
    </div>
  );
};

export default SetAvailability;
