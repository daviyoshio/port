import { asset } from "../lib/asset";

/** Language-neutral profile data: contact channels and the CV file. */
export const profile = {
  name: "Davi Yoshio",
  phone: "(11) 99418-9595",
  phoneHref: "tel:+5511994189595",
  email: "daviyoshio219@gmail.com",
  linkedin: "https://www.linkedin.com/in/daviyoshio/",
  linkedinHandle: "linkedin.com/in/daviyoshio",
  github: "https://github.com/daviyoshio",
  githubHandle: "github.com/daviyoshio",
  cv: asset("assets/cv-davi-yoshio.pdf"),
} as const;
