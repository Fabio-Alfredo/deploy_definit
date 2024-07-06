import Header from "../components/Header";
import { GetHouseData, GetHouseEmty } from "../service/HouseService";
import { useEffect, useState } from "react";
import { TbHomePlus } from "react-icons/tb";
import House from "../components/adminHousesComponents/House";
import Navigation from "../components/Navigation";
import Swal from "sweetalert2";
import ToggleHouse from "../components/genereateHouseComponents/ToggleHouse";

const AdminHouse = () => {
    const [houses, setHouse] = useState([])
    const [toggle, setToggle] = useState(true)

    const handleGetter = async (toggle) => {
        try {
            const res = toggle ? await GetHouseData() : await GetHouseEmty('filter');
            setHouse(res.data);
        } catch (e) {
            Swal.fire({
                position: "center",
                icon: "error",
                title: `${e.data.message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }


    useEffect(() => {
        handleGetter(toggle)
    }, [toggle])



    const handdleToggle = (toggle) => {
        setToggle(toggle)
    }



    return (
        <div>
            < Header />

            <div className='bg-color-primary w-full absolute flex-col h-[90vh] flex justify-center items-center p-6 '>
                <div className='flex flex-col w-8/10 px-4 lg:w-4/5 md:w-3/4 md:h-5/6 h-fit xl:w-3/5 bg-white min-h-[90%] shadow-2xl br-20 rounded-3xl  pb-11'>
                    <ToggleHouse handdleToggle={handdleToggle} state={toggle} />
                    <Navigation title={"Administracion de casas"} />

                    <div className="overflow-y-auto sm:h-3/4 md:h-4/5 h-5/6 px-8 ">

                        {
                            houses.map((house) => (
                                <House key={house.id} house={house} state={toggle} updateState={setToggle} />
                            ))
                        }
                    </div>
                    <div onClick={{/*() => handleUpdateHouse(house.address)*/ }} className={`flex place-self-end items-center sm:pr-3 group cursor-pointer transition ease-in-out hover:-translate-y-1 hover:scale-100  ${toggle ? 'hidden' : ''}`}>
                        <p className=' font-md font-popins group-hover:block hidden text-cyan-500'> Nueva casa  </p>
                        <TbHomePlus className='text-5xl pl-2 group-hover:text-cyan-500 ' />
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AdminHouse;


// {
//     toggle ?
//         (
//             <div className='w-8/10 px-4 lg:w-4/5 md:w-3/4 md:h-5/6 h-fit xl:w-3/5 bg-white min-h-[90%] shadow-2xl br-20 rounded-3xl py-11'>
//                 <ToggleHouse handdleToggle={handdleToggle} state={toggle} />
//                 <Navigation title={"Administracion de casas"} />
//                 <div className="overflow-y-auto sm:h-3/4 md:h-5/6 h-5/6 px-8 ">
//                     {
//                         houses.map((house) => (
//                             <House key={house.id} house={house} />
//                         ))
//                     }
//                 </div>
//             </div>

//             // <div className='w-full min-h-[90%] xl:w-3/5 bg-white  shadow-2xl br-20 rounded-3xl py-11'>
//             //     <ToggleHouse handdleToggle={handdleToggle} state={toggle} />
//             //     <Navigation title={"Creation House de casas"} />
//             //     <FormHouseComponent />
//             // </div>
//         )
//         : (

//             <div className='w-8/10 px-4 lg:w-4/5 md:w-3/4 md:h-5/6 h-fit xl:w-3/5 bg-white min-h-[90%] shadow-2xl br-20 rounded-3xl py-11'>
//                 <ToggleHouse handdleToggle={handdleToggle} state={toggle} />
//                 <Navigation title={"Administracion de casas"} />
//                 <div className="overflow-y-auto sm:h-3/4 md:h-5/6 h-5/6 px-8 ">
//                     {
//                         houses.map((house) => (
//                             <House key={house.id} house={house} />
//                         ))
//                     }
//                 </div>
//             </div>

//         )

// }
