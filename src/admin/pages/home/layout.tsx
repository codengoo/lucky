import { Outlet } from "react-router-dom";
import Preview from "./components/preview";

export default function HomeLayout() {
  return (
    <div>
      <div className="mt-20">
        <div className="w-full flex justify-center">
          <div
            className="h-[70vh] bg-white shadow-lg border border-gray-200 rounded-3xl overflow-hidden flex"
          >
            <div className="p-2 flex justify-center items-center">
              <Preview />
            </div>
            <div className="p-8 pl-10 max-w-96 re-scroll flex flex-col h-full">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}