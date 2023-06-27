import React, { useState } from 'react';
import Split from 'react-split';
import ProblemDescription from './ProblemDescription/ProblemDescription';
import Playground from '../Playground/Playground';
import { Problem } from '@/src/utils/types/problem';
import Confetti from 'react-confetti';
import useWindowSize from '@/src/hooks/useWindowSize';

type WorkSpaceProps = {
  problem: Problem;
};

const WorkSpace: React.FC<WorkSpaceProps> = ({ problem }) => {
  const { width, height } = useWindowSize();
  const [success, setSuccess] = useState(false);
  const [solved, setSolved] = useState(false);

  return (
    <Split className="split" minSize={0}>
      <ProblemDescription problem={problem} _solved={solved} />
      <div className="bg-dark-fill-2">
        <Playground
          problem={problem}
          setSuccess={setSuccess}
          setSolved={setSolved}
        />
        {success && (
          <Confetti
            gravity={0.2}
            tweenDuration={4000}
            width={width - 1}
            height={height - 1}
          />
        )}
      </div>
    </Split>
  );
};

export default WorkSpace;
