import React, {useEffect, useState} from 'react';
import { Bar, BarChart, CartesianGrid   , ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { GetEntrysByDay } from '../../service/RequestService';


const abbreviations = {
    "MONDAY": "Lun",
    "TUESDAY": "Mar",
    "WEDNESDAY": "Mie",
    "THURSDAY": "Jue",
    "FRIDAY": "Vie",
    "SATURDAY": "Sab",
    "SUNDAY": "Dom"
};

const BarChartGraphic = () => {

    const [data, setData] = useState([]);

    const getData = async () => {
        const res = await GetEntrysByDay();
        const modifiedData = res.data.map(item => ({
            ...item,
            abbreviation: abbreviations[item.name] 
        }));
        setData(modifiedData);

    }

    useEffect(() => {
        getData();
    }, []);

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
                <XAxis dataKey="abbreviation" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="entries" fill="#008D62" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartGraphic;