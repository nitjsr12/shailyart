/**
 * Google Business / Maps reviews for ShailArt.
 * Paste verbatim text, reviewer display name, and relative date from your
 * Google Business Profile → Reviews tab. Keep `rating` in sync with each review.
 *
 * Live listing (search): opens Google results for this business’s reviews.
 */
export const GOOGLE_BUSINESS_REVIEWS_URL =
  "https://www.google.com/search?q=ShailArt+Online+Painting+classes+and+Art+gallery+Reviews";

export type GoogleReview = {
  name: string;
  date: string;
  text: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** Shown under the name on the homepage (e.g. city if Google shows it). */
  location?: string;
};

/** Class-focused reviews; first three power the homepage “What Our Students Say”. */
const classGoogleReviews: GoogleReview[] = [
  {
    name: "Nischal Vishnu Duvvuru",
    date: "4 months ago",
    text: "ShailArt offers one of the best approaches to learning painting online. The teaching methods are engaging, clear, and structured to suit learners at every level — from beginners to professionals.",
    rating: 5,
  },
  {
    name: "Srijit Saha",
    date: "3 years ago",
    text: "Very happy with your online painting classes got to know many interesting things about paintings. Thanks for making drawing so easy for us.",
    rating: 5,
  },
  {
    name: "Savita Vidyarthi",
    date: "6 years ago",
    location: "Gaur City",
    text: "If u consider doing an art class in gaur city, I can highly recommend Shail Art Classes. Shaily Ma'am is an amazing artist and an encouraging teacher with lots of patience. You are truly very talented Ma'am 👍",
    rating: 5,
  },
  {
    name: "bina singh",
    date: "6 years ago",
    text: "Very innovative and creative teacher. Under her guidance my daughter is doing very well. She is very passionate about her work.",
    rating: 5,
  },
  {
    name: "Lopamudra Acharya",
    date: "Edited 4 years ago",
    text: "… art class ever 😍😍 she is the best art teacher for all age group. she is the best person for art class. she treats the students like her children. My daughter is very much happy for her class. 😍 I LOVE U SHAILY MA'AM ❤️ (From-Chandana Dash)",
    rating: 5,
  },
];

/** Portraits, canvas work, and collecting — used on the gallery / paintings section. */
export const paintingGoogleReviewHighlights: GoogleReview[] = [
  {
    name: "Rohith Krishna T J",
    date: "2 years ago",
    text: "I reached out to Shaily Ma'am for a canvas painting portrait to gift my friend, and the painting was absolutely stunning. The portrait painting created was beyond my expectations. My friend loved it, and I couldn't have asked for a more perfect gift. The attention to detail and dedication truly shine through. I appreciate her patience in answering all my questions and her incredible talent. I look forward to collaborating with her again on future projects. Highly recommend!",
    rating: 5,
  },
  {
    name: "Priya Gadre",
    date: "3 years ago",
    location: "UK",
    text: "I live in the UK and attending Shaily's classes online. She is an amazing mentor. In her classes we touch upon different aspects each week like painting scenery, still painting, sketching, modeling paste painting etc. This week in her class, excited to paint on 3 feet by 2 feet canvas. In all her classes she always goes extra mile so that students can learn from her. We receive different painting videos from Shaily as additional bonus. Very lucky to find Shaily as my tutor. Thank you so much!",
    rating: 5,
  },
  {
    name: "Rachana Krishnan",
    date: "4 years ago",
    text: "Can't ask for more!! I have tried various art classes for my daughter and myself but ShailArt is the best. Here we learn various fine art techniques, experiment with various mediums like water colours, oil pastels, oil paintings, pencil sketches, canvas paintings and many more. I didn't know about these mediums until I joined ShailArt. Here we are also encouraged to read and learn more about all art forms and their artists too. It's a complete art school. Highly recommend ShailArt.",
    rating: 5,
  },
];

/** All Google reviews (classes + paintings); `/reviews` shows the full list. */
export const googleReviews: GoogleReview[] = [
  ...classGoogleReviews,
  ...paintingGoogleReviewHighlights,
];

/** First three = homepage classes section. */
export const homepageGoogleReviewHighlights = classGoogleReviews.slice(0, 3);
