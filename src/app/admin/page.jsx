import Link from "next/link";
import { auth } from "../auth";
import { redirect } from "next/navigation";
import AdminNavbar from "../components/AdminNavbar";
import AddProduct from "../components/AddProduct";

const AdminPage = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      {/* {session ? (
        <>
          <h1>Admin Page</h1>
          <Link href="/api/auth/signout">Sign out</Link>
        </>
      ) : (
        <>
          <h2>Not Authorized</h2>
          <Link href="/login">Log in</Link>
        </>
      )} */}

      <AdminNavbar />
      <AddProduct />
    </div>
  );
};

export default AdminPage;
