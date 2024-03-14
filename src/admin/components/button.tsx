import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";


type OriginalProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

interface IProps extends OriginalProps {
    icon?: ReactNode,
    icon_start?: ReactNode,
    icon_center?: ReactNode,
    styleBtn?: "Alternative" | "None"
}

export default function Button({ title, styleBtn, icon, icon_center, icon_start, ...rest }: IProps) {
    return (
        <div className="">
            <button
                {...rest}
                className={
                    "py-2.5 px-5 text-sm font-medium focus:z-10 focus:ring-4 focus:outline-none rounded-lg border text-center inline-flex items-center min-h-11 " +
                    (styleBtn === 'Alternative'
                        ? 'bg-white text-gray-900 border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:ring-gray-100'
                        : 'text-white bg-blue-700 hover:bg-blue-800 border-blue-700 focus:ring-blue-300')
                }
            >
                {icon_start &&
                    <span className="me-2 text-lg flex flex-col justify-center">
                        {icon_start}
                    </span>
                }

                {icon_center &&
                    <span className="text-lg flex flex-col justify-center">
                        {icon_center}
                    </span>}

                {title}

                {icon &&
                    <span className="ms-2 text-lg flex flex-col justify-center">
                        {icon}
                    </span>
                }
            </button>
        </div >
    )
}