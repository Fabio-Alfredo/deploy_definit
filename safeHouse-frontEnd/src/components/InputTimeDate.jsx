import React from 'react';
import DatePicker, { DateObject, Calendar } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import Datepanel from 'react-multi-date-picker/plugins/date_panel'


const InputTimeDate = ({ name, label, inputValue, inputOnchange }) => {

    return (


        <>
            <div className='grid grid-cols-3 sm:mx-12 items-center m-4 lg:m-4 xl:m-8 '>
                <label htmlFor={name} className='col-span-1 font-popins text-sm sm:text-2xl'> {label} </label> {/* query */}
                <div className='col-span-2 flex flex-col overflow-auto sm:ml-11 shadow-md font-popins bg-input-color rounded-md h-40 '>
                    <DatePicker
                        format='MM/DD/YYYY HH:mm'
                        value={inputValue}
                        onChange={inputOnchange}
                        style={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            height: '160px',
                            border: 'none',
                            fontSize: '1rem',
                            color: 'black',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            padding: '8px',
                            overflow: 'auto',

                        }}
                        plugins={[
                            <TimePicker hideSeconds position="bottom" />,
                            <Datepanel markFocused />,
                        ]}
                    />
                </div>
            </div>
        </>
    );
};

export default InputTimeDate;

