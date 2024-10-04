import { useEffect, useState } from "react";
import ScalerCampusBanner from "../../components/ScalerCampusBanner";
import AccessNotFound from "../../components/AccessNotFound";
import useScope from "../../hooks/useScope";
import { useLocation } from "react-router-dom";

export default function AppCode() {
  const randomTasks = [
    "Dance like rinkya ke papa. Choti vala dance.",
    "30 push ups in one minute.",
    "Ramp walk. Ladke cat walk kare ge aur ladkiya kuch muscles vala.",
    "Talk to the chair like it's your crush.",
    "Pole dance for boys.",
    "Speak anything for one minute in happy Birthday tune.",
    "Bal aage kar ke darao.",
    "Insta ki dp ek embarrassing story.",
    "Say alphabets in reverse order as fast as you can.",
    "How you met your mother, ted ka rain dance.",
    "Loongi for girls, saree for boys.",
    "Two people come from the class and fight with each other vocally in animal voices.",
    "Childhood poem or bollywood dialog with open mouth.",
    "Behave like a monkey and pretend to pick lice from your friends hair.",
    "Put photo of you are nostril on Instagram.",
    "Dance to no music.",
    "Give your phone to a random person and they will post a story from your account.",
    "Act like a dog and fetch two things.",
    "Text something with your nose.",
    "Go to the washroom and wear your shirt backwards for the rest of the game.",
    "Cry like a baby for one full minute.",
    "Talk in British accent.",
    "Tell us your crush's name.",
    "Plank for 90 seconds.",
    "Spin for 15 times and walk straight.",
    "Roast a person of your choice.",
    "Lick your elbow.",
    "Vibe on a dhinchak Pooja song.",
    "Sing happy birthday to Priyanshi mam.",
    "Ask Kshitij sir to make a dance video.",
  ];

  const [randomTask, setRandomTask] = useState();
  const location = useLocation();
  const [, inScope] = useScope(location.pathname);

  useEffect(() => {
    getRandomText();
  }, []);
  const getRandomText = () => {
    setRandomTask(randomTasks[Math.floor(Math.random() * randomTasks.length)]);
  };

  if (inScope) {
    return (
      <div>
        <ScalerCampusBanner />
        <div className="w-screen h-[80vh] md:h-[92vh] flex flex-col gap-4 items-center justify-center align-middle md:text-xl font-semibold">
          <div className="text-center w-[80%]">{randomTask}</div>
          <button
            onClick={() => getRandomText()}
            className="w-[50%] md:w-[15%] font-normal border-solid border-2 p-2 border-slate-500 text-slate-500 rounded-[10px]"
          >
            Next task
          </button>
          {/* <button
            onClick={() => getRandomText()}
            className="w-[50%] md:w-[15%] font-normal border-solid border-2 p-2 border-slate-500 text-slate-500 rounded-[10px]"
          >
            Start Task
          </button> */}
        </div>
      </div>
    );
  } else {
    return <AccessNotFound />;
  }
}
