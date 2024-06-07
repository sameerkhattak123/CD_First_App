import React, { useEffect } from 'react';
import { Typography } from 'antd';


const { Title } = Typography;


const containerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '10vh', // Adjust as needed
};




export default function Counter1 ({ number }) {
    useEffect(() => {
        console.log("Functional Component Updating");

        return () => {
            console.log("Functional Component Removed");
        };
    }, [number]);

    return (
        <div>
            <Title>{number}</Title>
        </div>
    );
}
