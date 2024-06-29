import React, { useEffect, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { GetEntrysByMonth } from '../../service/RequestService';

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

const abbreviations = {
    "JANUARY": "Ene",
    "FEBRUARY": "Feb",
    "MARCH": "Mar",
    "APRIL": "Abr",
    "MAY": "May",
    "JUNE": "Jun",
    "JULY": "Jul",
    "AUGUST": "Ago",
    "SEPTEMBER": "Sep",
    "OCTOBER": "Oct",
    "NOVEMBER": "Nov",
    "DECEMBER": "Dic"
}

const LinearChartGraphic = () => {

    const [data, setData] = useState([]);

    const getEntrysByMonth = async () => {
        const res = await GetEntrysByMonth()
        const modifiedData = res.data.map(item => ({
            ...item,
            abbreviation: abbreviations[item.name] 
        }));
        setData(modifiedData);
    }

    useEffect(() => {
        getEntrysByMonth()
    }, [])

    return (
        <ResponsiveContainer width="100%" aspect={2.2} >
            <AreaChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 10,
                    right: 50,
                    left: 20,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="abbreviation" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="entries" stackId={1} stroke="#8884d8" fill="#8884d8" />
            </AreaChart>
        </ResponsiveContainer>
    );
};

export default LinearChartGraphic;