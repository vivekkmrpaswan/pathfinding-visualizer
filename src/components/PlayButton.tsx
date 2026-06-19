import { MouseEventHandler } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { GrPowerReset } from "react-icons/gr";

export function PlayButton({
  isDisabled,
  isGraphVisualized,
  handlerRunVisualizer,
}: Readonly<{
  isDisabled: boolean;
  isGraphVisualized: boolean;
  handlerRunVisualizer: MouseEventHandler<HTMLButtonElement>;
}>): JSX.Element {
  return (
    <button
      disabled={isDisabled}
      onClick={handlerRunVisualizer}
      className="w-full flex items-center justify-center gap-2 rounded-lg disabled:pointer-events-none disabled:opacity-50 transition ease-in p-2.5 shadow-md bg-green-500 hover:bg-green-600 border-none active:ring-green-300 focus:outline-none focus:ring focus:ring-green-300 focus:ring-opacity-30 font-medium"
    >
      {isGraphVisualized ? (
        <>
          Reset
          <GrPowerReset className="w-5 h-5" />
        </>
      ) : (
        <>
          Start
          <BsFillPlayFill className="w-5 h-5" />
        </>
      )}
    </button>
  );
}
