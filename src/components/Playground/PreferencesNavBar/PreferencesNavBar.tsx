import { useState, useEffect } from 'react';
import {
  AiOutlineFullscreen,
  AiOutlineFullscreenExit,
  AiOutlineSetting,
} from 'react-icons/ai';

import { ISettings } from '../Playground';
import SettingsModal from '../../Modals/SettingsModal';

type PreferencesNavBarProps = {
  settings: ISettings;
  setSettings: React.Dispatch<React.SetStateAction<ISettings>>;
};

const PreferencesNavBar: React.FC<PreferencesNavBarProps> = ({
  setSettings,
  settings,
}) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleFullScreen = () => {
    if (isFullScreen) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
    setIsFullScreen(!isFullScreen);
  };

  useEffect(() => {
    function exitHandler(e: any) {
      if (!document.fullscreenElement) {
        setIsFullScreen(false);
        return;
      }
      setIsFullScreen(true);
    }

    if (document.addEventListener) {
      document.addEventListener('fullscreenchange', exitHandler);
      document.addEventListener('webkitfullscreenchange', exitHandler);
      document.addEventListener('mozfullscreenchange', exitHandler);
      document.addEventListener('MSFullscreenChange', exitHandler);
    }
  }, [isFullScreen]);

  return (
    <div className="flex items-center justify-between bg-dark-layer-2 h-14 w-full ">
      <div className="flex items-center text-white">
        <button className="flex cursor-pointer items-center rounded focus:outline-none bg-dark-fill-3 text-dark-label-2 hover:bg-dark-fill-2  px-2 py-1.5 font-medium">
          <div className="flex items-center px-1">
            <div className="text-md text-label-2 dark:text-dark-label-2">
              JavaScript
            </div>
          </div>
        </button>
      </div>

      <div className="flex items-center m-2">
        <button
          className="preferenceBtn group"
          onClick={() => setSettings({ ...settings, settingsModalOpen: true })}
        >
          <div className="h-7 w-7 text-dark-gray-6 font-bold text-[1.75rem]">
            <AiOutlineSetting />
          </div>
          <div className="preferenceBtn-tooltip">Settings</div>
        </button>

        <button className="preferenceBtn group" onClick={handleFullScreen}>
          <div className="h-7 w-7 text-dark-gray-6 font-bold text-[1.75rem]">
            {isFullScreen ? (
              <AiOutlineFullscreenExit />
            ) : (
              <AiOutlineFullscreen />
            )}
          </div>
          <div className="preferenceBtn-tooltip" onClick={handleFullScreen}>
            Full Screen
          </div>
        </button>
      </div>
      {settings.settingsModalOpen && (
        <SettingsModal settings={settings} setSettings={setSettings} />
      )}
    </div>
  );
};

export default PreferencesNavBar;
