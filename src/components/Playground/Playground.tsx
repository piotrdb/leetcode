import React from 'react';
import PreferencesNavBar from './PreferencesNavBar/PreferencesNavBar';
import PlaygroundFooter from './PlaygroundFooter/PlaygroundFooter';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { Problem } from '@/src/utils/types/problem';

type PlaygroundProps = {
  problem: Problem;
};

const Playground: React.FC<PlaygroundProps> = ({ problem }) => {
  return (
    <div className="flex flex-col bg-dark-layer-1 relative overflow-x-auto">
      <PreferencesNavBar />
      <Split
        className="h-[calc(100vh-106px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={problem.starterCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
          />
        </div>
        <div className="w-full px-5 pb-14 overflow-auto">
          <div className="flex h-10 items-center space-x-6">
            <div className="relative flex h-full flex-col justify-center cursor-pointer">
              <div className="text-md font-medium leading-5 text-white capitalize">
                testcases
              </div>
              <hr className="absolute bottom-0 h-0.5 w-full rounded-full border-none bg-white" />
            </div>
          </div>
          <div className="flex">
            <div className="mr-2 items-start mt-2 text-white">
              <div className="flex items-center">
                <div className="flex flex-wrap items-center gap-y-4">
                  <div className="caseNumber">CASE 1</div>
                </div>
              </div>
            </div>
            <div className="mr-2 items-start mt-2 text-white">
              <div className="flex items-center">
                <div className="flex flex-wrap items-center gap-y-4">
                  <div className="caseNumber">CASE 2</div>
                </div>
              </div>
            </div>
            <div className="mr-2 items-start mt-2 text-white">
              <div className="flex items-center">
                <div className="flex flex-wrap items-center gap-y-4">
                  <div className="caseNumber">CASE 3</div>
                </div>
              </div>
            </div>
          </div>
          <div className="font-semibold my-4">
            <p className="text-md font-medium mt-4 text-white capitalize">
              input:
            </p>
            <div className="w-full capitalize cursor-text rounded-lg border mt-2 px-3 py-[10px] bg-dark-fill-3 border-transparent text-white">
              nums: [2,7,11,15], target: 9
            </div>
            <p className="text-md font-medium mt-4 text-white capitalize">
              output:
            </p>
            <div className="w-full capitalize cursor-text rounded-lg border mt-2 px-3 py-[10px] bg-dark-fill-3 border-transparent text-white">
              [0,1]
            </div>
          </div>
        </div>
      </Split>
      <PlaygroundFooter />
    </div>
  );
};

export default Playground;
