import photo from "../assets/photo.jpg";

export const profile = {
  name: "Sanket Sonkusare",
  title: "Forward Deployed Engineer at DevRev",
  company: "DevRev",
  location: "Bengaluru, India",
  email: "sanketsonkusare01@gmail.com",
  resumeUrl: "/resume.pdf",
  photo,
  // Bio pieces: the bold part is rendered with <b>.
  bio: {
    before: "I build ",
    strong: "AI and data systems",
    after:
      ". At DevRev, I build the connectors and workflows that bring customer data from warehouses like BigQuery and Snowflake into the platform. Before that, I built multi-agent RAG systems at Scrobits.",
  },
  beyondCode: {
    label: "Outside work",
    text: "Fitness is a big part of my life: I won a silver medal in university bodybuilding. I also play the flute, which is how I switch off after a long day of building.",
  },
};
