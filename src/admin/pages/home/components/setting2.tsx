import { useNavigate } from "react-router-dom"
import Form from "../../../components/form"
import Header from "../../../components/header"
import Input from "@admin/components/input"
import { useContext, useEffect, useState } from "react"
import { BankQRContext, BankQRContextType } from "@admin/store/bankQR"
import SelectImage from "@admin/components/select_image"
import Button from "@admin/components/button"
import { IoMdArrowForward, IoMdArrowBack } from "react-icons/io"
import Chip from "@admin/components/chip"
import { AssetApi, ChipApi, CardApi } from "@admin/apis"

export default function Setting2() {
  const navigate = useNavigate();
  const { state, changeWish, changeImage, changeLink } = useContext(BankQRContext) as BankQRContextType;
  const [imageList, setImageList] = useState<{ name: string, value: string }[]>([]);
  const [wishList, setWishList] = useState<{ value: string }[]>([]);

  async function handleNext(data: any) {
    if (state.image.startsWith("blob")) {
      const link = await AssetApi.uploadImage(data['image_file']);
      if (link) {
        changeImage(link);
        const card = await CardApi.createCard({ ...state, image: link });
        if (card) {
          changeLink(card);
          navigate("/create/step3");
        }
      }
    } else {
      const card = await CardApi.createCard(state);
      if (card) {
        changeLink(card);
        navigate("/create/step3");
      }
    }
  }

  function handleWish(data: string) {
    changeWish(data);
  }

  function handleImage(data: string) {
    changeImage(data);
  }

  function handleChip(data: string) {
    changeWish(data);
  }

  function handleRemoveChip(data: string) {
    setWishList(() => wishList.filter(item => item.value !== data));
    ChipApi.remove(data);
  }

  function handleAddChip() {
    setWishList(() => [...wishList, { value: state.wish }]);
    ChipApi.add(state.wish);
  }

  function backStep() {
    navigate("/create");
  }

  useEffect(() => {
    setImageList([
      { value: "images/preview.png", name: "1" },
      { value: "images/preview_2.png", name: "2" },
    ])

    ChipApi.get().then(data => {
      data && setWishList(data.map(item => ({ value: item })))
    })
      ;
  }, [])

  return (
    <>
      <Header
        title="Phong bao"
        subtitle="Gần xong rùi nè"
      />

      <Form
        onSubmit={handleNext}
        input_component={
          <>
            <Input
              title="Lời chúc"
              type="text"
              id="wish"
              placeholder="Chúc mừng bạn"
              required
              value={state.wish}
              onChange={handleWish}
            />

            <Chip
              value={state.wish}
              data={wishList}
              onClick={handleChip}
              onAdd={handleAddChip}
              onRemove={handleRemoveChip}
            />

            <SelectImage
              onChange={handleImage}
              data={imageList}
              value={state.image}
              title="Chọn mẫu"
              id="image"
            />
          </>
        }

        button_element={
          <>
            <Button onClick={backStep} styleBtn="Alternative" icon_center={<IoMdArrowBack />} />
            <Button title="Tạo thôi" icon={<IoMdArrowForward />} type="submit" />
          </>
        }>
      </Form>
    </>
  )
}