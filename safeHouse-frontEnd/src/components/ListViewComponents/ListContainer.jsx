import { useState, useEffect } from 'react';
import fetchUsers from '../../service/fetchUsers';
import VisitorsList from '../adminHousesComponents/VisitorsList';
import TabOpt from './TabOpt';
import { GetUsersInfo } from '../../service/UserService';

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
            // const fetchUser = await fetchUsers();
            const res = await GetUsersInfo();
            setUser(res.data);
            // setUser(fetchUser);
        };

        getUser();
    }, []);

    
    return (
        <div className="flex flex-col justify-center h-fit ">
            <div className="list-header">
                <TabOpt toggle={toggle} setToggle={setToggle} />
            </div>

            <div className="overflow-y-auto min-h-[50vh] max-h-[50vh] sn:mx-3 " id="scroll-container">
                {toggle === 1 && (
                    <div id="visitors">
                        {users.filter(user => user.roles.map(r=>r.id).includes("VIST") ).map((user) => (
                            <VisitorsList key={user.id} user={user} />
                        ))}
                    </div>
                )}
                {toggle === 2 && (
                    <div id="employees">
                        {users.filter(user => user.roles.map(r=>r.id).includes("EMPL") ).map((user) => (
                            <VisitorsList key={user.id} user={user} />
                        ))}
                    </div>
                )}
                {toggle === 3 && (
                    <div id="residents">
                        {
                            users.filter(user => user.roles.map(r=>r.id).includes("RESD") ).map((user) => (
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
