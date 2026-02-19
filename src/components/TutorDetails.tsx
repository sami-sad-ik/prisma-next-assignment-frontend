/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Star,
  DollarSign,
  Calendar,
  MessageSquare,
  UserCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";

export default function TutorDetails({ data }: { data: any }) {
  const {
    user,
    bio,
    hourlyRate,
    isFeatured,
    reviews,
    avgRating,
    totalReviews,
    availability,
  } = data;

  return (
    <div className="container mx-auto py-10 px-4 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Main Info */}
        <div className="lg:col-span-2 space-y-8">
          {/* Profile Header Card */}
          <Card className="border-none shadow-none bg-transparent">
            <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
              <Avatar className="h-24 w-24 border-4 border-primary/10">
                <AvatarFallback className="text-3xl bg-primary text-primary-foreground">
                  {user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl font-bold">{user.name}</h1>
                  {isFeatured && (
                    <Badge className="bg-amber-500 hover:bg-amber-600">
                      Featured
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm font-medium">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg">{avgRating}</span>
                    <span className="text-muted-foreground font-normal">
                      ({totalReviews} reviews)
                    </span>
                  </div>
                  <Separator orientation="vertical" className="h-4" />
                  <div className="flex items-center gap-1 text-green-600">
                    <UserCheck className="w-4 h-4" />
                    <span>Verified Tutor</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* About/Bio Section */}
          <section className="space-y-4">
            <h3 className="text-2xl font-semibold">About Me</h3>
            <p className="text-muted-foreground leading-relaxed text-lg">
              {bio}
            </p>
          </section>

          <Separator />

          {/* Reviews Section */}
          <section className="space-y-6">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              <h3 className="text-2xl font-semibold">Student Reviews</h3>
            </div>

            <div className="grid gap-4">
              {reviews?.length > 0 ? (
                reviews?.map((review: any) => (
                  <Card key={review.id} className="bg-slate-50/50">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              {review.student.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-semibold text-sm">
                            {review.student.name}
                          </span>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                      </div>
                      <p className="italic text-muted-foreground">
                        {review.comment}
                      </p>
                      <p className="text-[10px] mt-2 text-slate-400">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </p>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground">No reviews yet.</p>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Sidebar / Booking Summary */}
        <div className="space-y-6">
          <Card className="sticky top-6 shadow-lg border-2 border-primary/5">
            <CardHeader>
              <CardTitle>Session Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex justify-between items-center bg-slate-100 p-4 rounded-lg">
                <span className="text-muted-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4" /> Hourly Rate
                </span>
                <span className="text-2xl font-bold">${hourlyRate}</span>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Availability
                </h4>
                {availability?.length > 0 ? (
                  <ul className="text-sm space-y-2">
                    {availability.map((slot: any) => (
                      <li
                        key={slot.id}
                        className="bg-slate-50 p-2 rounded border text-center flex flex-col gap-1">
                        <div className="font-medium">
                          {format(new Date(slot.startTime), "dd MMM yyyy")} — (
                          {format(new Date(slot.startTime), "HH:mm")} -{" "}
                          {format(new Date(slot.endTime), "HH:mm")})
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {slot.isBooked ? "Booked" : "Available"}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-muted-foreground bg-slate-50 p-3 rounded italic text-center">
                    Contact tutor for schedule
                  </p>
                )}
              </div>

              <button className="w-full bg-primary text-primary-foreground py-3 rounded-md font-bold hover:opacity-90 transition-opacity">
                Book a Session
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
