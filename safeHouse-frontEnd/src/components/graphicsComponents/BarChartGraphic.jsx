import React from 'react';
import { Bar, BarChart, CartesianGrid   , ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    { name: 'lunes', entries: 200, color: '#00C49F'},
    { name: 'martes', entries: 100, color: '#FFBB28'},
    { name: 'miercoles', entries: 40, color: '#FF8042'},
    { name: 'jueves', entries: 100, color: '#0088FE'},
    { name: 'viernes', entries: 40, color: '#00C49F'},
    { name: 'sabado', entries: 57, color: '#FFBB28'},
    { name: 'domingo', entries: 40, color: '#FF8042'}
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
                <Bar dataKey="entries" fill="#008D62" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartGraphic;