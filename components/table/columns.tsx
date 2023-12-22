"use client";

import { FileType } from "@/typings";
import { ColumnDef } from "@tanstack/react-table";
import prettyBytes from "pretty-bytes";
import { FileIcon, defaultStyles } from "react-file-icon";
import { colorExtension } from "@/constant";

export const columns: ColumnDef<FileType>[] = [
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ renderValue, ...props }) => {
      const type = renderValue() as string;
      const extension: string = type.split("/")[1];
      return (
        <div className="w-10">
          <FileIcon
            size={60}
            extension={extension}
            labelColor={colorExtension[extension]}
            //@ts-ignore
            {...defaultStyles[extension]}
          />
        </div>
      );
    },
  },

  {
    accessorKey: "fileName",
    header: "Filename",
  },
  {
    accessorKey: "timestamp",
    header: "Date Added",
    cell: ({ renderValue, ...props }) => {
      return (
        <div className="flex flex-col">
          <span>{(renderValue() as Date).toLocaleDateString()}</span>
          <span className="text-xs text-slate-500">
            {(renderValue() as Date).toLocaleTimeString()}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "size",
    header: "Size",
    cell: ({ renderValue, ...props }) => {
      return <span>{prettyBytes(renderValue() as number)}</span>;
    },
  },
  {
    accessorKey: "downloadUrl",
    header: "Link",
    cell: ({ renderValue, ...props }) => {
      return (
        <a
          href={renderValue() as string}
          target="_blank"
          className="text-blue-700 dark:text-blue-400"
        >
          download
        </a>
      );
    },
  },
];
