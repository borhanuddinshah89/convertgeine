"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import QRCode from "qrcode";
import ToolSeoSection from "@/components/ToolSeoSection";
import RelatedTools from "@/components/RelatedTools";

type QrType = "text" | "url" | "wifi" | "email" | "phone";
type ErrorLevel = "L" | "M" | "Q" | "H";
type WifiSecurity = "WPA" | "WEP" | "nopass";

function escapeWifi(value: string) {
  return value.replace(/([\\;,":])/g, "\\$1");
}

export default function QrCodeGeneratorPage() {
  const [qrType, setQrType] = useState<QrType>("url");

  const [text, setText] = useState("");
  const [url, setUrl] = useState("https://");
  const [email, setEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [phone, setPhone] = useState("");

  const [wifiName, setWifiName] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] =
    useState<WifiSecurity>("WPA");
  const [wifiHidden, setWifiHidden] = useState(false);

  const [size, setSize] = useState(320);
  const [margin, setMargin] = useState(2);
  const [errorLevel, setErrorLevel] =
    useState<ErrorLevel>("M");
  const [darkColor, setDarkColor] = useState("#000000");
  const [lightColor, setLightColor] = useState("#ffffff");

  const [qrImage, setQrImage] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const qrValue = useMemo(() => {
    if (qrType === "text") {
      return text.trim();
    }

    if (qrType === "url") {
      const cleanUrl = url.trim();

      if (!cleanUrl) return "";

      if (
        cleanUrl.startsWith("http://") ||
        cleanUrl.startsWith("https://")
      ) {
        return cleanUrl;
      }

      return `https://${cleanUrl}`;
    }

    if (qrType === "email") {
      if (!email.trim()) return "";

      const parameters = new URLSearchParams();

      if (emailSubject.trim()) {
        parameters.set("subject", emailSubject.trim());
      }

      if (emailBody.trim()) {
        parameters.set("body", emailBody.trim());
      }

      const query = parameters.toString();

      return `mailto:${email.trim()}${query ? `?${query}` : ""}`;
    }

    if (qrType === "phone") {
      if (!phone.trim()) return "";

      return `tel:${phone.trim().replace(/\s+/g, "")}`;
    }

    if (!wifiName.trim()) return "";

    return [
      "WIFI:",
      `T:${wifiSecurity};`,
      `S:${escapeWifi(wifiName.trim())};`,
      wifiSecurity === "nopass"
        ? ""
        : `P:${escapeWifi(wifiPassword)};`,
      `H:${wifiHidden ? "true" : "false"};`,
      ";",
    ].join("");
  }, [
    qrType,
    text,
    url,
    email,
    emailSubject,
    emailBody,
    phone,
    wifiName,
    wifiPassword,
    wifiSecurity,
    wifiHidden,
  ]);

  function resetResult() {
    setQrImage("");
    setMessage("");
  }

  async function generateQrCode() {
    if (!qrValue) {
      setMessage("Please enter the information for your QR code.");
      return;
    }

    setLoading(true);
    setMessage("Generating your QR code...");

    try {
      const image = await QRCode.toDataURL(qrValue, {
        type: "image/png",
        width: size,
        margin,
        errorCorrectionLevel: errorLevel,
        color: {
          dark: `${darkColor}ff`,
          light: `${lightColor}ff`,
        },
      });

      setQrImage(image);
      setMessage("Your QR code is ready.");
    } catch (error) {
      setQrImage("");
      setMessage(
        error instanceof Error
          ? error.message
          : "The QR code could not be generated."
      );
    } finally {
      setLoading(false);
    }
  }

  function downloadQrCode() {
    if (!qrImage) return;

    const link = document.createElement("a");
    link.href = qrImage;
    link.download = `convertgeine-${qrType}-qr-code.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-12 text-white sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="text-sm font-medium text-blue-400 hover:text-blue-300"
        >
          ← Back to home
        </Link>

        <section className="mt-8 overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
          <div className="border-b border-slate-800 px-6 py-8 text-center sm:px-10">
            <div className="text-5xl" aria-hidden="true">
              ▦
            </div>

            <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
              Free QR Code Generator
            </h1>

            <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-400">
              Create downloadable QR codes for websites, text, Wi-Fi,
              email addresses, and phone numbers.
            </p>
          </div>

          <div className="grid gap-8 p-6 lg:grid-cols-[1.2fr_0.8fr] lg:p-10">
            <div>
              <div>
                <p className="mb-3 text-sm font-semibold">
                  QR code type
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
                  {(
                    [
                      ["url", "URL"],
                      ["text", "Text"],
                      ["wifi", "Wi-Fi"],
                      ["email", "Email"],
                      ["phone", "Phone"],
                    ] as [QrType, string][]
                  ).map(([type, label]) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => {
                        setQrType(type);
                        resetResult();
                      }}
                      className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${
                        qrType === type
                          ? "border-blue-500 bg-blue-500/10 text-blue-300"
                          : "border-slate-700 bg-slate-950 text-slate-300 hover:border-slate-500"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-8">
                {qrType === "url" && (
                  <div>
                    <label
                      htmlFor="qr-url"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Website address
                    </label>

                    <input
                      id="qr-url"
                      type="text"
                      value={url}
                      onChange={(event) => {
                        setUrl(event.target.value);
                        resetResult();
                      }}
                      placeholder="https://example.com"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                {qrType === "text" && (
                  <div>
                    <label
                      htmlFor="qr-text"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Text
                    </label>

                    <textarea
                      id="qr-text"
                      value={text}
                      onChange={(event) => {
                        setText(event.target.value);
                        resetResult();
                      }}
                      placeholder="Enter the text to place in your QR code"
                      rows={6}
                      className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                {qrType === "phone" && (
                  <div>
                    <label
                      htmlFor="qr-phone"
                      className="mb-2 block text-sm font-semibold"
                    >
                      Phone number
                    </label>

                    <input
                      id="qr-phone"
                      type="tel"
                      value={phone}
                      onChange={(event) => {
                        setPhone(event.target.value);
                        resetResult();
                      }}
                      placeholder="+1 204 555 1234"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none focus:border-blue-500"
                    />
                  </div>
                )}

                {qrType === "email" && (
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="qr-email"
                        className="mb-2 block text-sm font-semibold"
                      >
                        Email address
                      </label>

                      <input
                        id="qr-email"
                        type="email"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value);
                          resetResult();
                        }}
                        placeholder="name@example.com"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="qr-email-subject"
                        className="mb-2 block text-sm font-semibold"
                      >
                        Subject — optional
                      </label>

                      <input
                        id="qr-email-subject"
                        type="text"
                        value={emailSubject}
                        onChange={(event) => {
                          setEmailSubject(event.target.value);
                          resetResult();
                        }}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="qr-email-body"
                        className="mb-2 block text-sm font-semibold"
                      >
                        Message — optional
                      </label>

                      <textarea
                        id="qr-email-body"
                        value={emailBody}
                        onChange={(event) => {
                          setEmailBody(event.target.value);
                          resetResult();
                        }}
                        rows={4}
                        className="w-full resize-y rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>
                )}

                {qrType === "wifi" && (
                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="wifi-name"
                        className="mb-2 block text-sm font-semibold"
                      >
                        Wi-Fi network name
                      </label>

                      <input
                        id="wifi-name"
                        type="text"
                        value={wifiName}
                        onChange={(event) => {
                          setWifiName(event.target.value);
                          resetResult();
                        }}
                        placeholder="Network name"
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none focus:border-blue-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="wifi-security"
                        className="mb-2 block text-sm font-semibold"
                      >
                        Security
                      </label>

                      <select
                        id="wifi-security"
                        value={wifiSecurity}
                        onChange={(event) => {
                          setWifiSecurity(
                            event.target.value as WifiSecurity
                          );
                          resetResult();
                        }}
                        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
                      >
                        <option value="WPA">WPA / WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">No password</option>
                      </select>
                    </div>

                    {wifiSecurity !== "nopass" && (
                      <div>
                        <label
                          htmlFor="wifi-password"
                          className="mb-2 block text-sm font-semibold"
                        >
                          Wi-Fi password
                        </label>

                        <input
                          id="wifi-password"
                          type="text"
                          value={wifiPassword}
                          onChange={(event) => {
                            setWifiPassword(event.target.value);
                            resetResult();
                          }}
                          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4 outline-none focus:border-blue-500"
                        />
                      </div>
                    )}

                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-700 bg-slate-950 px-4 py-4">
                      <input
                        type="checkbox"
                        checked={wifiHidden}
                        onChange={(event) => {
                          setWifiHidden(event.target.checked);
                          resetResult();
                        }}
                        className="h-5 w-5"
                      />

                      <span className="text-sm font-semibold text-slate-300">
                        Hidden Wi-Fi network
                      </span>
                    </label>
                  </div>
                )}
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="qr-size"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Image size
                  </label>

                  <select
                    id="qr-size"
                    value={size}
                    onChange={(event) => {
                      setSize(Number(event.target.value));
                      resetResult();
                    }}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
                  >
                    <option value="240">240 × 240 px</option>
                    <option value="320">320 × 320 px</option>
                    <option value="512">512 × 512 px</option>
                    <option value="800">800 × 800 px</option>
                    <option value="1200">1200 × 1200 px</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="qr-error"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Error correction
                  </label>

                  <select
                    id="qr-error"
                    value={errorLevel}
                    onChange={(event) => {
                      setErrorLevel(event.target.value as ErrorLevel);
                      resetResult();
                    }}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-4"
                  >
                    <option value="L">Low</option>
                    <option value="M">Medium</option>
                    <option value="Q">Quartile</option>
                    <option value="H">High</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="qr-dark"
                    className="mb-2 block text-sm font-semibold"
                  >
                    QR colour
                  </label>

                  <input
                    id="qr-dark"
                    type="color"
                    value={darkColor}
                    onChange={(event) => {
                      setDarkColor(event.target.value);
                      resetResult();
                    }}
                    className="h-14 w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-950 p-2"
                  />
                </div>

                <div>
                  <label
                    htmlFor="qr-light"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Background colour
                  </label>

                  <input
                    id="qr-light"
                    type="color"
                    value={lightColor}
                    onChange={(event) => {
                      setLightColor(event.target.value);
                      resetResult();
                    }}
                    className="h-14 w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-950 p-2"
                  />
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="qr-margin"
                    className="text-sm font-semibold"
                  >
                    White-space margin
                  </label>

                  <span className="text-sm text-slate-400">
                    {margin}
                  </span>
                </div>

                <input
                  id="qr-margin"
                  type="range"
                  min="0"
                  max="8"
                  step="1"
                  value={margin}
                  onChange={(event) => {
                    setMargin(Number(event.target.value));
                    resetResult();
                  }}
                  className="mt-4 w-full"
                />
              </div>

              <button
                type="button"
                onClick={generateQrCode}
                disabled={loading}
                className="mt-8 w-full rounded-xl bg-blue-600 py-4 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                {loading ? "Generating..." : "Generate QR Code"}
              </button>

              {message && (
                <p
                  className="mt-5 rounded-xl border border-slate-700 bg-slate-950/50 px-4 py-3 text-center text-sm text-slate-300"
                  aria-live="polite"
                >
                  {message}
                </p>
              )}
            </div>

            <div>
              <div className="flex min-h-[390px] items-center justify-center rounded-2xl border border-slate-700 bg-slate-950/50 p-6">
                {qrImage ? (
                  <img
                    src={qrImage}
                    alt="Generated QR code preview"
                    width={size}
                    height={size}
                    className="h-auto max-w-full rounded-xl"
                  />
                ) : (
                  <div className="text-center">
                    <div className="text-7xl text-slate-600">▦</div>

                    <h2 className="mt-5 text-xl font-bold">
                      QR code preview
                    </h2>

                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Enter your information and generate a QR code.
                    </p>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={downloadQrCode}
                disabled={!qrImage}
                className="mt-5 w-full rounded-xl border border-emerald-700 bg-emerald-950/30 py-4 font-semibold text-emerald-300 transition hover:bg-emerald-950/50 disabled:cursor-not-allowed disabled:border-slate-700 disabled:bg-slate-800 disabled:text-slate-500"
              >
                Download PNG
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-slate-500">
                QR code generation happens directly in your browser.
              </p>
            </div>
          </div>
        </section>

        <ToolSeoSection
          tool="QR Code Generator"
          description="Create QR codes for text, website links, Wi-Fi networks, email addresses, and phone numbers. Customize the size, colours, margin, and error-correction level before downloading a PNG image."
          steps={[
            "Choose the QR code type you need.",
            "Enter the website, text, Wi-Fi, email, or phone information.",
            "Select the size, colours, and error-correction level.",
            "Generate and download the QR code as a PNG image.",
          ]}
          benefits={[
            "Create multiple types of QR codes from one tool.",
            "Customize QR code colours and image size.",
            "Generate Wi-Fi QR codes for easier network sharing.",
            "No registration is required.",
          ]}
        />

        <RelatedTools
          title="Related Tools"
          tools={[
            { name: "Image Compressor", href: "/image-compressor" },
            { name: "Image Resizer", href: "/image-resizer" },
            { name: "WebP Converter", href: "/webp-converter" },
            { name: "JPG to PDF", href: "/jpg-to-pdf" },
          ]}
        />
      </div>
    </main>
  );
}
