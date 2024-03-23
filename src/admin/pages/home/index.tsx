import { Outlet } from "react-router-dom";
import PreviewQR from "@admin/components/preview_qr";
import { BankQRProvider } from "@admin/store/bankQR";
import AdminLayout from "@admin/layout";

export default function HomePage() {
  return (
    <AdminLayout>
      <BankQRProvider>
        <>
          <div className="p-2 flex justify-center items-center">
            <PreviewQR />
          </div>
          <div className="p-8 pl-10 max-w-96 re-scroll flex flex-col h-full">
            <Outlet />
          </div>
        </>
      </BankQRProvider>
    </AdminLayout>
  )
}