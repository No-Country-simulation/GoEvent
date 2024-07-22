import { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { register, registerAttendance } from "../services";

const QrScanner: React.FC<{ eventId: string }> = ({ eventId }) => {
  const [result, setResult] = useState<string>("");

  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  const verifyQr = async (eventId: string) => {
    if (!result) return;

    let { code } = JSON.parse(result);
    let response = await registerAttendance(eventId, code);
    console.log(code);
  };

  useEffect(() => {
    verifyQr(eventId);
  }, [result]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center">
      <video ref={ref} />
      <p>{result}</p>
    </div>
  );
};

export default QrScanner;
