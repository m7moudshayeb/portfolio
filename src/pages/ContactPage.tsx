import { motion } from "framer-motion";
import contacts from "@/my-resume/contacts.json";

const c = contacts as {
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
};

export function ContactPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-serif text-3xl font-bold text-foreground">
          Contact
        </h1>
        <p className="mt-2 text-muted-foreground">Get in touch.</p>
        <ul className="mt-8 space-y-4">
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${c.email}`} className="text-primary underline">
              {c.email}
            </a>
          </li>
          <li>
            <strong>Phone:</strong> {c.phone}
          </li>
          <li>
            <strong>Location:</strong> {c.location}
          </li>
          <li>
            <strong>LinkedIn:</strong>{" "}
            <a
              href={c.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              Profile
            </a>
          </li>
          <li>
            <strong>GitHub:</strong>{" "}
            <a
              href={c.github}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline"
            >
              Profile
            </a>
          </li>
        </ul>
      </motion.div>
    </div>
  );
}
