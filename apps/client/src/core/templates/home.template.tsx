import { useNavigate } from "@tanstack/react-router";
import { Button } from "antd";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-xl">Sample screens</h1>
      <Button onClick={() => navigate({ to: "/me/profile" })}>PROFILE</Button>
    </div>
  );
}
