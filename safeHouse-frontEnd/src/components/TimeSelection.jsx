import React from 'react';
import DatePicker, { DateObject, Calendar } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import Datepanel from 'react-multi-date-picker/plugins/date_panel'
import { Label } from 'recharts';


const TimeSelection = ({name, label, inputValue, inputOnchange}) => {
    return (
        <>
            <div className='grid grid-cols-3 sm:mx-12 items-center m-4 lg:m-4 xl:m-8 '>
                <label htmlFor={name} className='col-span-1 font-popins text-sm sm:text-2xl'> {label} </label>
                <div className='col-span-1 flex overflow-hidden flex-col sm:ml-11 shadow-md font-popins bg-input-color rounded-md h-10 '>
                    <DatePicker
                        disableDayPicker
                        format='HH:mm'
                        value={inputValue}
                        style={{
                            backgroundColor: '#d9d9d9',
                            border: 'none',
                            display: 'flex',
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onChange={inputOnchange}
                        plugins={[
                            <TimePicker hideSeconds position="bottom" />,
                        ]}
                    />
                </div>
            </div>
        </>
    );
};

export default TimeSelection;