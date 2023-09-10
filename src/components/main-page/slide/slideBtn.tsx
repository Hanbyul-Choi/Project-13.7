import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
interface Props {
  onClickFunc: (direction: string) => void;
  direction: "prev" | "next";
}

export default function SlideBtn({ onClickFunc, direction }: Props) {

  return (
    <button onClick={() => onClickFunc(direction)} className={`flex justify-center items-center w-[5.25rem] h-[5.25rem] border rounded-full border-black`}>
      {
        direction == "prev" ? <AiOutlineArrowLeft size={24} /> : <AiOutlineArrowRight size={24} />
      }
    </button>
  )
}