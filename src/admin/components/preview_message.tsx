import { MessageContext, MessageContextType } from "@admin/store/message";
import { useContext, useEffect, useRef, useState } from "react";

export default function PreviewMessage() {
    const [bg, setBg] = useState(new Image());
    const { state } = useContext(MessageContext) as MessageContextType;
    const [size, setSize] = useState<{ width: number, height: number }>({ width: 0, height: 0 });
    const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
    const canvas = useRef<HTMLCanvasElement>(null);

    function draw() {
        console.log("Drawing...");

        if (context) {
            drawImage();
            drawText();
            drawWrapText(state.message, 20, 130);
        }
    };

    function drawImage() {
        context!.drawImage(
            bg, 0, 0,
            size.width,
            size.height
        );
    }

    function drawWrapText(text: string, x: number, y: number) {
        var words = text.split(' ');
        var line = '';
        var testWidth = 0;
        var lineHeight = 18;

        if (context) {
            context.fillStyle = "#000000";
            context.font = "bold 16px Lato";

            for (var i = 0; i < words.length; i++) {
                var testLine = line + words[i] + ' ';
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > size.width - 2 * x && i > 0) {
                    context.fillText(line, x, y);
                    line = words[i] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            context.fillText(line, x, y);
        }
    }

    function drawText() {
        if (context) {
            context.fillStyle = "#588a74";

            context.font = "bold 18px Lato";
            context.fillText("Người gửi: " + state.from, 20, 40);

            context.font = "bold 18px Lato";
            context.fillText("Người nhận: " + state.to, 20, 70);
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
    }, [state.from, state.to, state.message])

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