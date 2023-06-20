import React from 'react';
import TopBar from '@/src/components/TopBar/TopBar';
import WorkSpace from '@/src/components/WorkSpace/WorkSpace';

type ProblemPageProps = {};

const ProblemPage: React.FC<ProblemPageProps> = () => {
  return (
    <>
      <TopBar problemPage={true} />
      <WorkSpace />
    </>
  );
};

export default ProblemPage;
