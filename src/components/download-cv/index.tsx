import { pdf } from "@react-pdf/renderer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Resume } from "@/my-resume";
import summary from "@/my-resume/summary.json";

function getFileName(): string {
  const name = (summary as { name: string }).name;
  const safe = name
    .replace(/\s+/g, "-")
    .replace(/[<>:"/\\|?*]/g, "");
  return `${safe || "resume"}-Resume.pdf`;
}

export function DownloadCV() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    setLoading(true);
    setError(null);
    try {
      const blob = await pdf(<Resume />).toBlob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = getFileName();
      a.click();
      setTimeout(() => URL.revokeObjectURL(url), 100);
    } catch {
      setError("Download failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <span className="inline-flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={handleDownload}
        disabled={loading}
        aria-busy={loading}
        aria-disabled={loading}
      >
        {loading ? "Preparing…" : "Download CV"}
      </Button>
      {error && (
        <span className="text-sm text-destructive" role="alert">
          {error}
        </span>
      )}
    </span>
  );
}
