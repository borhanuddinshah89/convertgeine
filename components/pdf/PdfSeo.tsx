import ToolSeoSection from "@/components/ToolSeoSection";

type Props = {
  tool: string;
  description: string;
};

export default function PdfSeo({
  tool,
  description,
}: Props) {
  return (
    <ToolSeoSection
      tool={tool}
      description={description}
      steps={[
        "Choose your PDF.",
        "Configure the tool options.",
        "Process the PDF.",
        "Download the result.",
      ]}
      benefits={[
        "Free to use.",
        "Browser-based processing.",
        "No registration required.",
        "Fast downloads.",
      ]}
    />
  );
}
