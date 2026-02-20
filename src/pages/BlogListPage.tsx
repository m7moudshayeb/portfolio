import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MOCK_POSTS = [
  {
    slug: "first-post",
    title: "First post",
    date: "2025-01-15",
    description: "Scaffold placeholder.",
  },
];

export function BlogListPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-serif text-3xl font-bold text-foreground">Blog</h1>
        <ul className="mt-8 space-y-4">
          {MOCK_POSTS.map((post) => (
            <li key={post.slug}>
              <Link to={`/blog/${post.slug}`}>
                <Card className="transition-colors hover:bg-accent/5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">{post.date}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      {post.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
