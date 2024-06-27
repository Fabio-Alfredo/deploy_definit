/* eslint-disable react/prop-types */
const VisitorsList = ({ user, children }) => {

    return (
        <ul>
            <li className='font-popins pt-2 sm:text-lg text-xs' key={user.id}>
                <div className="flex justify-between">
                    <p className="font-bold pl-7">
                        {user.name}
                    </p>
                    {children}
                </div>
                <hr className='w-full bg-black  sm:h-[2px] h-[1px]' />
                <p className="pl-14 pt-2">
                    {user.email}
                </p>
                <hr className=' ml-7  bg-black   mb-8' />

            </li>

        </ul >
    )
}

export default VisitorsList;
