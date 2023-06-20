import React from 'react';
import PreferencesNavBar from './PreferencesNavBar/PreferencesNavBar';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';

type PlaygroundProps = {};

const Playground: React.FC<PlaygroundProps> = () => {
  return (
    <div className="flex flex-col bg-dark-layer-1 relative">
      <PreferencesNavBar />
      <Split
        className="h-[calc(100vh-106px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value="const a = 1"
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: 16 }}
          />
        </div>
        <div className="w-full px-5 overflow auto">
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
        </div>
      </Split>
    </div>
  );
};

export default Playground;
