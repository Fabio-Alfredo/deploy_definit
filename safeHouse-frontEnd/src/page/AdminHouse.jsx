import Header from "../components/Header";
import { GetHouseData } from "../service/HouseService";
import { useEffect, useState } from "react";
import House from "../components/adminHousesComponents/House";
import Navigation from "../components/Navigation";
import Swal from "sweetalert2";
import ToggleHouse from "../components/genereateHouseComponents/ToggleHouse";
import FormHouseComponent from "../components/genereateHouseComponents/FormHouseComponent";

const AdminHouse = () => {
    const [houses, setHouse] = useState([])
    const [toggle, setToggle] = useState(false)

    useEffect(() => {
        try {
            const getHouse = async () => {
                const res = await GetHouseData();
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

    const handdleToggle = (toggle) => {
        setToggle(toggle)
    }



    return (
        <div>
            < Header />
            <div className='bg-color-primary w-full flex-col h-[90vh] flex justify-center items-center p-6 '>  {
                toggle ?
                    (

                        <div className='w-8/10 px-4 lg:w-4/5 md:w-3/4 md:h-5/6 min-h-[90%] xl:w-3/5 bg-white  shadow-2xl br-20 rounded-3xl py-11'>
                            <ToggleHouse handdleToggle={handdleToggle} state={toggle} />
                            <Navigation title={"Creation House de casas"} />
                            <FormHouseComponent />
                        </div>
                    )
                    : (

                        <div className='w-8/10 px-4 lg:w-4/5 md:w-3/4 md:h-5/6 h-fit xl:w-3/5 bg-white min-h-[90%] shadow-2xl br-20 rounded-3xl py-11'>
                            <ToggleHouse handdleToggle={handdleToggle} state={toggle} />
                            <Navigation title={"Administracion de casas"} />
                            <div className="overflow-y-auto sm:h-3/4 md:h-5/6 h-5/6 px-8 ">
                                {
                                    houses.map((house) => (
                                        <House key={house.id} house={house} />
                                    ))
                                }
                            </div>
                        </div>

                    )

            }
            </div>
        </div >
    )
}

export default AdminHouse;
