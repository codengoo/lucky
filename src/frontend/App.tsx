import Preview from "@admin/components/preview_qr"
import { IoMdCopy, IoMdSave } from "react-icons/io";

export default function Frontend() {
  function handleSave() {
    var link = document.createElement("a");
    link.download = "filename.png";
    // @ts-ignore
    link.href = document.getElementById("canvas").toDataURL();
    link.click();
  }

  function handleCopy() {
    window.navigator.clipboard.writeText(window.location.href);
  }

  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-center">
      <div className="flex flex-col sm:flex-row gap-3">
        <div
          className="rounded-xl shadow-xl flex flex-col justify-center items-center"
        >
          <Preview />
        </div>
        <div className="flex flex-row sm:flex-col">
          <button
            onClick={handleSave}
            className="fill-gray-600 text=xl p-3 rounded-3xl m-2 hover:bg-blue-400 hover:fill-white"
          >
            <IoMdSave />
          </button>

          <button
            onClick={handleCopy}
            className="fill-gray-600 text=xl p-3 rounded-3xl m-2 hover:bg-blue-400 hover:fill-white"
          >
            <IoMdCopy />
          </button>
        </div>
      </div >
    </div >
  )
}


{/* <style>
div#footer {
  display: none;
}
div#header {
  display: none;
}
</style> */}