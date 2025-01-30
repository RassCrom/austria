import { useQuery } from 'react-query';
import axios from 'axios';

const fetchAnimals = async () => {
    const response = await axios.get('public/jsons/animals.json');
    return response.data;
};

export const useFetchAnimals = () => {

    const { data, error, isLoading } = useQuery('animals', fetchAnimals);

    return { data, error, isLoading };
};