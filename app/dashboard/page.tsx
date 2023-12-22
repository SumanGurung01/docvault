import Dropzone from "@/components/Dropzone";
import { auth } from "@clerk/nextjs";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase";
import { FileType } from "@/typings";
import TableWrapper from "@/components/table/TableWrapper";

async function Dashboard() {
  const { userId } = auth();

  const docsResults = await getDocs(collection(db, "users", userId!, "files"));

  const skeletonFiles: FileType[] = docsResults.docs.map((doc: any) => ({
    id: doc.id,
    fileName: doc.data().fileName || doc.id,
    fullName: doc.data().fullName,
    timestamp: new Date(doc.data().timestamp?.seconds * 1000) || undefined,
    downloadUrl: doc.data().downloadUrl,
    type: doc.data().type,
    size: doc.data().size,
  }));

  return (
    <div className="md:mx-10 lg:mx-10">
      <Dropzone />
      <TableWrapper skeletonFiles={skeletonFiles} />
    </div>
  );
}

export default Dashboard;
