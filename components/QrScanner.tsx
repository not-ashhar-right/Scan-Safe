import { useEffect, useRef, useState } from 'react';
import jsQR from 'jsqr';

interface QrScannerProps {
  onToken: (token: string) => void;
  onClose?: () => void;
}

export function QrScanner({ onToken, onClose }: QrScannerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let stream: MediaStream | null = null;
    let frameHandle: number | null = null;

    function stop() {
      cancelled = true;
      if (frameHandle !== null && typeof window !== 'undefined') {
        window.clearTimeout(frameHandle);
      }
      if (stream) {
        stream.getTracks().forEach((t) => t.stop());
      }
    }

    async function start() {
      try {
        if (typeof window === 'undefined') return;

        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          throw new Error('Camera access is not supported in this browser');
        }

        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
        });

        const video = videoRef.current;
        if (!video) return;
        video.srcObject = stream;
        await video.play();

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const scanLoop = () => {
          if (cancelled || !video || video.readyState !== video.HAVE_ENOUGH_DATA) {
            frameHandle = window.setTimeout(scanLoop, 400);
            return;
          }

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          try {
            const result = jsQR(imageData.data, canvas.width, canvas.height);
            if (result && result.data) {
              onToken(result.data);
              if (onClose) {
                onClose();
              }
              stop();
              return;
            }
          } catch {
            // ignore decoding errors
          }

          frameHandle = window.setTimeout(scanLoop, 400);
        };

        scanLoop();
      } catch (e: any) {
        if (!cancelled) {
          setError(e?.message || 'Unable to access camera');
        }
      }
    }

    start();

    return () => {
      stop();
    };
  }, [onToken, onClose]);

  return (
    <div className="card card--subtle">
      <div className="scanner-header">
        <div>
          <h3 className="scanner-title">Scan QR with Camera</h3>
          <p className="scanner-subtitle">Align the QR code within the frame</p>
        </div>
        {onClose && (
          <button type="button" className="button button-secondary" onClick={onClose}>
            Close
          </button>
        )}
      </div>
      <div className="scanner-view">
        <video
          ref={videoRef}
          style={{ width: '100%', height: 'auto' }}
          muted
          playsInline
        />
        <div className="scanner-overlay" />
      </div>
      {error && <p className="text-error">{error}</p>}
    </div>
  );
}
