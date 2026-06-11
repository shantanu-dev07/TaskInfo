import Aos from 'aos';
import { useEffect } from "react";
import { animations, taskCategories } from "../utils/constant";
import TaskViewModal from "./TaskViewModal";

const TaskCard = ({ data }) => {

    const category = data.category;
    const categoryClass = taskCategories[category];

    const animation = 0;

    useEffect(() => {
        Aos.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <div
            className="w-full bg-white rounded-xl shadow-md py-3 px-3 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
            data-aos={animations[animation]}
        >
            <p className="text-3xl font-bold capitalize">
                {data.title}
            </p>

            <p className="font-semibold text-normal text-zinc-400 py-2 bg-gray-100 rounded-2xl px-3 mt-3 min-h-20">
                {data.description}
            </p>

            <div className="py-3 flex justify-between items-center">
                <span className={`${categoryClass} capitalize`}>
                    {category}
                </span>

                <TaskViewModal id={data._id} />
            </div>
        </div>
    );
};

export default TaskCard;