export type HomeTool = {
  title: string;
  description: string;
  icon: string;
  href: string;
};

export type HomeCategory = {
  id: string;
  title: string;
  description: string;
  icon: string;
  tools: HomeTool[];
};

export const categories: HomeCategory[] = [
  {
    id: "pdf-tools",
    title: "PDF Tools",
    description: "Compress, convert, organize and edit PDF documents.",
    icon: "📄",
    tools: [
      {
        title: "Compress PDF",
        description: "Reduce PDF file size for email and uploads.",
        icon: "🗜️",
        href: "/compress-pdf",
      },
      {
        title: "Merge PDF",
        description: "Combine multiple PDF files into one document.",
        icon: "📚",
        href: "/merge-pdf",
      },
      {
        title: "Split PDF",
        description: "Extract selected pages into a new PDF.",
        icon: "✂️",
        href: "/split-pdf",
      },
      {
        title: "Rotate PDF",
        description: "Rotate PDF pages by 90°, 180° or 270°.",
        icon: "🔄",
        href: "/rotate-pdf",
      },
      {
        title: "PDF to JPG",
        description: "Convert PDF pages into JPG images.",
        icon: "🖼️",
        href: "/pdf-to-jpg",
      },
      {
        title: "JPG to PDF",
        description: "Turn JPG and PNG images into a PDF.",
        icon: "📑",
        href: "/jpg-to-pdf",
      },
      {
        title: "PDF Editor",
        description: "Edit and organize PDF pages.",
        icon: "✏️",
        href: "/pdf-editor",
      },
    ],
  },

  {
    id: "image-tools",
    title: "Image Tools",
    description: "Resize, compress, convert and prepare images.",
    icon: "🖼️",
    tools: [
      {
        title: "Image Compressor",
        description: "Reduce JPG, PNG and WebP image size.",
        icon: "🗜️",
        href: "/image-compressor",
      },
      {
        title: "Image Resizer",
        description: "Resize images by width and height.",
        icon: "📐",
        href: "/image-resizer",
      },
      {
        title: "WebP Converter",
        description: "Convert between WebP, JPG and PNG.",
        icon: "🔁",
        href: "/webp-converter",
      },
      {
        title: "HEIC to JPG",
        description: "Convert iPhone HEIC photos to JPG.",
        icon: "📱",
        href: "/heic-to-jpg",
      },
      {
        title: "Passport Photo",
        description: "Prepare photos using common official dimensions.",
        icon: "🪪",
        href: "/passport-photo",
      },
      {
        title: "Favicon Generator",
        description: "Create website favicon files from an image.",
        icon: "🌐",
        href: "/favicon-generator",
      },
    ],
  },

  {
    id: "calculators",
    title: "Calculators",
    description: "Useful calculators for everyday questions.",
    icon: "🧮",
    tools: [
      {
        title: "Age Calculator",
        description: "Calculate exact age in years, months and days.",
        icon: "🎂",
        href: "/age-calculator",
      },
      {
        title: "BMI Calculator",
        description: "Calculate BMI using weight and height.",
        icon: "⚖️",
        href: "/bmi-calculator",
      },
      {
        title: "Percentage Calculator",
        description: "Calculate percentages instantly.",
        icon: "%",
        href: "/percentage-calculator",
      },
      {
        title: "GST / HST Calculator",
        description: "Calculate Canadian GST and HST.",
        icon: "🇨🇦",
        href: "/gst-hst-calculator",
      },
    ],
  },

  {
    id: "unit-converters",
    title: "Unit Converters",
    description: "Convert common measurements quickly.",
    icon: "📏",
    tools: [
      {
        title: "CM to Feet",
        description: "Convert centimetres to feet and inches.",
        icon: "📐",
        href: "/cm-to-feet",
      },
      {
        title: "Inches to CM",
        description: "Convert inches and centimetres.",
        icon: "📏",
        href: "/inches-to-cm",
      },
      {
        title: "KG to Pounds",
        description: "Convert kilograms and pounds.",
        icon: "🏋️",
        href: "/kg-to-pounds",
      },
      {
        title: "KM to Miles",
        description: "Convert kilometres and miles.",
        icon: "🛣️",
        href: "/km-to-miles",
      },
      {
        title: "Temperature Converter",
        description: "Convert Celsius and Fahrenheit.",
        icon: "🌡️",
        href: "/temperature-converter",
      },
    ],
  },

  {
    id: "utilities",
    title: "Utilities",
    description: "Generators, archive tools and developer utilities.",
    icon: "🛠️",
    tools: [
      {
        title: "QR Code Generator",
        description: "Create QR codes for links, Wi-Fi and text.",
        icon: "▦",
        href: "/qr-code-generator",
      },
      {
        title: "Barcode Generator",
        description: "Generate CODE128, EAN, UPC and more.",
        icon: "▥",
        href: "/barcode-generator",
      },
      {
        title: "ZIP Extractor",
        description: "Open ZIP archives and extract selected files.",
        icon: "📦",
        href: "/zip-extractor",
      },
      {
        title: "UUID Generator",
        description: "Generate random Version 4 UUIDs.",
        icon: "🔑",
        href: "/uuid-generator",
      },
    ],
  },
];

export const popularTools: HomeTool[] = [
  {
    title: "Compress PDF",
    description: "Make PDF files smaller for email and uploads.",
    icon: "🗜️",
    href: "/compress-pdf",
  },
  {
    title: "Image Compressor",
    description: "Reduce JPG, PNG and WebP file size.",
    icon: "🖼️",
    href: "/image-compressor",
  },
  {
    title: "HEIC to JPG",
    description: "Convert iPhone HEIC photos to JPG.",
    icon: "📱",
    href: "/heic-to-jpg",
  },
  {
    title: "QR Code Generator",
    description: "Create downloadable QR codes instantly.",
    icon: "▦",
    href: "/qr-code-generator",
  },
  {
    title: "Merge PDF",
    description: "Combine several PDFs into one file.",
    icon: "📚",
    href: "/merge-pdf",
  },
  {
    title: "Image Resizer",
    description: "Resize images to custom dimensions.",
    icon: "📐",
    href: "/image-resizer",
  },
  {
    title: "WebP Converter",
    description: "Convert WebP, JPG and PNG images.",
    icon: "🔁",
    href: "/webp-converter",
  },
  {
    title: "Passport Photo",
    description: "Prepare photos using common official sizes.",
    icon: "🪪",
    href: "/passport-photo",
  },
];

export const recentlyAdded: HomeTool[] = [
  {
    title: "Rotate PDF",
    description: "Rotate PDF pages online.",
    icon: "🔄",
    href: "/rotate-pdf",
  },
  {
    title: "ZIP Extractor",
    description: "Open and extract ZIP archives.",
    icon: "📦",
    href: "/zip-extractor",
  },
  {
    title: "HEIC to JPG",
    description: "Convert HEIC photos to JPG.",
    icon: "📱",
    href: "/heic-to-jpg",
  },
  {
    title: "Favicon Generator",
    description: "Create website favicon files.",
    icon: "🌐",
    href: "/favicon-generator",
  },
];
