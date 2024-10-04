import { useEffect, useState } from "react";
import NoAccess from "../assets/NoAccess.png";
import { Link } from "react-router-dom";
import LinkStyle from "antd/es/typography/Link";

export default function AccessNotFound() {
  const [randomText, setRandomText] = useState();

  useEffect(() => {
    const randomTextArray = [
      "Wait, we just realized something...",
      "This might come as a surprise but...",
      // "",
      // "",
      // "",
    ];
    const randomIndex = Math.floor(Math.random() * randomTextArray.length);
    setRandomText(randomTextArray[randomIndex]);
  }, []);
  return (
    <div className="w-[100%]">
      <div className="h-screen w-[100%] text-center flex flex-col items-center justify-center text-2xl">
        <img src={NoAccess} alt="" height={400} width={400} />
        {randomText}
        <div className="text-sm">You do not have access to this resource</div>
        <div className="text-sm">
          You can login{" "}
          <Link to="/login">
            <LinkStyle>here</LinkStyle>
          </Link>
        </div>
      </div>
    </div>
  );
}
