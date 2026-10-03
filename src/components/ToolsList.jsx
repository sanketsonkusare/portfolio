import { tools } from "../data/tools.js";

export default function ToolsList() {
  return (
    <div className="rows cols">
      {tools.map((g) => (
        <div className="row" key={g.group}>
          <div className="k">{g.group}</div>
          <div className="v">{g.items.join(", ")}</div>
        </div>
      ))}
    </div>
  );
}
