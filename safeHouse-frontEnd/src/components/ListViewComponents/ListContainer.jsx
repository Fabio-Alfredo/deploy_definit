import { useState, useEffect } from 'react';
import fetchUsers from '../../service/fetchUsers';
import VisitorsList from '../adminHousesComponents/VisitorsList';
import fetchHouses from '../../service/fetchHouses';
import UserEmailList from '../adminHousesComponents/UserEmailList';

const ListContainer = () => {
    const [toggle, setToggle] = useState(1);
    const [users, setUser] = useState([]);
    const [houses, setHouse] = useState([]);

    useEffect(() => {
        const getUser = async () => {
            const fetchUser = await fetchUsers();
            setUser(fetchUser);
        };

        getUser();
    }, []);

    useEffect(() => {
        const getHouse = async () => {
            const fetcheHouse = await fetchHouses();
            setHouse(fetcheHouse);
        };

        getHouse();
    }, [])

    function updateToggle(value) {
        setToggle(value);
    }

    return (
        <div className="list-container h-full">
            <div className="list-header">
                <ul className="flex justify-around mb-10 font-popins">
                    {/* Employees, Residents and Visitors */}
                    <li className={toggle === 1 ? 'font-bold' : ''}>
                        <button
                            className="text-black"
                            onClick={() => updateToggle(1)}
                        >Visitors</button>

                    </li>
                    <li className={toggle === 2 ? 'font-bold' : ''}>
                        <button
                            className="text-black"
                            onClick={() => updateToggle(2)}
                        >Employees </button>
                    </li>
                    <li className={toggle === 3 ? 'font-bold' : ''}>
                        <button
                            className="text-black"
                            onClick={() => updateToggle(3)}
                        >Residents</button>
                    </li>

                </ul>
            </div>

            <div className="overflow-y-auto sm:h-3/4 md:h-5/6 h-5/6">
                {toggle === 1 && (
                    <div id="visitors">
                        {users.map((user) => (
                            <VisitorsList key={user.id} user={user} />
                        ))}
                    </div>
                )}
                {toggle === 2 && (
                    <div id="employees">
                        <h1>Employees</h1>
                    </div>
                )}
                {toggle === 3 && (
                    <div id="residents">
                        {
                            houses.map((house) => (
                                <UserEmailList key={house.id} users={house.users} />
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListContainer;
