import React from 'react';
import TopBar from '@/src/components/TopBar/Topbar';

type ProblemPageProps = {};

const ProblemPage: React.FC<ProblemPageProps> = () => {
  return (
    <>
      <TopBar problemPage={true} />
    </>
  );
};

export default ProblemPage;
