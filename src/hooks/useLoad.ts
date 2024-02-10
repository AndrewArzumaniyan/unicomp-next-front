import axios from "axios";
import { useEffect, useState } from "react";

function useLoadBd(url: string) {
  const [data, setData] = useState<any>(null);
  const [dataLoading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await axios.get<any>(url);
        if (isMounted) {
          setData(response.data);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    return () => {
      isMounted = false;
    };
  }, [url]);

  return [data, dataLoading];
}

export default useLoadBd;
