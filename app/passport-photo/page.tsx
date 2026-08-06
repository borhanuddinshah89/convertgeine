"use client";

import Link from "next/link";
import ToolSeoSection from "@/components/ToolSeoSection";
import {
  ChangeEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  FaceDetector,
  FilesetResolver,
} from "@mediapipe/tasks-vision";

type PhotoPreset = {
  id: string;
  name: string;
  description: string;
  width: number;
  height: number;
  physicalHeightMm?: number;
  targetHeadRatio: number;
  canadianHeadCheck?: boolean;
};

type FaceBox = {
  originX: number;
  originY: number;
  width: number;
  height: number;
};

const presets: PhotoPreset[] = [
  {
    id: "canada-print",
    name: "Canada Passport / PR Print",
    description: "50 × 70 mm at 300 DPI",
    width: 591,
    height: 827,
    physicalHeightMm: 70,
    targetHeadRatio: 33.5 / 70,
    canadianHeadCheck: true,
  },
  {
    id: "canada-digital",
    name: "Canada Passport Digital",
    description: "1200 × 1800 pixels",
    width: 1200,
    height: 1800,
    targetHeadRatio: 0.48,
  },
  {
    id: "standard-35x45",
    name: "Standard Passport Photo",
    description: "35 × 45 mm at 300 DPI",
    width: 413,
    height: 531,
    physicalHeightMm: 45,
    targetHeadRatio: 0.68,
  },
  {
    id: "us-passport",
    name: "US Passport Photo",
    description: "2 × 2 inches at 300 DPI",
    width: 600,
    height: 600,
    physicalHeightMm: 50.8,
    targetHeadRatio: 0.55,
  },
  {
    id: "bangladesh-passport",
    name: "Bangladesh Passport Photo",
    description: "45 × 55 mm at 300 DPI",
    width: 531,
    height: 650,
    physicalHeightMm: 55,
    targetHeadRatio: 0.58,
  },
];

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

