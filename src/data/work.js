import manastik from "../assets/logos/manastik.png";
import scrobits from "../assets/logos/scrobits.png";

// Highlights from past roles, each shown with a looping animation (`loop`).
export const work = [
  {
    id: "pose",
    loop: "pose",
    title: "Real-time yoga pose scoring",
    company: "Manastik",
    role: "Machine Learning Intern",
    logo: manastik,
    description:
      "Detects body keypoints live from the camera, recognises the yoga pose and scores it on three posture metrics, with a repetition counter trained on 10,000+ images.",
    stack: "MediaPipe on TFLite, 93% accuracy",
  },
  {
    id: "voice",
    loop: "voice",
    title: "Voice assistant that drives the website",
    company: "Scrobits",
    role: "AI Engineer",
    logo: scrobits,
    description:
      "A production voice-powered AI assistant that understands spoken requests and changes the website in response: filtering, sorting and acting on the page for the user.",
    stack: "Voice AI, in production",
  },
];
