"use client";

import React, { useEffect, useState } from "react";
import { FileType } from "@/typings";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { columns } from "./columns";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";
import { Skeleton } from "@/components/ui/skeleton";

function TableWrapper({ skeletonFiles }: { skeletonFiles: FileType[] }) {
  const { user } = useUser();

  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
  );

  useEffect(() => {
    if (!docs) return;

    const files: FileType[] = docs.docs.map((doc: any) => ({
      id: doc.id,
      fileName: doc.data().fileName || doc.id,
      fullName: doc.data().fullName,
      timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
      downloadUrl: doc.data().downloadUrl,
      type: doc.data().type,
      size: doc.data().size,
    }));

    setInitialFiles(files);
  }, [docs]);

  if (docs?.docs.length === undefined) {
    return (
      <div className="flex flex-col mx-4">
        <Button className="ml-auto w-36 h-10 mb-5" variant={"outline"}>
          <Skeleton className="h-5 w-full" />
        </Button>

        <div className="rounded-lg">
          <div className="border-b h-12" />
          {skeletonFiles.map((file) => (
            <div
              key={file.id}
              className=" flex item-center space-x-4 p-5 w-full"
            >
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          ))}

          {skeletonFiles.length === 0 && (
            <div className=" flex item-center space-x-4 p-5 w-full">
              <Skeleton className="h-12 w-12" />
              <Skeleton className="h-12 w-full" />
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col space-y-5 mx-4">
      <div className="flex justify-center items-center">
        <p className="font-bold">All Files</p>
        <Button
          variant={"outline"}
          className="ml-auto"
          onClick={() => setSort(sort == "desc" ? "asc" : "desc")}
        >
          Sort by : {sort === "desc" ? "Oldest" : "Newest"}
        </Button>
      </div>
      <DataTable columns={columns} data={initialFiles} />
    </div>
  );
}

export default TableWrapper;
