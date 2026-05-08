'use client';

export const Schema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Iyiola Ogunjobi",
    "url": "https://iyiola.sulvatech.com",
    "jobTitle": "Visionary Builder & Technologist",
    "description": "Iyiola Ogunjobi is a founder, technologist, and creative systems thinker focused on building intelligent digital experiences and futuristic products.",
    "sameAs": [
      "https://github.com/Iyiola06",
      // Add other social links here if available
    ],
    "knowsAbout": [
      "Software Engineering",
      "Product Design",
      "Artificial Intelligence",
      "Systems Thinking",
      "Digital Experiences"
    ]
  };

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Iyiola Ogunjobi Portfolio",
    "url": "https://iyiola.sulvatech.com",
    "author": {
      "@type": "Person",
      "name": "Iyiola Ogunjobi"
    },
    "description": "A showcase of intelligent digital experiences and futuristic products built by Iyiola Ogunjobi."
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }}
      />
    </>
  );
};
