import { AiOutlineCaretDown, AiOutlineCaretUp } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from 'react-router-dom'


export default function Dropdown({ list, name }) {

    const navigate = useNavigate()
    const handleNavigation = (link) =>{
        navigate(link)
    }

    const [isOpen, setIsOpen] = useState(false);

    const handleMouseEnterButton = () => {
        setIsOpen(true);
    };

    const handleMouseLeaveButton = () => {
        setTimeout(() => {
            if (!isMouseOverDropdown) {
                setIsOpen(false);
            }
        }, 300);
    };

    const handleMouseEnterDropdown = () => {
        isMouseOverDropdown = true;
    };

    const handleMouseLeaveDropdown = () => {
        isMouseOverDropdown = false;
        setTimeout(() => {
            if (!isMouseOverDropdown) {
                setIsOpen(false);
            }
        }, 300);
    };

    let isMouseOverDropdown = false;

    return (
        <div className=" relative flex flex-col items-center w-[205px] rounded-lg mt-3 ml-5">
            <button
                onMouseEnter={handleMouseEnterButton}
                onMouseLeave={handleMouseLeaveButton}
                className="w-full flex items-center justify-between text-sm rounded-lg tenor-sans-regular"
            >
                {name}
                {!isOpen ? (
                    <AiOutlineCaretDown className="h-4 w-[1.2rem] text-sm" />
                ) : (
                    <AiOutlineCaretUp className="h-4 w-[1.2rem] text-sm" />
                )}
            </button>
            {isOpen && (
                <div
                    className="bg-white border-2 border-gray-300 absolute top-16 flex flex-col items-start rounded-lg  w-[255px] z-50 "
                    onMouseEnter={handleMouseEnterDropdown}
                    onMouseLeave={handleMouseLeaveDropdown}
                >
                    {list.map((item, index) => (
                        <div
                            key={index}
                            className="flex p-1  w-full justify-center hover:bg-slate-100 cursor-pointer  hover:font-semibold hover:text-gray-800  first:rounded-t-lg last:rounded-b-lg text-sm "
                            onClick={() => handleNavigation(item.link)}
                        >
                            <h3>{item.title}</h3>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
