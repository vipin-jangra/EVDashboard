import { createContext, useContext, useState, useEffect } from 'react';
import Papa from 'papaparse';

// Create Context
const CSVDataContext = createContext();

// Custom hook for accessing CSV Data Context
export const useCSVData = () => useContext(CSVDataContext);

// CSV Data Provider Component
export const CSVDataProvider = ({ children, url }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                Papa.parse(url, {
                    download: true,
                    header: true,
                    complete: (results) => {
                        setData(results.data);
                        setLoading(false);
                    },
                    error: (error) => {
                        setError(`Failed to fetch data: ${error.message}`);
                        setLoading(false);
                    },
                });
            } catch (err) {
                setError(`Unexpected error: ${err.message}`);
                setLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return (
        <CSVDataContext.Provider value={{ data, loading, error }}>
            {children}
        </CSVDataContext.Provider>
    );
};
