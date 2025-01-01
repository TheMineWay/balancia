import { metadata } from "@core/constants/metadata.constant.ts";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome to {metadata.projectName}!</h3>
    </div>
  );
}
