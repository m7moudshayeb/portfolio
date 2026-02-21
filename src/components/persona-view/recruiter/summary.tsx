import { motion } from "framer-motion";

import { DownloadCV } from "@/components/download-cv";
import summary from "@/my-resume/summary.json";

export const Summary = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-12"
    >
      <h1 className="font-serif text-4xl font-bold text-foreground">
        {(summary as { name: string }).name}
      </h1>
      <p className="mt-1 text-xl text-primary">
        {(summary as { title: string }).title}
      </p>
      <p className="mt-2 text-muted-foreground">
        {(summary as { tagline: string }).tagline}
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2">
        <a
          href="/contact"
          className="text-primary underline underline-offset-4 hover:no-underline"
        >
          Contact me
        </a>
        <a
          href="/calendly"
          className="text-primary underline underline-offset-4 hover:no-underline"
        >
          Book a call
        </a>
        <DownloadCV />
      </div>
    </motion.section>
  );
};
