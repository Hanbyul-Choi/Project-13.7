import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
interface Props {
  onClick?: (event: React.MouseEvent) => void;
  direction: "prev" | "next";
}

export default function SlideBtn({ onClick, direction }: Props) {

  return (
    <button onClick={onClick} className={`flex justify-center items-center w-[5.25rem] max-lg:w-[3rem] h-[5.25rem] max-lg:h-[3rem] border rounded-full border-black`}>
      {
        direction == "prev" ? <AiOutlineArrowLeft size={24} /> : <AiOutlineArrowRight size={24} />
      }
    </button>
  )
}