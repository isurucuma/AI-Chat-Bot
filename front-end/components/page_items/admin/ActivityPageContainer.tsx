import React, { useEffect, useState } from "react";

type Props = {};

function ActivityPageContainer({}: Props) {
  const [botManualControl, setBotManualControl] = useState(false);
  const handleBotControlToggle = () => {
    // send a response to update the bot control mode
    // get the result and set the bot control mode
    // don't update the control mode if the response is not successful
    setBotManualControl(!botManualControl); // TODO: remove this toggle manual control
  };

  useEffect(() => {
    // Load bot control mode before rendering
    // fetch("http://localhost:3002/getBotControlMode")
    //   .then((response) => response.json())
    //   .then((data) => {
    //     setBotManualControl(data.data);
    //   });
  }, []);

  return (
    <div className=" w-60 mx-auto">
      <h4 className="mt-10 text-lg font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
        Bot Control Mode
      </h4>
      <div className="rounded-xl bg-slate-200/25 h-36 flex flex-row justify-center items-center">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            value=""
            className="sr-only peer"
            onClick={handleBotControlToggle}
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-sky-700"></div>
          <span className="ml-3 text-sm font-medium text-gray-700">
            {botManualControl ? "Bot Manual Control" : "Bot Auto Control"}
          </span>
        </label>
      </div>
    </div>
  );
}

export default ActivityPageContainer;
