import { useNavigate } from "react-router-dom"
import Form from "../../../components/form"
import Header from "../../../components/header"
import { useContext } from "react"
import { BankQRContext, BankQRContextType } from "@admin/store/bankQR"
import Input from "@admin/components/input"
import Button from "@admin/components/button"
import { IoMdArrowForward, IoMdCopy, IoMdDownload, IoMdOpen, IoMdSave } from "react-icons/io"
import { AssetApi } from "../../../apis"

export default function Setting3() {
  const navigate = useNavigate();
  const { state, reset } = useContext(BankQRContext) as BankQRContextType;

  function handleNext() {
    reset();
    navigate("/create");
  }

  function handleOpen() {
    window.open(state.link);
  }

  function handleCopy() {
    window.navigator.clipboard.writeText(state.link);
  }

  async function handleSave() {
    var canvas = document.getElementById("canvas") as HTMLCanvasElement || null;

    if (canvas) {
      const data = canvas.toDataURL();
      const response = await AssetApi.uploadCanvas(data);
      console.log(response);
    }
  }

  function handleDownload() {
    var link = document.createElement("a");
    var canvas = document.getElementById("canvas") as HTMLCanvasElement || null;

    if (canvas && link) {
      link.setAttribute('download', 'card.png');
      link.setAttribute('href', canvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
      link.click();
    }
  }

  return (
    <div>
      <Header
        title="Xong rùi!"
        subtitle="Tạo mã QR kèm lời chúc cho những người thân yêu"
      />

      <div className="pt-8 h-full">
        <Form
          onSubmit={handleNext}
          input_component={
            <>
              <Input
                title="Link của bạn đây"
                type="text"
                id="link"
                value={state.link}
                disabled
              />

              <div className="mb-5 flex gap-2">
                <Button onClick={handleOpen} icon_center={<IoMdOpen />} styleBtn="Alternative" type="button" />
                <Button onClick={handleCopy} icon_center={<IoMdCopy />} styleBtn="Alternative" type="button" />
                <Button onClick={handleSave} icon_center={<IoMdSave />} styleBtn="Alternative" type="button" />
                <Button onClick={handleDownload} icon_center={<IoMdDownload />} type="button" />
              </div>
            </>
          }

          button_element={
            <div>
              <Button title="Hoàn thành" onClick={handleNext} icon={<IoMdArrowForward />} />
            </div>
          }>
        </Form>
      </div>
    </div>
  )

}