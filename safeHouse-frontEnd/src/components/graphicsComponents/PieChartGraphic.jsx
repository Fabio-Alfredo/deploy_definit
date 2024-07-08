import React from 'react';
import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell, Text, LabelList } from 'recharts';

const data = [
    { name: 'Residentes', entries: 200 },
    { name: 'Visitantes', entries: 100 },
    { name: 'Anonimas', entries: 40 }
]

const color = [
    '#00C49F',
    '#FFBB28',
    '#FF8042'

]

const PieChartGraphic = () => {
    return (
            <ResponsiveContainer width="100%" aspect={2} >
                <PieChart>
                    <Pie
                        className="cursor-pointer"
                        dataKey={'entries'}
                        name={'name'}
                        data={data}
                        innerRadius={50}
                        outerRadius={120}
                        animationDuration={400}
                    >
                        {
                            data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={color[index % color.length]} className='hover:translate-x-1 duration-500' />

                            ))

                        }
                        <LabelList dataKey="name" position="top" fill="white" />
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        // </div>
    );
};

export default PieChartGraphic;