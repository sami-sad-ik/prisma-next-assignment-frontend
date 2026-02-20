"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type CompleteSessionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  loading?: boolean;
};

export default function CompleteSessionModal({
  open,
  onOpenChange,
  onConfirm,
  loading = false,
}: CompleteSessionModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Mark session as completed?</DialogTitle>
          <DialogDescription>
            Are you sure to complete this session? This will mark the session as
            completed
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}>
            Cancel
          </Button>

          <Button onClick={onConfirm} disabled={loading}>
            {loading ? "Processing..." : "Mark Completed"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
