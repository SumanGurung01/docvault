"use client";
import { useState } from "react";

import { db, storage } from "@/firebase";
import { useAppStore } from "@/store/store";
import { useUser } from "@clerk/nextjs";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import toast from "react-hot-toast";

function RenameModal() {
  const { user } = useUser();
  const [
    fileId,
    setFileId,
    fileName,
    setFileName,
    isRenameModalOpen,
    setIsRenameModalOpen,
  ] = useAppStore((state) => [
    state.fileId,
    state.setFileId,
    state.fileName,
    state.setFileName,
    state.isRenameModalOpen,
    state.setIsRenameModalOpen,
  ]);

  const [input, setInput] = useState("");

  function renameFile() {
    if (!user || !fileId) return;

    const file_name = fileName;
    const extension: string = file_name.split(".")[1];

    const toastId = toast.loading("Renaming ...");

    updateDoc(doc(db, "users", user.id, "files", fileId), {
      fileName: input + "." + extension,
    })
      .then(() => {
        setIsRenameModalOpen(false);
        toast.success("Renamed Successfully", {
          id: toastId,
        });
      })
      .catch((error) => {
        toast.error("Oops! an error occured", {
          id: toastId,
        });
      });
  }

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen) => {
        setIsRenameModalOpen(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename the file.</DialogTitle>
        </DialogHeader>

        <Input
          id="link"
          defaultValue={fileName.split(".")[0]}
          onChange={(e) => setInput(e.target.value)}
          onKeyDownCapture={(e) => {
            if (e.key === "Enter") {
              renameFile();
            }
          }}
        ></Input>
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={() => setIsRenameModalOpen(false)}
          >
            <span>Cancel</span>
          </Button>

          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"default"}
            onClick={() => renameFile()}
          >
            <span>Rename</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default RenameModal;
