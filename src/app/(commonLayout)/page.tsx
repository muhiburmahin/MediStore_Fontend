import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";

export default async function Home() {
  const { data } = await userService.getSession();
  //console.log(data)
  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">
        User: {data ? data.user.name : "Session not found (null)"}
      </h1>
      <Button>Home Page</Button>
    </div>
  );
}
