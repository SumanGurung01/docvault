"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import toast from "react-hot-toast";

export function DeleteModal() {
  const { user } = useUser();
  const [fileId, isDeleteModalOpen, setIsDeleteModalOpen] = useAppStore(
    (state) => [
      state.fileId,
      state.isDeleteModalOpen,
      state.setIsDeleteModalOpen,
    ]
  );

  function deleteFile() {
    if (!user || !fileId) return;

    const toastId = toast.loading("Deleting ...");

    const fileRef = ref(storage, `users/${user.id}/files/${fileId}`);

    deleteObject(fileRef)
      .then(() => {
        deleteDoc(doc(db, "users", user.id, "/files", fileId))
          .then(() => {
            setIsDeleteModalOpen(false);
            toast.success("Deleted Successfully", {
              id: toastId,
            });
          })
          .catch((error) => {
            toast.error("Oops! An error occured", {
              id: toastId,
            });
          });
      })
      .catch((error) => {
        toast.error("Oops! An error occured ", {
          id: toastId,
        });
      });
  }

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen) => {
        setIsDeleteModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete ?</DialogTitle>
          <DialogDescription>This action cannot be undone</DialogDescription>
        </DialogHeader>

        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"default"}
            onClick={() => deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
