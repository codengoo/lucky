import { Outlet } from "react-router-dom";
import AdminLayout from "@admin/layout";
import { MessageProvider } from "@admin/store/message";
import PreviewMessage from "@admin/components/preview_message";

export default function MessagePage() {
  return (
    <AdminLayout>
      <MessageProvider>
        <>
          <div className="p-2 flex justify-center items-center">
            <PreviewMessage />
          </div>
          <div className="p-8 pl-10 max-w-96 re-scroll flex flex-col h-full">
            <Outlet />
          </div>
        </>
      </MessageProvider>
    </AdminLayout>
  )
}