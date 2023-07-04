import React, { useEffect, useState } from 'react';
import PreferencesNavBar from './PreferencesNavBar/PreferencesNavBar';
import PlaygroundFooter from './PlaygroundFooter/PlaygroundFooter';
import Split from 'react-split';
import CodeMirror from '@uiw/react-codemirror';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import { javascript } from '@codemirror/lang-javascript';
import { Problem } from '@/src/utils/types/problem';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '@/src/firebase/firebase';
import { toast } from 'react-toastify';
import { problemsArray } from '@/src/utils/problems';
import { useRouter } from 'next/router';
import { arrayUnion, doc, updateDoc } from 'firebase/firestore';

type PlaygroundProps = {
  problem: Problem;
  setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
  setSolved: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface ISettings {
  fontSize: string;
  settingsModalOpen: boolean;
  dropdownOpen: boolean;
}

const Playground: React.FC<PlaygroundProps> = ({
  problem,
  setSuccess,
  setSolved,
}) => {
  const [activeTestCaseId, setActiveTestCaseId] = useState<number>(1);
  const [settings, setSettings] = useState({
    fontSize: '16px',
    settingsModalOpen: false,
    dropdownOpen: false,
  });
  const [user] = useAuthState(auth);

  let [userCode, setUserCode] = useState<string>(problem.starterCode);

  const {
    query: { pid },
  } = useRouter();

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please login to submit your code', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark',
      });
      return;
    }
    try {
      userCode = userCode.slice(userCode.indexOf(problem.starterFunctionName));
      const cb = new Function(`return ${userCode}`)();
      const handler = problemsArray[pid as string].handlerFunction;

      if (typeof handler === 'function') {
        const success = handler(cb);
        if (success) {
          toast.success('Congrats! All tests passed!', {
            position: 'top-center',
            autoClose: 3000,
            theme: 'dark',
          });
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 4000);

          const userRef = doc(firestore, 'users', user.uid);
          await updateDoc(userRef, {
            solvedProblems: arrayUnion(pid),
          });
          setSolved(true);
        }
      }
    } catch (error: any) {
      if (
        error.message.startsWith(
          'AssertionError [ERR_ASSERTION]: Expected values to be strictly deep-equal:'
        )
      ) {
        toast.error('One or more test cases failed!', {
          position: 'top-center',
          autoClose: 3000,
          theme: 'dark',
        });
      } else {
        toast.error(error.message, {
          position: 'top-center',
          autoClose: 3000,
          theme: 'dark',
        });
      }
    }
  };

  useEffect(() => {
    const code = localStorage.getItem(`code-${pid}`);
    if (user) {
      setUserCode(code ? JSON.parse(code) : problem.starterCode);
    } else {
      setUserCode(problem.starterCode);
    }
  }, [pid, user, problem.starterCode]);

  const onChange = (value: string) => {
    setUserCode(value);
    localStorage.setItem(`code-${pid}`, JSON.stringify(value));
  };

  return (
    <div className="flex flex-col bg-dark-layer-1 relative overflow-x-auto">
      <PreferencesNavBar settings={settings} setSettings={setSettings} />
      <Split
        className="h-[calc(100vh-106px)]"
        direction="vertical"
        sizes={[60, 40]}
        minSize={60}
      >
        <div className="w-full overflow-auto">
          <CodeMirror
            value={userCode}
            theme={vscodeDark}
            extensions={[javascript()]}
            style={{ fontSize: settings.fontSize }}
            onChange={onChange}
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
            {problem.examples.map((example, index) => (
              <div
                className="mr-2 items-start mt-2 text-white"
                key={example.id}
                onClick={() => setActiveTestCaseId(index)}
              >
                <div className="flex items-center">
                  <div className="flex flex-wrap items-center gap-y-4">
                    <div
                      className={`caseNumber ${
                        index === activeTestCaseId
                          ? 'bg-dark-fill-2 text-white'
                          : ''
                      }`}
                    >
                      Case {index + 1}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="font-semibold my-4">
            <p className="text-lg font-medium mt-4 text-white capitalize">
              input:
            </p>
            <div className="w-full text-md cursor-text rounded-lg border mt-2 px-3 py-[10px] bg-dark-fill-3 border-transparent text-white">
              {problem.examples[activeTestCaseId].inputText}
            </div>
            <p className="text-lg font-medium mt-4 text-white capitalize">
              output:
            </p>
            <div className="w-full text-md capitalize cursor-text rounded-lg border mt-2 px-3 py-[10px] bg-dark-fill-3 border-transparent text-white">
              {problem.examples[activeTestCaseId].outputText}
            </div>
          </div>
        </div>
      </Split>
      <PlaygroundFooter handleSubmit={handleSubmit} />
    </div>
  );
};

export default Playground;
