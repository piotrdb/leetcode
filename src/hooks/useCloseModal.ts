import { useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/authModalAtom";
import { useEffect } from "react";

function useCloseModal() {
    const setAuthModal = useSetRecoilState(authModalState);
  
    const closeModal = () => {
      setAuthModal((prev) => ({ ...prev, isOpen: false, type: 'login' }));
    };
  
    useEffect(() => {
      const handleEsc = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeModal();
        }
      };
      window.addEventListener('keydown', handleEsc);
      return () => {
        window.removeEventListener('keydown', handleEsc);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
  
    return closeModal;
  }
  
export default useCloseModal