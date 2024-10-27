import { baseURL } from "@/API";
import DOMPurify from "dompurify";

export const getImagePath = (image) => `${baseURL}/storage/${image}`;

export const getProfilePath = (profile_pic) =>
  `${baseURL}/storage/${profile_pic}`;

export const purifyHTML = (description) => {
  const sanitizedDescription = DOMPurify.sanitize(description);
  const wordsArray = sanitizedDescription.split(/\s+/);

  const first100Words = wordsArray.slice(0, 100).join(" ");
  const first40Words = wordsArray.slice(0, 40).join(" ");

  return { first40Words, first100Words, sanitizedDescription };
};

export const formatDate = (createdAt) => {
  const date = new Date(createdAt);

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);

  return formattedDate;
};
