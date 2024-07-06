const TabOpt = ({ toggle, setToggle, opt1, opt2 }) => {
    return (
        <ul className="flex justify-center gap-12 items-center mb-10 font-popins sm:text-base text-xs">
            {/* Employees, Residents and Visitors */}
            <li style={toggle === 1 ? { fontWeight: 'bold' , borderBottom: '4px solid #22c55e', padding: '0.5rem 1rem' } : { borderBottom: '1px solid #ccc', padding: '0.5rem 1rem' }}>
                <button className="text-black " onClick={() => setToggle(1)}>
                    {opt1}
                </button>
            </li>
            <li style={toggle === 2 ? { fontWeight: 'bold', borderBottom: '4px solid #22c55e', padding: '0.5rem 1rem' } : { borderBottom: '1px solid #ccc', padding: '0.5rem 1rem' }}>
                <button className="text-black" onClick={() => setToggle(2)}>
                    {opt2}
                </button>
            </li>

        </ul>
    )
}

export default TabOpt;

