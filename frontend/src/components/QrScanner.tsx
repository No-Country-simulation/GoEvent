import { Dispatch, useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { registerAttendance } from "../services";
import { closeIcon, errorGif, successGif } from "../utils";
import { SetStateAction } from "jotai";

interface QrScannerProps {
  eventId: string;
  closeScanner: Dispatch<SetStateAction<boolean>>;
}

const QrScanner: React.FC<QrScannerProps> = ({ eventId, closeScanner }) => {
  const [result, setResult] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isValidQr, setisValidQr] = useState<null | boolean>(null);

  const { ref } = useZxing({
    onDecodeResult(result) {
      setResult(result.getText());
    },
  });

  const verifyQr = async (eventId: string) => {
    if (!result) return;

    setLoading(true);
    let response;
    try {
      let { code } = JSON.parse(result);
      response = await registerAttendance(eventId, code);
    } catch (error) {
      console.error("Error on QR verification:", error);
      response = { success: false, error: error };
    }

    setisValidQr(response.success);
    setLoading(false);

    setTimeout(() => setisValidQr(null), 2000);
    setResult("");
  };

  useEffect(() => {
    verifyQr(eventId);
  }, [result]);
  return (
    <div className="fixed inset-0 top-0 mx-4 flex items-center justify-center">
      <div className="degradado z-50 flex h-full max-h-[600px] w-full max-w-[800px] flex-col items-center rounded-xl">
        <div className="flex w-full items-center justify-between px-8 py-3 text-2xl font-semibold">
          <h3>Escanear QR</h3>
          <button onClick={() => closeScanner(false)}>
            <img src={closeIcon} alt="close" />
          </button>
        </div>
        <div className="m-10 mb-5 h-full max-h-[300px] max-w-[400px] overflow-hidden rounded-xl">
          <video ref={ref} />
        </div>
        <div className="my-5 max-w-72 text-center text-2xl font-semibold">
          {loading ? (
            <p>Verificando...</p>
          ) : isValidQr === true ? (
            <>
              <p className="text-green-800">Qr Valido</p>
              <img src={successGif} alt="" />
            </>
          ) : isValidQr === false ? (
            <>
              <p className="-mb-5 text-red-800">Qr Invalido</p>
              <img src={errorGif} alt="" />
            </>
          ) : (
            <p>Esperando validacion</p>
          )}
        </div>
      </div>

      <div className="fixed inset-0 z-40 bg-black opacity-10"></div>
    </div>
  );
};

export default QrScanner;
