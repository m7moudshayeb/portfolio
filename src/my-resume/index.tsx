import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import summary from "./summary.json";
import experience from "./experience.json";
import achievements from "./achievements.json";
import contacts from "./contacts.json";
import education from "./education.json";
import skills from "./skills.json";
import projects from "./projects.json";

// Theme
const theme = {
  foreground: "#333333",
  primary: "#d95a2b",
  muted: "#666666",
  border: "#d6d2ce",
  card: "#ffffff",
  pageBg: "#faf9f7",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: theme.pageBg,
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
  },
  // Header
  header: {
    marginBottom: 28,
  },
  name: {
    fontFamily: "Times-Bold",
    fontSize: 24,
    color: theme.foreground,
    marginBottom: 4,
  },
  title: {
    fontSize: 14,
    color: theme.primary,
    marginBottom: 6,
  },
  tagline: {
    fontSize: 10,
    color: theme.muted,
    lineHeight: 1.45,
    marginBottom: 14,
  },
  contactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  contactItem: {
    color: theme.primary,
    textDecoration: "none",
    fontSize: 10,
  },
  contactText: {
    color: theme.muted,
    fontSize: 10,
  },
  // Section title
  sectionTitle: {
    fontFamily: "Times-Bold",
    fontSize: 14,
    color: theme.foreground,
    marginBottom: 12,
  },
  section: {
    marginBottom: 24,
  },
  // Card
  card: {
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 6,
    padding: 18,
    marginBottom: 12,
  },
  cardTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 12,
    color: theme.foreground,
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 10,
    color: theme.muted,
    marginBottom: 8,
  },
  bulletList: {
    marginLeft: 4,
  },
  bullet: {
    fontSize: 10,
    color: theme.muted,
    lineHeight: 1.45,
    marginBottom: 4,
  },
  // Achievement card
  achievementCard: {
    backgroundColor: theme.card,
    borderWidth: 1,
    borderColor: theme.border,
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 4,
  },
  achievementBullet: {
    fontSize: 10,
    color: theme.primary,
    width: 8,
  },
  achievementText: {
    flex: 1,
    fontSize: 10,
    color: theme.muted,
    lineHeight: 1.45,
  },
  // Education
  // Skills – compact, one line per category
  skillCategory: {
    marginBottom: 8,
  },
  skillCategoryTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10,
    color: theme.foreground,
    marginBottom: 4,
  },
  skillLine: {
    fontSize: 10,
    color: theme.muted,
    lineHeight: 1.4,
  },
  // Projects
  projectDescription: {
    fontSize: 10,
    color: theme.muted,
    marginBottom: 6,
    lineHeight: 1.45,
  },
  projectLink: {
    fontSize: 10,
    color: theme.primary,
    textDecoration: "none",
    marginTop: 4,
  },
});

type Summary = { name: string; title: string; tagline: string };
type ExpItem = {
  id: number;
  title: string;
  company: string;
  location?: string;
  date: string;
  description: string[];
};
type Achievement = { id: number; icon: string; text: string };
type Contacts = {
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
};
type Education = {
  degree: string;
  institution: string;
  location?: string;
  date: string;
};
type Skills = Record<string, string[]>;
type Project = {
  id: number;
  title: string;
  description: string;
  details: string[];
  links?: { label: string; url: string }[];
};

const c = contacts as Contacts;
const s = summary as Summary;
const ed = education as Education;

export const Resume = () => (
  <Document title={`${s.name} – Resume`} author={s.name}>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.name}>{s.name}</Text>
        <Text style={styles.title}>{s.title}</Text>
        <Text style={styles.tagline}>{s.tagline}</Text>
        <View style={styles.contactRow}>
          <Link src={`mailto:${c.email}`} style={styles.contactItem}>
            {c.email}
          </Link>
          <Text style={styles.contactText}> · </Text>
          <Text style={styles.contactText}>{c.phone}</Text>
          <Text style={styles.contactText}> · </Text>
          <Text style={styles.contactText}>{c.location}</Text>
          {c.linkedin && (
            <>
              <Text style={styles.contactText}> · </Text>
              <Link src={c.linkedin} style={styles.contactItem}>
                LinkedIn
              </Link>
            </>
          )}
          {c.github && (
            <>
              <Text style={styles.contactText}> · </Text>
              <Link src={c.github} style={styles.contactItem}>
                GitHub
              </Link>
            </>
          )}
        </View>
      </View>

      {/* Experience */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Experience</Text>
        {(experience as ExpItem[]).map((exp) => (
          <View key={exp.id} style={styles.card}>
            <Text style={styles.cardTitle}>{exp.title}</Text>
            <Text style={styles.cardMeta}>
              {exp.company}
              {exp.location ? ` · ${exp.location}` : ""} · {exp.date}
            </Text>
            <View style={styles.bulletList}>
              {exp.description.map((d, j) => (
                <Text key={j} style={styles.bullet}>
                  • {d}
                </Text>
              ))}
            </View>
          </View>
        ))}
      </View>
    </Page>

    {/* Page 2: Key achievements, Education, Skills */}
    <Page size="A4" style={styles.page}>
      <View style={[styles.section, { marginTop: 0 }]}>
        <Text style={styles.sectionTitle}>Key achievements</Text>
        {(achievements as Achievement[]).map((a) => (
          <View key={a.id} style={styles.achievementCard}>
            <Text style={styles.achievementBullet}>•</Text>
            <Text style={styles.achievementText}>{a.text}</Text>
          </View>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Education</Text>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{ed.degree}</Text>
          <Text style={styles.cardMeta}>
            {ed.institution}
            {ed.location ? ` · ${ed.location}` : ""} · {ed.date}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Skills</Text>
        {Object.entries(skills as Skills).map(([category, list]) => (
          <View key={category} style={styles.skillCategory}>
            <Text style={styles.skillCategoryTitle}>{category}</Text>
            <Text style={styles.skillLine}>{list.join(", ")}</Text>
          </View>
        ))}
      </View>
    </Page>
    <Page size="A4" style={styles.page}>
      {/* Projects */}
      {(projects as Project[]).length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          {(projects as Project[]).map((proj) => (
            <View key={proj.id} style={styles.card}>
              <Text style={styles.cardTitle}>{proj.title}</Text>
              <Text style={styles.projectDescription}>{proj.description}</Text>
              {proj.details?.length > 0 && (
                <View style={styles.bulletList}>
                  {proj.details.map((d, i) => (
                    <Text key={i} style={styles.bullet}>
                      • {d}
                    </Text>
                  ))}
                </View>
              )}
              {proj.links?.map((link, i) => (
                <Link key={i} src={link.url} style={styles.projectLink}>
                  {link.label}
                </Link>
              ))}
            </View>
          ))}
        </View>
      )}
    </Page>
  </Document>
);
