import { useEffect, useState } from "react";
import { useZxing } from "react-zxing";
import { registerAttendance } from "../services";
import { closeIcon } from "../utils";

const QrScanner: React.FC<{ eventId: string }> = ({ eventId }) => {
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
    let { code } = JSON.parse(result);
    let response = await registerAttendance(eventId, code);
    setisValidQr(response.success);
    setLoading(false);
  };

  useEffect(() => {
    verifyQr(eventId);
    document.body.classList.add("no-scroll");
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [result]);
  console.log(isValidQr);
  return (
    <div className="fixed inset-0 top-0 mx-4 flex items-center justify-center">
      <div className="degradado z-50 flex h-full max-h-[600px] w-full max-w-[800px] flex-col items-center rounded-xl">
        <div className="flex w-full items-center justify-between px-8 py-3 text-2xl font-semibold">
          <h3>Escanear QR</h3>
          <button>
            <img src={closeIcon} alt="close" />
          </button>
        </div>
        <div className="m-10 max-w-[400px] overflow-hidden rounded-xl">
          <video ref={ref} />
        </div>
        <div>
          {loading && <p>Verificando...</p>}
          {!loading && isValidQr !== null && isValidQr ? (
            <p>QR verificado</p>
          ) : (
            <p>QR no valido</p>
          )}
        </div>
      </div>

      <div className="fixed inset-0 z-40 bg-black opacity-50"></div>
    </div>
  );
};

export default QrScanner;
