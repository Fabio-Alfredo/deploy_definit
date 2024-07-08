const TabOpt = ({ toggle, setToggle, options }) => {
    return (
        <div className="overflow-x-auto">
            <ul className="flex justify-center gap-12 items-center mb-10 font-popins sm:text-base text-xs">
                {options.map((option, index) => (
                    <li
                        key={index}
                        style={
                            toggle === index + 1
                                ? { fontWeight: 'bold', borderBottom: '4px solid #22c55e', padding: '0.5rem 1rem' }
                                : { borderBottom: '1px solid #ccc', padding: '0.5rem 1rem' }
                        }
                    >
                        <button className="text-black" onClick={() => setToggle(index + 1)}>
                            {option}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TabOpt;
