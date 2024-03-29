import { BankQRContext, BankQRContextType } from "@admin/store/bankQR";
import { useContext, useEffect, useRef, useState } from "react";

interface ISize {
  height: number;
  width: number;
}

export default function PreviewQR() {
  const [qr] = useState(new Image());
  const [bg] = useState(new Image());
  const [size, setSize] = useState<ISize>({ width: 0, height: 0 });
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [startTime, setStartTime] = useState<number>((new Date()).getTime())
  const { state } = useContext(BankQRContext) as BankQRContextType;
  const canvas = useRef<HTMLCanvasElement>(null);

  function draw() {
    if (context) {
      console.log("Drawing...");
      drawImage();
      drawQR();
      drawText();
    }
  };

  function drawImage() {
    context!.drawImage(
      bg, 0, 0,
      size.width,
      size.height
    );
  }

  function drawQR() {
    context!.drawImage(
      qr, 10, 10, 110, 110
    );
  }

  function drawText() {
    if (context) {
      context.font = "bold 21px Lato";
      context.fillStyle = "#FFFFFF";
      context.fillText(state.wish, 20, 160);

      context.font = "bold 36px Lato";
      context.fillStyle = "#FFFFFF";
      context.fillText(state.account.name, 20, size.height - 100);

      context.font = "bold 21px Lato";
      context.fillText(state.account.bank_short, 20, size.height - 70);

      context.font = "bold 21px Lato";
      context.fillText(state.account.number, 20, size.height - 50);
    }
  }

  useEffect(() => {
    if (canvas.current) {
      const parentNode = canvas.current.parentNode as HTMLElement;
      if (parentNode) {
        const rect = parentNode.getBoundingClientRect();
        canvas.current.width = rect.width;
        canvas.current.height = rect.height;
        setSize({ width: rect.width, height: rect.height });
        setContext(canvas.current.getContext("2d"));
      }
    }
  }, [])

  useEffect(() => {
    if (context) {
      context.imageSmoothingEnabled = false;

      bg.src = state.image.startsWith("blob") || state.image.startsWith("http")
        ? state.image
        : window.WPLKPath.assets + state.image;

      bg.onload = () => draw();
    }
  }, [context])

  useEffect(() => {
    draw();
  }, [state.account.name, state.wish])

  useEffect(() => {
    if (state.account.bank !== "0" && state.account.number !== "") {
      const now = (new Date()).getTime();
      
      if (now - startTime > 1000) {
        console.log("restart");
        qr.src = `https://img.vietqr.io/image/${state.account.bank}-${state.account.number}-qr_only.png`;
        qr.onload = () => draw();
        setStartTime(now);
      } else {
        draw();
      }
    }
    draw();
  }, [state.account.bank, state.account.number])

  useEffect(() => {
    bg.src = state.image.includes("blob:http") || state.image.includes("http")
      ? state.image
      : window.WPLKPath.assets + state.image;

    bg.onload = () => draw();
  }, [state.image])

  return (
    <div className="w-80 flex-none rounded-2xl overflow-hidden shadow-xl h-full">
      <canvas id="canvas" ref={canvas} width="100%" height="100%" />
    </div>
  )
}