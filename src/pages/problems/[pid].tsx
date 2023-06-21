import React from 'react';
import TopBar from '@/src/components/TopBar/TopBar';
import WorkSpace from '@/src/components/WorkSpace/WorkSpace';
import { problemsArray } from '../../utils/problems/index';
import { Problem } from '@/src/utils/types/problem';

type ProblemPageProps = {
  problem: Problem;
};

const ProblemPage: React.FC<ProblemPageProps> = ({ problem }) => {
  console.log(problem);
  return (
    <>
      <TopBar problemPage={true} />
      <WorkSpace problem={problem} />
    </>
  );
};

export default ProblemPage;

export async function getStaticPaths() {
  const paths = Object.keys(problemsArray).map((key) => ({
    params: { pid: key },
  }));

  return {
    paths: paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }: { params: { pid: string } }) {
  const { pid } = params;
  const problem = problemsArray[pid];

  if (!problem) {
    return {
      notFound: true,
    };
  }
  problem.handlerFunction = problem.handlerFunction.toString();
  return {
    props: {
      problem,
    },
  };
}
