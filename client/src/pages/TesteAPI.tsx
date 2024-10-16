import React, { useEffect, useState} from 'react';

interface BackendData {
    users: string[]
}

const TesteAPI: React.FC = () => {

    const [backendData, setBackendData] = useState<BackendData[]>([{} as BackendData])
    const [recebeMap, setRecebeMap] = useState <JSX.Element[]> ([])

    useEffect(() => {
        fetch("http://localhost:5000/api")
            .then(response => response.json())
            .then(data => {
                setBackendData([data]);
            })
            .catch(err => console.error('Error fetching data:', err));
    }, []);

    useEffect(() => {
        const dadosMap = backendData.map((item, index) => (
            <div key={index}>
                {/* Aqui estamos iterando sobre o array 'users' */}
                {item.users && item.users.map((user, userIndex) => (
                    <p key={userIndex}>{user}</p>
                ))}
            </div>
        ));
        setRecebeMap(dadosMap);
    }, [backendData]);
    
    
    return (

            <div>
                {recebeMap}
            </div>

    );
};

export default TesteAPI;
