"use client";

import DropzoneComponent from "react-dropzone";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "@/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import toast from "react-hot-toast";

function Dropzone() {
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const maxSize = 20971520;

  const onDrop = (acceptedFiles: File[]) => {
    const toastId = toast.loading("Uploading ...");

    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onabort = () =>
        toast.error("Oops! An error occured", {
          id: toastId,
        });
      reader.onerror = () =>
        toast.error("Oops! An error occured", {
          id: toastId,
        });
      reader.onload = async () => {
        await uploadPost(file);
      };
      reader.readAsArrayBuffer(file);
      toast.success("Uploaded Successfully", {
        id: toastId,
      });
    });
  };

  const uploadPost = async (selectedFile: File) => {
    if (loading) return;
    if (!user) return;

    setLoading(true);

    // to add in database you need to use collection()
    // then pass : -> db -> path:users/userid/files -> data
    const docRef = await addDoc(collection(db, "users", user.id, "files"), {
      userId: user.id,
      fileName: selectedFile.name,
      fullName: user.fullName,
      profileImage: user.imageUrl,
      timestamp: serverTimestamp(),
      type: selectedFile.type,
      size: selectedFile.size,
    });

    //storage path
    const fileRef = ref(storage, `users/${user.id}/files/${docRef.id}`);

    // function to upload files
    uploadBytes(fileRef, selectedFile).then(async () => {
      const downloadUrl = await getDownloadURL(fileRef);

      await updateDoc(doc(db, "users", user.id, "files", docRef.id), {
        downloadUrl: downloadUrl,
      });
    });

    setLoading(false);
  };

  return (
    <DropzoneComponent minSize={0} maxSize={maxSize} onDrop={onDrop}>
      {({
        getRootProps,
        getInputProps,
        isDragActive,
        isDragReject,
        fileRejections,
      }) => {
        const isFileTooLarge =
          fileRejections.length > 0 && fileRejections[0].file.size > maxSize;
        return (
          <section className="m-4">
            <div
              {...getRootProps()}
              className={cn(
                "bg-zinc-100 h-32 flex justify-center items-center rounded-lg text-zinc-800 dark:bg-slate-900 dark:text-zinc-400",
                isDragActive ? "bg-zinc-200 dark:bg-slate-800" : ""
              )}
            >
              <input {...getInputProps()} />
              {!isDragActive && "Click here or drop a file to upload"}
              {isDragActive && !isDragReject && "Drop to upload this file"}
              {isDragReject && "Sorry! file type is not accepted"}
              {isFileTooLarge && (
                <div className="text-danger mt-2">file too large</div>
              )}
            </div>
          </section>
        );
      }}
    </DropzoneComponent>
  );
}

export default Dropzone;
