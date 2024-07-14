import { QrReader } from "@blackbox-vision/react-qr-reader";
import { useState } from "react";

const QrScanner: React.FC = () => {
  const [qrData, setQrData] = useState<string | null>(null);

  const handleScan = (result: string | null) => {
    if (result) setQrData(result);
  };
  const handleError = (error: any) => {
    console.error(error);
  };
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div>
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result, error) => {
            if (result) handleScan(result.getText());
            if (error) handleError(error);
          }}
          className="h-[400px] w-[400px]"
        />
        <p>{qrData}</p>
      </div>
    </div>
  );
};

export default QrScanner;
