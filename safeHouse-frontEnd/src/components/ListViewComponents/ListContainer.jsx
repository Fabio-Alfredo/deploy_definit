import { useState, useEffect } from 'react';
import fetchUsers from '../../service/fetchUsers';
import VisitorsList from '../adminHousesComponents/VisitorsList';
import TabOpt from './TabOpt';

const ListContainer = () => {
    const [users, setUser] = useState([]);
    const [toggle, setToggle] = useState(1);

    const resetScroll = () => {
        const scrollContainer = document.getElementById('scroll-container');
        scrollContainer.scrollTop = 0;
    };

    useEffect(() => {
        resetScroll();
    }, [toggle]);

    useEffect(() => {
        const getUser = async () => {
            const fetchUser = await fetchUsers();
            setUser(fetchUser);
        };

        getUser();
    }, []);

    
    return (
        <div className="flex flex-col justify-center h-fit ">
            <div className="list-header mr-5">
                <TabOpt toggle={toggle} setToggle={setToggle} />
            </div>

            <div className="overflow-y-auto max-h-[50vh] sn:mx-3 " id="scroll-container">
                {toggle === 1 && (
                    <div id="visitors">
                        {users.filter(user => user.rol ==='user' ).map((user) => (
                            <VisitorsList key={user.id} user={user} />
                        ))}
                    </div>
                )}
                {toggle === 2 && (
                    <div id="employees">
                        {users.filter(user => user.rol ==='employee' ).map((user) => (
                            <VisitorsList key={user.id} user={user} />
                        ))}
                    </div>
                )}
                {toggle === 3 && (
                    <div id="residents">
                        {
                            users.filter(user => user.rol ==='resident' ).map((user) => (
                                <VisitorsList key={user.id} user={user} />
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

export default ListContainer;
