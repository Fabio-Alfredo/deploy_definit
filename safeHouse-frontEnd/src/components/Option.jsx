
const Option = ({image, title}) => {

    const Icon = image;
    return (
    
        <button className='md:w-60 md:h-60 sm:w-40 sm:h-40 w-32 h-32 p-8 grid grid-rows-2 justify-center rounded-2xl bg-[#008D62] shadow-2xl transition ease-in-out duration-300 hover:bg-[#2CA880]'>
            <Icon className="text-white text-6xl place-self-center scale-50 md:scale-100"/>    
            <p className="text-white text-center font-popins text-xs md:text-xl sm:text-sm">
                {title}
            </p>
        </button>
    );
};

export default Option;