import "./app.pcss";
import * as pk from "../package.json";

export default function App() {
  return (
    <div className="w-screen h-screen justify-center items-center flex flex-col gap-2">
      <p>{pk.name}</p>
      <h1 className="text-6xl font-bold">NestFlux</h1>
      <p>Client scaffold</p>
    </div>
  );
}
