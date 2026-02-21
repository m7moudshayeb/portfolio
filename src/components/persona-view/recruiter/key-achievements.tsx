import { motion } from "framer-motion";

import { Card, CardContent } from "@/components/ui/card";

import achievements from "@/my-resume/achievements.json";

type Achievement = { id: number; icon: string; text: string };
const list = achievements as Achievement[];

export const KeyAchievements = () => {
  return (
    <section className="mb-12">
      <h2 className="font-serif text-2xl font-bold text-foreground">
        Key achievements
      </h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {list.map((a, i) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
          >
            <Card>
              <CardContent className="flex items-start gap-3 pt-6">
                <span className="text-2xl">{a.icon}</span>
                <p className="text-sm text-muted-foreground">{a.text}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
