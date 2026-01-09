import Logout from "@/features/auth/logout";
import { requireAuth } from "@/lib/auth-utils";
import { caller } from "@/trpc/server";

const page = async () => {

  await requireAuth();

  const data = await caller.getUsers()
  
  return <div>Protected Page
    {JSON.stringify(data)}
    <Logout/>
  </div>;
};

export default page;
