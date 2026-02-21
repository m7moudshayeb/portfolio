import { motion } from "framer-motion";

export function CalendlyPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Book a call
        </h1>
        <div className="mt-8 min-h-[400px] rounded-lg border border-border bg-muted/30 p-8 text-center text-muted-foreground">
          Calendly embed placeholder
        </div>
      </motion.div>
    </div>
  );
}
