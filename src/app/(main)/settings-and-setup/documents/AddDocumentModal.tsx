"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/Dialog";
import { Button } from "@/components/Button";
import { RiCloseLine } from "@remixicon/react";

interface AddDocumentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddDocumentModal({ isOpen, onClose }: AddDocumentModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-full h-[100vh] p-0 gap-0">
        <div className="flex flex-col h-full">
          <DialogHeader className="px-6 py-4 border-b">
            <div className="flex items-center justify-between">
              <DialogTitle>Add documents</DialogTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="shrink-0"
              >
                <RiCloseLine className="size-5" />
              </Button>
            </div>
          </DialogHeader>
          
          <div className="flex-1 p-6 overflow-y-auto">
            {/* Content will be added here based on your requirements */}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 