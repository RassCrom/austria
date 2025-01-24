import axios from "axios";

export const fetchAnimalData = async () => {
    try {
        const res = await axios('public/animals.json');
        // Validate the response structure before accessing
        if (res && res.data) {
            console.log(res.data)
            return res.data
        } else {
            console.error('Unexpected response format for animal data:', res);
            return [];
        }
    } catch (err) {
        console.error('Error during fetching animal data:', err)
        return []  // Return default value in case of failure
    }
};