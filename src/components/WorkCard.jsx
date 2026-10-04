import PoseLoop from "./PoseLoop.jsx";
import VoiceLoop from "./VoiceLoop.jsx";

const LOOPS = { pose: PoseLoop, voice: VoiceLoop };

export default function WorkCard({ item }) {
  const Loop = LOOPS[item.loop];
  return (
    <article className="card work">
      <div className="im">{Loop && <Loop />}</div>
      <div className="bd">
        <h3>{item.title}</h3>
        <div className="org">
          <span className="lg"><img src={item.logo} alt="" /></span>
          {item.role} at {item.company}
        </div>
        <p>{item.description}</p>
        <div className="st">{item.stack}</div>
      </div>
    </article>
  );
}
