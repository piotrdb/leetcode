import React from 'react';
import TopBar from '@/src/components/TopBar/Topbar';
import Workspace from '@/src/components/Workspace/Workspace';

type ProblemPageProps = {};

const ProblemPage: React.FC<ProblemPageProps> = () => {
  return (
    <>
      <TopBar problemPage={true} />
      <Workspace />
    </>
  );
};

export default ProblemPage;
