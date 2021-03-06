import { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps) {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const process = async () => {
      setLoading(true);

      try {
        const resolved = await promiseCreator();
        console.log(resolved)
        setResolved(resolved);
      } catch (error) {
        setError(error)
      }

      setLoading(false);
    }
    process();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return [loading, resolved, error]
}