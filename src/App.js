import { useEffect, useState, useRef } from "react";
import Fabrictest from "./components/Fabrictest.js";

// canvas를 이용하면 우클릭으로 다운로드할때 canvas의 모든 내용(frame,text,image)들이 다운로드 된다.

function App() {
  const [image, setImage] = useState(null);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");

  const canvas = useRef(null);

  useEffect(() => {
    const catImage = new Image();
    catImage.src = "http://thiscatdoesnotexist.com/";
    catImage.onload = () => setImage(catImage);
  }, []);

  // 이미지가 변경될 때마다 이미지 상태 또는 캔버스가 참조할 수 있도록 캔버스 변경되면
  // DOM 을 얻어올수 있고, 여기서 Context도 받아 올수 있게 한다.
  useEffect(() => {
    if (image && canvas) {
      const ctx = canvas.current.getContext("2d");
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, 600, 512 + 80); // x,y가 0,0인곳에서 시작하고 너비400 높이 256+80 으로 설정
      ctx.drawImage(image, (600 - 512) / 2, 40); // 이미지의 xy x: (400-256)/2, y: 40

      ctx.font = "30px Roboto";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";

      ctx.strokeStyle = "white";
      ctx.strokeText(topText, 600 / 2, 25);
      ctx.fillText(bottomText, 600 / 2, 512 + 40 + 25);
    }
  }, [image, canvas, topText, bottomText]);

  return (
    <>
      <div>
        <h1>Cat Meme!</h1>

        <div>
          <canvas
            ref={canvas} // 참조를 가져와야 그릴수 있다, 해당 캔버스가 로드되면 이 캔버스에 참조로 설정하여 DOM 요소를 얻을 수 있다.
            width={600} // 256 x 256 이미지를 불러올 것인데 여유있게 준비하기
            height={512 + 80} //  256이미지 상하단에 40 픽셀씩 여유를 준비하기
          />
        </div>

        <div>
          <p>Image Top Text</p>
          <input
            type="text"
            value={topText}
            onChange={(e) => setTopText(e.target.value)}
          />
          <br />
          <p>Image Bottom Text</p>
          <input
            type="text"
            value={bottomText}
            onChange={(e) => setBottomText(e.target.value)}
          />
        </div>
        <br />
      </div>
      <div>
        <h1>Fabric.js 테스트</h1>
        <Fabrictest />
      </div>
    </>
  );
}

export default App;
