import { useQuery } from 'react-query';
import axios from 'axios';

const fetchData = async (url) => {
    const response = await axios.get(url);
    return response.data;
};

export const useFetchData = (url) => useQuery([url], () => fetchData(url));