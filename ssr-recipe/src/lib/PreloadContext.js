import { createContext, useContext } from 'react';

const PreloadContext = createContext(null);
export default PreloadContext;

export const Preloader = ({resolve}) => {
  const preloadContext = useContext(PreloadContext)
  if(!preloadContext) return null;
  if(preloadContext.done) return null;

  preloadContext.promises.push(Promise.resolve(resolve()))

  return null;
};

export const usePreloader = resolve => {
  const preloadContext = useContext(PreloadContext);
  if (!preloadContext) return null;
  if (preloadContext.done) return null;

  // promises 배열에 프로미스 등록
  // 설령 resolve 함수가 프로미스를 반환하지 않더라도, 프로미스 취급을 하기 위하여
  // Promise.resolve 함수 사용
  preloadContext.promises.push(Promise.resolve(resolve()));
};

