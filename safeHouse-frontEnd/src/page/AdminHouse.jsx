import Header from "../components/Header";
import { GetHouseData } from "../service/HouseService";
import { useEffect, useState } from "react";
import House from "../components/adminHousesComponents/House";
import Navigation from "../components/Navigation";
import Swal from "sweetalert2";

const AdminHouse = () => {
    const [houses, setHouse] = useState([])

    useEffect(() => {
        try {
            const getHouse = async () => {
                const res = await GetHouseData();
                console.log(res.data);
                setHouse(res.data);
            };
            getHouse();
        } catch (e) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${e.data.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }


    }, [])

    return (
        <div>
            <Header />
            <div className='bg-color-primary w-full flex-col h-[90vh] flex justify-center items-center p-6 '>
                <div className='w-8/10 px-4 lg:w-4/5 md:w-3/4 md:h-5/6 h-fit xl:w-3/5 bg-white min-h-[90%] shadow-2xl br-20 rounded-3xl py-11'>

                    <Navigation title={"Administracion de casas"} />
                    <div className="overflow-y-auto sm:h-3/4 md:h-5/6 h-5/6 px-8 ">
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
