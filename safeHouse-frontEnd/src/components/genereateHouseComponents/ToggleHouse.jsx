import React from 'react';

const ToggleHouse = ({ handdleToggle, state }) => {

    return (
        <div className='relative w-40 top-16 left-[80%] flex flex-col justify-end items-center '>
            <span class={`ms-3 text-lg font-medium ${state ? 'text-green-500':'text-green-700'}`}>
                {state ? 'Administrar casas' : 'Crear casa' }
            </span>
            <label class="inline-flex items-center cursor-pointer">
                <input onClick={() => handdleToggle(!state)} type="checkbox" value="" class="sr-only peer" />
                <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-600 rounded-full peer dark:bg-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>

            </label>
        </div>
    );
};

export default ToggleHouse;