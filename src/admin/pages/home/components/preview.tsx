import { BankQRContext, BankQRContextType } from "src/store/bankQR";
import { useContext, useEffect, useRef, useState } from "react";

export default function Preview() {
  const [qr, setQr] = useState(new Image());
  const [bg, setBg] = useState(new Image());
  const { state } = useContext(BankQRContext) as BankQRContextType;
  const [size, setSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  function draw() {
    drawImage();
    drawQR();
    drawText();
  };

  function drawImage() {
    context && context.drawImage(
      bg, 0, 0,
      size.width,
      size.height
    );
  }

  function drawQR() {
    context && context.drawImage(
      qr, 10, 10, 110, 110
    );
  }

  function drawText() {
    if (context) {
      context.font = "bold 36px Lato";
      context.fillStyle = "#FFFFFF";
      context.fillText(state.account.name, 20, size.height - 100);
      context.font = "bold 21px Lato";
      context.fillText(state.account.bank, 20, size.height - 70);
      context.font = "bold 21px Lato";
      context.fillText(state.account.number, 20, size.height - 50);
    }
  }

  useEffect(() => {
    if (canvas.current) {
      const parentNode = canvas.current.parentNode as HTMLElement;
      if (parentNode) {
        const rect = parentNode.getBoundingClientRect();

        setSize({ width: rect.width, height: rect.height });
        setContext(canvas.current.getContext("2d"));
        if (context) {
          context.imageSmoothingEnabled = false;

        }
      }
    }

    bg.onload = () => draw();
    qr.onload = () => draw();

  }, [])

  useEffect(() => {
    draw();
  }, [state.account.bank_short, state.account.name])

  useEffect(() => {
    qr.src = `https://img.vietqr.io/image/${state.account.bank}-${state.account.number}-qr_only.png`;
    draw();
  }, [state.account.bank, state.account.number])

  useEffect(() => {
    bg.src = window.WPSFPath.assets + state.image;
    draw();
  }, [state.image])

  return (
    <div className="w-80 flex-none rounded-2xl overflow-hidden shadow-xl h-full">
      <canvas id="canvas" ref={canvas} width="100%" height="100%" />
    </div>
  )
}