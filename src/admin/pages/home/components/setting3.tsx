import { useNavigate } from "react-router-dom"
import Form from "./form"
import Header from "./header"
import { useContext } from "react"
import { BankQRContext, BankQRContextType } from "@admin/store/bankQR"
import Input from "@admin/components/input"
import Button from "@admin/components/button"
import { IoMdArrowForward, IoMdCopy, IoMdOpen } from "react-icons/io"

export default function Setting3() {
  const navigate = useNavigate();
  const { state } = useContext(BankQRContext) as BankQRContextType;

  function handleNext() {
    navigate("/create");
  }

  function handleOpen() {
    window.open(state.link);
  }

  function handleCopy() {
    window.navigator.clipboard.writeText(state.link);
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
            <div className="flex items-end gap-2">
              <Input
                title="Link của bạn đây"
                type="text"
                id="link"
                value={state.link}
                disabled
              />

              <div className="mb-5 flex gap-2">
                <Button onClick={handleOpen} icon_center={<IoMdOpen />} styleBtn="Alternative" />
                <Button onClick={handleCopy} icon={<IoMdCopy />} />
              </div>
            </div>
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