const TabOpt = ({toggle, setToggle}) => {
    return(
        <ul className="flex justify-around mb-10 font-popins">
                    {/* Employees, Residents and Visitors */}
                    <li className={toggle === 1 ? 'font-bold' : ''}>
                        <button
                            className="text-black"
                            onClick={() => setToggle(1)}
                        >Visitors</button>

                    </li>
                    <li className={toggle === 2 ? 'font-bold' : ''}>
                        <button
                            className="text-black"
                            onClick={() => setToggle(2)}
                        >Employees </button>
                    </li>
                    <li className={toggle === 3 ? 'font-bold' : ''}>
                        <button
                            className="text-black"
                            onClick={() => setToggle(3)}
                        >Residents</button>
                    </li>

                </ul>
    )
}

export default TabOpt;

