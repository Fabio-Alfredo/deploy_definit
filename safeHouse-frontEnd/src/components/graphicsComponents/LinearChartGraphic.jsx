import { data } from 'autoprefixer';
import React from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const entradasPorMes = [
    { mes: "Ene", entradas: 1200 },
    { mes: "Feb", entradas: 1100 },
    { mes: "Mar", entradas: 1300 },
    { mes: "Abr", entradas: 1400 },
    { mes: "May", entradas: 1350 },
    { mes: "Jun", entradas: 1450 },
    { mes: "Jul", entradas: 1500 },
    { mes: "Ago", entradas: 1550 },
    { mes: "Sep", entradas: 1400 },
    { mes: "Oct", entradas: 1300 },
    { mes: "Nov", entradas: 1200 },
    { mes: "Dic", entradas: 1600 }
];

const LinearChartGraphic = () => {
    return (
        <ResponsiveContainer width="100%" aspect={2.2} >
            <AreaChart
                width={500}
                height={300}
                data={entradasPorMes}
                margin={{
                    top: 10,
                    right: 50,
                    left: 20,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="entradas" stackId={1} stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default LinearChartGraphic;