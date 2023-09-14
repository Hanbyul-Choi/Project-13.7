import React from 'react';

type ChallengeTabProps = {
  tabName: string;
  isActive: boolean;
  onClick: (tabName: string) => void;
  tabText: string;
};

const ChallengeTab: React.FC<ChallengeTabProps> = ({ tabName, isActive, onClick, tabText }) => {
  const handleClick = () => {
    onClick(tabName);
  };

  return (
    <div
      className={`text-lg font-semibold px-3 py-2 mb-6 mx-2 cursor-pointer ${isActive ? 'border-b-4 border-blue' : 'text-sub6'}`}
      onClick={handleClick}
    >
      {tabText}
    </div>
  );
};

export default ChallengeTab;
