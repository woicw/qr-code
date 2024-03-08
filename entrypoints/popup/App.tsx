import { useEffect, useRef, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { CopyToClipboard } from "react-copy-to-clipboard";

import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      setUrl(tabs[0].url!);
    });
  }, []);
  useEffect(() => {
    url && ref.current?.select();
  }, [url]);

  return (
    <>
      <div className="qr-code-title">扫描二维码</div>
      <div className="qr-code-svg">
        <QRCodeSVG
          size={200}
          value={url}
          imageSettings={{
            src: "/maliao.svg",
            width: 24,
            height: 24,
            excavate: true,
          }}
        />
      </div>
      <div className="qr-code-input-container">
        <input
          ref={ref}
          className="qr-code-input"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        ></input>
        <CopyToClipboard text={url}>
          <button className="qr-code-button">复制</button>
        </CopyToClipboard>
      </div>
    </>
  );
}

export default App;
