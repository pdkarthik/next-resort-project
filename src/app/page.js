import { redirect } from "next/navigation";
import { auth } from "./auth";
import UserNavigation from "./components/UserNavigation";
import AdminPage from "./admin/page";
import ProductCollection from "./components/ProductCollection";

const HomePage = async () => {
  const session = await auth();
  console.log("session:", session);

  if (!session) {
    redirect("/login");
  }

  const userName = session.username;
  console.log("userName:", userName, "\n", "role:", session.role);

  return (
    <div>
      {session.role === "user" ? (
        <>
          <UserNavigation userName={userName} />
          <h1>Welcome to Holiday Resort</h1>
          <ProductCollection />
        </>
      ) : (
        <AdminPage />
      )}
    </div>
  );
};

export default HomePage;
