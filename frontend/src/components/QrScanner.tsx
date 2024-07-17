import { useState } from "react";
import { useZxing } from "react-zxing";

const QrScanner: React.FC = () => {
  const [result, setResult] = useState<string>("");

  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <video ref={ref} />
      <p>{result}</p>
    </div>
  );
};

export default QrScanner;
