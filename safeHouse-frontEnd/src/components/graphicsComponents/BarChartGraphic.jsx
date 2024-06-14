import React from 'react';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    { name: 'lunes', entries: 200 },
    { name: 'martes', entries: 100 },
    { name: 'miercoles', entries: 40 },
    { name: 'jueves', entries: 40 },
    { name: 'viernes', entries: 40 },
    { name: 'sabado', entries: 40 },
    { name: 'domingo', entries: 40 }
]

const BarChartGraphic = () => {
    return (
        <ResponsiveContainer width="90%" aspect={2} >
            <BarChart
                data={data}
                width={500}
                height={300}
                margin={{
                    top: 10,
                    right: 20,
                    left: 5,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="4 1 2" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="entries" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartGraphic;