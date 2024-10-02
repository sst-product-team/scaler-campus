import { useParams } from "react-router-dom";

export default function Vote() {
  let { pollId } = useParams();
  return (
    <div>
      <div className="Question">Voting on pollid = {pollId}</div>
    </div>
  );
}
