import React from 'react';

type DropDownProps = {
  editClickHandler?: (event: React.MouseEvent<HTMLElement>) => void;
  deleteClickHandler?: (event: React.MouseEvent<HTMLElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  position: string;
};

function DropDownBtn({ editClickHandler, deleteClickHandler, isOpen, setIsOpen, position }: DropDownProps) {
  return (
    <div className={`absolute flex flex-col ${position}`}>
      <div className="flex w-full justify-end mb-[8.5px]">
        <button className="bg-[url('/dropBtn.svg')] w-[4px] h-[16px] bg-no-repeat bg-center bg-contain indent-[-9999px]" onClick={() => setIsOpen(!isOpen)}>
          토글
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col px-2 py-3 border border-[#D8DCE2] bg-white shadow-[0_1px_5px_0_rgba(53,60,73,0.08)]">
          <button onClick={editClickHandler} className="w-16 h-[25px] text-lg leading-[140%] text-[#8E95A3] hover:bg-sub2">
            수정
          </button>
          <hr className="my-2" />
          <button onClick={deleteClickHandler} className="w-16 h-[25px] text-lg leading-[140%] text-[#8E95A3] hover:bg-sub2 hover:text-nagative">
            삭제
          </button>
        </div>
      )}
    </div>
  );
}

export default DropDownBtn;