export default function PassportPhotoPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const detectorRef = useRef<FaceDetector | null>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const [presetId, setPresetId] =
    useState("canada-print");

  const [zoom, setZoom] = useState(1);
  const [horizontalPosition, setHorizontalPosition] =
    useState(50);
  const [verticalPosition, setVerticalPosition] =
    useState(50);

  const [quality, setQuality] = useState(0.92);
  const [showGuide, setShowGuide] = useState(true);

  const [faceBox, setFaceBox] =
    useState<FaceBox | null>(null);

  const [detectingFace, setDetectingFace] =
    useState(false);

  const [detectorReady, setDetectorReady] =
    useState(false);

  const [detectionMessage, setDetectionMessage] =
    useState("Loading automatic face detector...");

  const [message, setMessage] = useState("");

  const selectedPreset = useMemo(
    () =>
      presets.find(
        (preset) => preset.id === presetId
      ) ?? presets[0],
    [presetId]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadDetector() {
      try {
        const vision =
          await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
          );

        const detector =
          await FaceDetector.createFromOptions(
            vision,
            {
              baseOptions: {
                modelAssetPath:
                  "https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/latest/blaze_face_short_range.tflite",
              },
              runningMode: "IMAGE",
              minDetectionConfidence: 0.5,
            }
          );

        if (cancelled) {
          detector.close();
          return;
        }

        detectorRef.current = detector;
        setDetectorReady(true);
        setDetectionMessage(
          "Automatic face detection is ready."
        );
      } catch (error) {
        console.error(
          "Face detector failed to load:",
          error
        );

        setDetectionMessage(
          "Automatic detection could not load. Manual controls are still available."
        );
      }
    }

    loadDetector();

    return () => {
      cancelled = true;

      detectorRef.current?.close();
      detectorRef.current = null;
    };
  }, []);

  function chooseImage(
    event: ChangeEvent<HTMLInputElement>
  ) {
    const selectedFile =
      event.target.files?.[0] ?? null;

    if (!selectedFile) return;

    const lowerName =
      selectedFile.name.toLowerCase();

    const supported =
      selectedFile.type === "image/jpeg" ||
      selectedFile.type === "image/png" ||
      lowerName.endsWith(".jpg") ||
      lowerName.endsWith(".jpeg") ||
      lowerName.endsWith(".png");

    if (!supported) {
      setMessage(
        "Please choose a JPG or PNG image."
      );
      return;
    }

    if (selectedFile.size > 15 * 1024 * 1024) {
      setMessage(
        "The image must be smaller than 15 MB."
      );
      return;
    }

    if (imageUrl) {
      URL.revokeObjectURL(imageUrl);
    }

    const newImageUrl =
      URL.createObjectURL(selectedFile);

    setImageFile(selectedFile);
    setImageUrl(newImageUrl);
    setFaceBox(null);

    setZoom(1);
    setHorizontalPosition(50);
    setVerticalPosition(50);

    setMessage("");
    setDetectionMessage(
      detectorReady
        ? "Preparing automatic face detection..."
        : "Photo loaded. Automatic detection is still loading."
    );

    event.target.value = "";
  }

  useEffect(() => {
    if (!imageUrl) {
      imageRef.current = null;
      return;
    }

    const image = new Image();

    image.onload = async () => {
      imageRef.current = image;
      drawPhoto();

      if (detectorRef.current) {
        await detectAndPositionFace(image);
      }
    };

    image.onerror = () => {
      setMessage(
        "The selected image could not be loaded."
      );
    };

    image.src = imageUrl;

    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [imageUrl]);

  useEffect(() => {
    if (
      detectorReady &&
      imageRef.current &&
      !faceBox
    ) {
      detectAndPositionFace(imageRef.current);
    }
  }, [detectorReady]);

  useEffect(() => {
    drawPhoto();
  }, [
    selectedPreset,
    zoom,
    horizontalPosition,
    verticalPosition,
  ]);

  useEffect(() => {
    if (faceBox && imageRef.current) {
      autoPositionFace(faceBox);
    }
  }, [presetId]);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  async function detectAndPositionFace(
    image: HTMLImageElement
  ) {
    const detector = detectorRef.current;

    if (!detector) {
      setDetectionMessage(
        "Automatic detector is not ready. Use the manual controls."
      );
      return;
    }

    setDetectingFace(true);
    setDetectionMessage("Detecting face...");

    try {
      const result = detector.detect(image);
      const detections = result.detections;

      if (detections.length === 0) {
        setFaceBox(null);

        setDetectionMessage(
          "No face was detected. Use the manual zoom and position controls."
        );

        return;
      }

      if (detections.length > 1) {
        setDetectionMessage(
          "Multiple faces were detected. The largest face was selected."
        );
      }

      const largestDetection =
        [...detections].sort((first, second) => {
          const firstBox = first.boundingBox;
          const secondBox = second.boundingBox;

          if (!firstBox || !secondBox) return 0;

          return (
            secondBox.width * secondBox.height -
            firstBox.width * firstBox.height
          );
        })[0];

      const boundingBox =
        largestDetection.boundingBox;

      if (!boundingBox) {
        setFaceBox(null);

        setDetectionMessage(
          "Face detected, but its position could not be measured."
        );

        return;
      }

      const detectedFace: FaceBox = {
        originX: boundingBox.originX,
        originY: boundingBox.originY,
        width: boundingBox.width,
        height: boundingBox.height,
      };

      setFaceBox(detectedFace);
      autoPositionFace(detectedFace);

      setDetectionMessage(
        detections.length > 1
          ? "Multiple faces found. The largest face was automatically centred."
          : "Face detected and automatically centred."
      );
    } catch (error) {
      console.error(
        "Face detection failed:",
        error
      );

      setFaceBox(null);

      setDetectionMessage(
        "Automatic detection failed. Use the manual controls."
      );
    } finally {
      setDetectingFace(false);
    }
  }

  function autoPositionFace(
    detectedFace: FaceBox
  ) {
    const image = imageRef.current;

    if (!image) return;

    const canvasWidth =
      selectedPreset.width;

    const canvasHeight =
      selectedPreset.height;

    const baseScale = Math.max(
      canvasWidth / image.naturalWidth,
      canvasHeight / image.naturalHeight
    );

    /*
      FaceDetector gives a facial bounding box rather than
      an exact chin-to-crown measurement.

      Multiplying the detected box by approximately 1.32
      estimates the complete head height.
    */
    const estimatedOriginalHeadHeight =
      detectedFace.height * 1.32;

    const desiredDisplayedHeadHeight =
      canvasHeight *
      selectedPreset.targetHeadRatio;

    const desiredFinalScale =
      desiredDisplayedHeadHeight /
      estimatedOriginalHeadHeight;

    const calculatedZoom =
      desiredFinalScale / baseScale;

    const safeZoom = clamp(
      calculatedZoom,
      1,
      3
    );

    const finalScale =
      baseScale * safeZoom;

    const drawWidth =
      image.naturalWidth * finalScale;

    const drawHeight =
      image.naturalHeight * finalScale;

    const horizontalOverflow = Math.max(
      0,
      drawWidth - canvasWidth
    );

    const verticalOverflow = Math.max(
      0,
      drawHeight - canvasHeight
    );

    const faceCentreX =
      detectedFace.originX +
      detectedFace.width / 2;

    const faceCentreY =
      detectedFace.originY +
      detectedFace.height / 2;

    const desiredFaceCentreX =
      canvasWidth / 2;

    const desiredFaceCentreY =
      canvasHeight * 0.43;

    const desiredDrawX =
      desiredFaceCentreX -
      faceCentreX * finalScale;

    const desiredDrawY =
      desiredFaceCentreY -
      faceCentreY * finalScale;

    const horizontalPercent =
      horizontalOverflow > 0
        ? clamp(
            (-desiredDrawX /
              horizontalOverflow) *
              100,
            0,
            100
          )
        : 50;

    const verticalPercent =
      verticalOverflow > 0
        ? clamp(
            (-desiredDrawY /
              verticalOverflow) *
              100,
            0,
            100
          )
        : 50;

    setZoom(
      Number(safeZoom.toFixed(2))
    );

    setHorizontalPosition(
      Math.round(horizontalPercent)
    );

    setVerticalPosition(
      Math.round(verticalPercent)
    );
  }

  function drawPhoto() {
    const canvas = canvasRef.current;
    const image = imageRef.current;

    if (!canvas || !image) return;

    const context =
      canvas.getContext("2d");

    if (!context) return;

    canvas.width =
      selectedPreset.width;

    canvas.height =
      selectedPreset.height;

    context.fillStyle = "#ffffff";

    context.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    const coverScale = Math.max(
      canvas.width / image.naturalWidth,
      canvas.height / image.naturalHeight
    );

    const finalScale =
      coverScale * zoom;

    const drawWidth =
      image.naturalWidth * finalScale;

    const drawHeight =
      image.naturalHeight * finalScale;

    const horizontalOverflow = Math.max(
      0,
      drawWidth - canvas.width
    );

    const verticalOverflow = Math.max(
      0,
      drawHeight - canvas.height
    );

    const x =
      -horizontalOverflow *
      (horizontalPosition / 100);

    const y =
      -verticalOverflow *
      (verticalPosition / 100);

    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";

    context.drawImage(
      image,
      x,
      y,
      drawWidth,
      drawHeight
    );
  }

  const estimatedHeadMeasurement =
    useMemo(() => {
      const image = imageRef.current;

      if (
        !faceBox ||
        !image ||
        !selectedPreset.physicalHeightMm
      ) {
        return null;
      }

      const baseScale = Math.max(
        selectedPreset.width /
          image.naturalWidth,
        selectedPreset.height /
          image.naturalHeight
      );

      const finalScale =
        baseScale * zoom;

      const estimatedHeadPixels =
        faceBox.height *
        1.32 *
        finalScale;

      return (
        (estimatedHeadPixels /
          selectedPreset.height) *
        selectedPreset.physicalHeightMm
      );
    }, [
      faceBox,
      selectedPreset,
      zoom,
    ]);

  const canadianHeadStatus =
    useMemo(() => {
      if (
        !selectedPreset.canadianHeadCheck ||
        estimatedHeadMeasurement === null
      ) {
        return null;
      }

      if (
        estimatedHeadMeasurement >= 31 &&
        estimatedHeadMeasurement <= 36
      ) {
        return {
          valid: true,
          text:
            "Estimated head height is within the 31–36 mm Canadian range.",
        };
      }

      if (estimatedHeadMeasurement < 31) {
        return {
          valid: false,
          text:
            "Estimated head height is too small. Increase the zoom.",
        };
      }

      return {
        valid: false,
        text:
          "Estimated head height is too large. Reduce the zoom.",
      };
    }, [
      estimatedHeadMeasurement,
      selectedPreset,
    ]);

  function downloadPhoto() {
    const canvas = canvasRef.current;

    if (!canvas || !imageFile) {
      setMessage(
        "Please choose an image first."
      );
      return;
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          setMessage(
            "The photo could not be created."
          );
          return;
        }

        const url =
          URL.createObjectURL(blob);

        const link =
          document.createElement("a");

        link.href = url;

        link.download =
          `${presetId}-photo.jpg`;

        document.body.appendChild(link);

        link.click();
        link.remove();

        URL.revokeObjectURL(url);

        setMessage(
          "Your clean passport-size JPG was downloaded."
        );
      },
      "image/jpeg",
      quality
    );
  }

  function resetPhoto() {
    setZoom(1);
    setHorizontalPosition(50);
    setVerticalPosition(50);
    setQuality(0.92);
    setMessage("");
  }

  async function runAutomaticPositioning() {
    if (!imageRef.current) {
      setMessage(
        "Please upload a photo first."
      );
      return;
    }

    await detectAndPositionFace(
      imageRef.current
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          ← Back to Home
        </Link>

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900 p-6 shadow-2xl sm:p-8">
          <div className="text-center">
            <div className="text-6xl">
              📸
            </div>

            <h1 className="mt-5 text-4xl font-bold sm:text-5xl">
              Passport Photo Converter
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-slate-400">
              Automatically detect, centre and
              resize a face for common passport
              and immigration photo sizes.
            </p>
          </div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <section className="space-y-6">
              <div>
                <label
                  htmlFor="photo-upload"
                  className="block text-sm font-semibold text-slate-300"
                >
                  Upload photo
                </label>

                <input
                  id="photo-upload"
                  type="file"
                  accept="image/jpeg,image/png,.jpg,.jpeg,.png"
                  onChange={chooseImage}
                  className="mt-3 block w-full rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm text-slate-300 file:mr-4 file:rounded-lg file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:font-semibold file:text-white"
                />
              </div>

              <div
                className={`rounded-xl border p-4 ${
                  detectorReady
                    ? "border-emerald-500/30 bg-emerald-500/10"
                    : "border-amber-500/30 bg-amber-500/10"
                }`}
              >
                <p
                  className={`text-sm ${
                    detectorReady
                      ? "text-emerald-200"
                      : "text-amber-200"
                  }`}
                >
                  {detectingFace
                    ? "Detecting face..."
                    : detectionMessage}
                </p>
              </div>

              <button
                type="button"
                onClick={runAutomaticPositioning}
                disabled={
                  !imageFile ||
                  !detectorReady ||
                  detectingFace
                }
                className="w-full rounded-xl bg-emerald-600 px-5 py-4 font-semibold transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
              >
                {detectingFace
                  ? "Detecting Face..."
                  : "Auto Detect and Centre Face"}
              </button>

              <div>
                <label
                  htmlFor="preset"
                  className="block text-sm font-semibold text-slate-300"
                >
                  Photo size
                </label>

                <select
                  id="preset"
                  value={presetId}
                  onChange={(event) =>
                    setPresetId(
                      event.target.value
                    )
                  }
                  className="mt-3 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 text-white outline-none focus:border-blue-500"
                >
                  {presets.map((preset) => (
                    <option
                      key={preset.id}
                      value={preset.id}
                    >
                      {preset.name}
                    </option>
                  ))}
                </select>

                <p className="mt-2 text-sm text-slate-500">
                  {selectedPreset.description}
                  {" · "}
                  {selectedPreset.width}
                  {" × "}
                  {selectedPreset.height}
                  {" pixels"}
                </p>
              </div>

              {estimatedHeadMeasurement !==
                null && (
                <div className="rounded-xl border border-slate-700 bg-slate-950 p-5">
                  <p className="text-sm text-slate-400">
                    Estimated chin-to-crown
                    height
                  </p>

                  <p className="mt-2 text-3xl font-bold">
                    {estimatedHeadMeasurement.toFixed(
                      1
                    )}{" "}
                    mm
                  </p>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    This is an estimate based on
                    the detected facial box, not
                    an official biometric
                    measurement.
                  </p>
                </div>
              )}

              {canadianHeadStatus && (
                <div
                  className={`rounded-xl border p-5 ${
                    canadianHeadStatus.valid
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-200"
                      : "border-red-500/30 bg-red-500/10 text-red-200"
                  }`}
                >
                  <p className="font-semibold">
                    {canadianHeadStatus.valid
                      ? "✓ Estimated size is acceptable"
                      : "⚠ Adjustment recommended"}
                  </p>

                  <p className="mt-2 text-sm">
                    {canadianHeadStatus.text}
                  </p>
                </div>
              )}

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="zoom"
                    className="text-sm font-semibold text-slate-300"
                  >
                    Zoom
                  </label>

                  <span className="text-sm text-slate-400">
                    {zoom.toFixed(2)}×
                  </span>
                </div>

                <input
                  id="zoom"
                  type="range"
                  min="1"
                  max="3"
                  step="0.01"
                  value={zoom}
                  onChange={(event) =>
                    setZoom(
                      Number(
                        event.target.value
                      )
                    )
                  }
                  className="mt-3 w-full"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="horizontal-position"
                    className="text-sm font-semibold text-slate-300"
                  >
                    Horizontal position
                  </label>

                  <span className="text-sm text-slate-400">
                    {horizontalPosition}%
                  </span>
                </div>

                <input
                  id="horizontal-position"
                  type="range"
                  min="0"
                  max="100"
                  value={horizontalPosition}
                  onChange={(event) =>
                    setHorizontalPosition(
                      Number(
                        event.target.value
                      )
                    )
                  }
                  className="mt-3 w-full"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="vertical-position"
                    className="text-sm font-semibold text-slate-300"
                  >
                    Vertical position
                  </label>

                  <span className="text-sm text-slate-400">
                    {verticalPosition}%
                  </span>
                </div>

                <input
                  id="vertical-position"
                  type="range"
                  min="0"
                  max="100"
                  value={verticalPosition}
                  onChange={(event) =>
                    setVerticalPosition(
                      Number(
                        event.target.value
                      )
                    )
                  }
                  className="mt-3 w-full"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="quality"
                    className="text-sm font-semibold text-slate-300"
                  >
                    JPG quality
                  </label>

                  <span className="text-sm text-slate-400">
                    {Math.round(
                      quality * 100
                    )}
                    %
                  </span>
                </div>

                <input
                  id="quality"
                  type="range"
                  min="0.5"
                  max="1"
                  step="0.01"
                  value={quality}
                  onChange={(event) =>
                    setQuality(
                      Number(
                        event.target.value
                      )
                    )
                  }
                  className="mt-3 w-full"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-4">
                <input
                  type="checkbox"
                  checked={showGuide}
                  onChange={(event) =>
                    setShowGuide(
                      event.target.checked
                    )
                  }
                  className="h-5 w-5"
                />

                <span className="text-sm font-semibold text-slate-300">
                  Show preview positioning guide
                </span>
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={resetPhoto}
                  className="rounded-xl border border-slate-700 bg-slate-800 px-5 py-4 font-semibold hover:bg-slate-700"
                >
                  Reset Position
                </button>

                <button
                  type="button"
                  onClick={downloadPhoto}
                  disabled={!imageFile}
                  className="rounded-xl bg-blue-600 px-5 py-4 font-semibold hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
                >
                  Download Clean JPG
                </button>
              </div>
            </section>

            <section>
              <div className="flex min-h-[500px] items-center justify-center rounded-2xl border border-slate-800 bg-slate-950/60 p-6">
                {imageFile ? (
                  <div className="w-full text-center">
                    <div className="mx-auto max-h-[650px] max-w-full overflow-auto">
                      <div className="relative mx-auto w-fit overflow-hidden border border-slate-700 bg-white shadow-xl">
                        <canvas
                          ref={canvasRef}
                          className="block max-h-[600px] max-w-full"
                        />

                        {showGuide && (
                          <div className="pointer-events-none absolute inset-0">
                            <div className="absolute left-1/2 top-[17%] h-[58%] w-[56%] -translate-x-1/2 rounded-[50%] border-2 border-dashed border-blue-500" />

                            <div className="absolute bottom-0 left-1/2 top-0 w-px -translate-x-1/2 bg-white/80" />

                            <div className="absolute left-[8%] right-[8%] top-[43%] h-px bg-white/60" />
                          </div>
                        )}
                      </div>
                    </div>

                    <p className="mt-4 text-sm text-slate-500">
                      Guides are visible only in
                      the preview and are never
                      added to the downloaded
                      photo.
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-7xl">
                      🧑
                    </div>

                    <h2 className="mt-5 text-2xl font-bold">
                      Photo preview
                    </h2>

                    <p className="mt-3 text-slate-500">
                      Upload a JPG or PNG image
                      to begin.
                    </p>
                  </div>
                )}
              </div>
            </section>
          </div>

          {message && (
            <p className="mt-6 rounded-xl bg-slate-950/70 px-4 py-3 text-center text-sm text-slate-300">
              {message}
            </p>
          )}

          <div className="mt-8 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-6">
            <h2 className="font-bold text-amber-200">
              Important official-photo notice
            </h2>

            <p className="mt-3 text-sm leading-7 text-amber-100/80">
              Automatic detection and head-size
              measurements are estimates only.
              This tool does not guarantee
              government acceptance. Do not
              digitally alter facial features or
              identifying details.
            </p>
          </div>
        </div>

        <ToolSeoSection
          tool="Passport Photo Maker"
          description="Crop and resize JPG or PNG photos using presets for Canadian, United States, Bangladesh, and standard passport-photo dimensions. Automatic face positioning helps prepare a cleaner preview, but official requirements must always be checked before submission."
          steps={[
            "Choose a JPG or PNG photo.",
            "Select the passport or document-photo preset you need.",
            "Adjust zoom and position, or use automatic face detection.",
            "Review the preview and download the finished JPG.",
          ]}
          benefits={[
            "Prepare common passport-photo dimensions from your own device.",
            "Use automatic face positioning with manual adjustment controls.",
            "Download a clean image without preview guides.",
            "Process the photo directly in your browser.",
          ]}
        />
      </div>
    </main>
  );
}
