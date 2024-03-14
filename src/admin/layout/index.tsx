import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="mt-20 w-full flex justify-center">
            <div
                className="h-[70vh] bg-white shadow-lg border border-gray-200 rounded-3xl overflow-hidden flex">
                {children}
            </div>
        </div>
    )
}