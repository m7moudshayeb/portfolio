import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <motion.article
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link to="/blog" className="text-sm text-primary underline">
          ← Back to blog
        </Link>
        <h1 className="mt-6 font-serif text-3xl font-bold text-foreground">
          Post: {slug ?? "unknown"}
        </h1>
      </motion.article>
    </div>
  );
}
