import Header from "../components/Header";
import fetchHouses from "../service/fetchHouses";
import { useEffect, useState } from "react";
import NavBar from "../components/adminHousesComponents/navBar";
import House from "../components/adminHousesComponents/House";

const AdminHouse = () => {
    const [houses, setHouse] = useState([])

    useEffect(() => {
        const getHouse = async () => {
            const fetcheHouse = await fetchHouses();
            setHouse(fetcheHouse);
        };

        getHouse();
    }, [])

    return (
        <div>
            <Header />
            <div className='bg-principalColor w-full flex-col h-[90vh] flex justify-center items-center p-6 '>
                <div className='w-8/10 lg:w-3/4 md:w-3/4 xl:w-1/2 bg-white sm:h-3/4 h-[90%] shadow-2xl br-20 p-8  rounded-3xl'>

                    <NavBar />
                    <div className="overflow-y-auto sm:h-3/4 h-[80%]">
                        {
                            houses.map((house) => (
                                <House key={house.id} house={house} />
                            ))
                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminHouse;
