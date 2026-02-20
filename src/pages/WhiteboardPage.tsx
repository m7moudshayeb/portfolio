import { motion } from "framer-motion";

export function WhiteboardPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Whiteboard session
        </h1>
        <p className="mt-2 text-muted-foreground">
          Book an interview or whiteboard session. We can use Miro, Figma Jam,
          or pair in Cursor.
        </p>
      </motion.div>
    </div>
  );
}
