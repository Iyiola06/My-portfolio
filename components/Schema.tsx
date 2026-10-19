'use client';

export const Schema = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Iyiola Ogunjobi",
    "url": "https://iyiola.sulvatech.com",
    "jobTitle": "Founder, Sulva Tech",
    "description": "Iyiola Ogunjobi is the founder of Sulva Tech, building AI-powered platforms for education, commerce, media and events across Africa.",
    "email": "iyiola@sulvatech.com",
    "telephone": "+2347068495149",
    "sameAs": [
      "https://github.com/Iyiola06",
      "https://wa.me/2347068495149"
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
