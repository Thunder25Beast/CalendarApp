// src/components/modals/ConflictModal.js
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "../ui/dialog";
import { Button } from "../ui/button";
import { AlertTriangle, Clock } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "../../lib/api";
import { useToast } from "../../hooks/use-toast";
import { formatTime } from "../../lib/calendar-utils";

export default function ConflictModal({ isOpen, onClose, conflicts, eventData, onModifyTime }) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const createAnywayMutation = useMutation({
    mutationFn: async () => {
      const { id, ...data } = eventData; // Remove id if exists
      return apiRequest(id ? "PATCH" : "POST", id ? `/api/events/${id}` : "/api/events", data);
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Event scheduled despite conflicts" });
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      onClose();
    },
    onError: (error) => {
      toast({ title: "Error", description: `Failed to schedule event: ${error.message}`, variant: "destructive" });
    },
  });
  
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 mb-4">
            <AlertTriangle className="h-6 w-6 text-orange-600" />
          </div>
          <DialogTitle className="text-center">Scheduling Conflict Detected</DialogTitle>
        </DialogHeader>
        <p className="text-center text-sm text-slate-500 mt-2 mb-4">
          The following {conflicts.length !== 1 ? "events" : "event"} conflict with your scheduled time:
        </p>
        <div className="mt-4 space-y-3 max-h-60 overflow-y-auto">
          {conflicts.map((conflict) => (
            <div key={conflict.id} className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <span className="h-2 w-2 rounded-full bg-blue-500"></span>
                <span className="text-xs font-medium text-slate-500">{conflict.category}</span>
              </div>
              <h4 className="text-sm font-medium text-slate-900 mb-1">{conflict.title}</h4>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Clock className="h-3 w-3" />
                <span>{conflict.date} · {formatTime(conflict.startTime)} - {formatTime(conflict.endTime)}</span>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter className="mt-6 flex flex-col sm:flex-row justify-end gap-3">
          <Button variant="outline" onClick={onModifyTime}>Modify Time</Button>
          <Button onClick={() => createAnywayMutation.mutate()} disabled={createAnywayMutation.isPending}>
            {createAnywayMutation.isPending ? "Scheduling..." : "Schedule Anyway"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
