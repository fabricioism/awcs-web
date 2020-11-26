import { useEffect, useState } from "react";

/**
 * Custom Fetch Hook
 * @param {string} url
 * @param {json} options
 * @param {boolean} dependenciesFlag
 * @param {Array} dependencies
 * @param {boolean} blocked
 */

export const useFetch = (
  url,
  options = {},
  dependenciesFlag = false,
  dependencies,
  blocked
) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    () => {
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const res = await fetch(url, options);
          const json = await res.json();
          setResponse(json);
          setIsLoading(false);
        } catch (error) {
          setError(error);
        }
      };
      if (!blocked) fetchData();
    },
    dependenciesFlag ? dependencies : []
  );
  return { response, error, isLoading };
};
