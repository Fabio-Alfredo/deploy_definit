/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const Option = ({ image, title, to }) => {
    const Icon = image;
    return (
        <Link
            to={to}
            className="grid h-32 w-32 grid-rows-2 justify-center rounded-2xl bg-[#008D62] p-8 shadow-2xl transition duration-300 ease-in-out hover:bg-[#2CA880] sm:h-40 sm:w-40 md:h-56 md:w-56"
        >
            <Icon className="scale-50 place-self-center text-6xl text-white md:scale-100" />
            <p className="font-popins text-center text-xs text-white sm:text-sm md:text-xl">
                {title}
            </p>
        </Link>
    );
};

export default Option;