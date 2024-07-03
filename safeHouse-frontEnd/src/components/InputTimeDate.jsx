import React from 'react';
import DatePicker, { DateObject, Calendar } from 'react-multi-date-picker';
import TimePicker from 'react-multi-date-picker/plugins/time_picker';
import Datepanel from 'react-multi-date-picker/plugins/date_panel'


const InputTimeDate = ({ name, label, inputValue, inputOnchange, dates }) => {

    return (
        <>
            <div className='grid grid-cols-3 sm:mx-12 items-center m-4 lg:m-4 xl:m-8 '>
                <label htmlFor={name} className='col-span-1 font-popins text-sm sm:text-2xl'> {label} </label> {/* query */}
                <div className='col-span-2 flex overflow-auto flex-col sm:ml-11 shadow-md font-popins bg-input-color rounded-md h-10 '>
                    <DatePicker
                        format='MM/DD/YYYY'
                        value={inputValue}
                        onChange={inputOnchange}
                        style={{
                            width: '100%',
                            backgroundColor: 'transparent',
                            height: '40px',
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
                            <Datepanel markFocused />
                        ]}
                    />
                </div>
            </div>
        </>
    );
};

export default InputTimeDate;


{/* <div className='m-2 p-4 text-center bg-green-400  min-h-36 w-full '>
                        {
                            inputValue.map((date, index) => (
                                <span key={index} className='text-black bg-red-300 mb-2 rounded-md'>
                                    {date.format('MM/DD/YYYY HH:mm')}
                                    <br />
                                </span>
                            ))
                        }
                    </div> */}