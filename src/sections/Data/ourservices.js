// 1. Import your local images at the top
import imgSocial from 'D:/CSqaure/src/assets/images/socialmedia.jpg';
import imgWeb from 'D:/CSqaure/src/assets/images/website.jpg';
import imgVideo from 'D:/CSqaure/src/assets/images/videoediting.jpg';
import imgShoot from 'D:/CSqaure/src/assets/images/shoot.jpg';
import imgBrochure from 'D:/CSqaure/src/assets/images/brochure.jpg';
import imgContent from 'D:/CSqaure/src/assets/images/Contentwriting.jpg';

// 2. Use the variable names in the object
export const services = [
  {
    id: 1,
    title: "Social Media & Posters",
    category: "Branding",
    description: "Eye-catching creatives and strategic posts to boost your online presence.",
    image: imgSocial // <--- Use variable, NOT string quotes
  },
  {
    id: 2,
    title: "Website Creation",
    category: "Development",
    description: "Responsive, high-performance websites tailored to your brand goals.",
    image: imgWeb
  },
  {
    id: 3,
    title: "Video Editing",
    category: "Post-Production",
    description: "Professional cuts, color grading, and effects to tell your story dynamically.",
    image: imgVideo
  },
  {
    id: 4,
    title: "Ad & Video Shoot",
    category: "Production",
    description: "Cinematic commercial shoots with professional lighting and direction.",
    image: imgShoot
  },
  {
    id: 5,
    title: "Brochure Designing",
    category: "Print Design",
    description: "Elegant layouts for brochures, flyers, and physical marketing materials.",
    image: imgBrochure
  },
  {
    id: 6,
    title: "Content Writing",
    category: "Copywriting",
    description: "Engaging narratives and SEO-friendly copy that drives conversions.",
    image: imgContent
  }
];


export const pricingCategories = [
  {
    id: "social",
    label: "Social Media",
    plans: [
      {
        name: "Starter",
        price: "$299",
        features: ["12 Posts / Month", "Hashtag Strategy", "Monthly Report", "Community Management"]
      },
      {
        name: "Growth",
        price: "$599",
        features: ["20 Posts / Month", "Reels & Stories", "Ad Management", "Bi-Weekly Meetings", "Content Calendar"]
      },
      {
        name: "Pro",
        price: "$999",
        features: ["Daily Content", "Full Video Production", "Dedicated Manager", "24/7 Support", "Influencer Outreach"]
      },
      {
        name: "E-Commerce",
        price: "$2,499",
        features: ["Online Store", "Payment Gateway", "Product Management", "User Accounts", "Advanced SEO"]
      }
    ]
  },
  {
    id: "website",
    label: "Website Creation",
    plans: [
      {
        name: "Landing Page",
        price: "$499",
        features: ["One Page Design", "Mobile Responsive", "Contact Form", "Basic SEO"]
      },
      {
        name: "Business Site",
        price: "$1,299",
        features: ["5-7 Pages", "CMS Integration", "Blog Setup", "Speed Optimization", "Analytics Setup"]
      },
      {
        name: "E-Commerce",
        price: "$2,499",
        features: ["Online Store", "Payment Gateway", "Product Management", "User Accounts", "Advanced SEO"]
      }
    ]
  },
  {
    id: "video",
    label: "Video Editing",
    plans: [
      {
        name: "Reels Pack",
        price: "$300",
        features: ["10 Short Form Videos", "Trending Audio", "Captions & Emojis"]
      },
      {
        name: "YouTuber",
        price: "$800",
        features: ["4 Long Form Videos", "Thumbnail Design", "Sound Design", "2 Revisions"]
      }
    ]
  },
  {
    id: "shoot",
    label: "Ad & Video Shoot",
    plans: [
      {
        name: "Half Day",
        price: "$1,500",
        features: ["4 Hours Shoot", "1 Videographer", "Basic Lighting", "1 Location"]
      },
      {
        name: "Full Production",
        price: "$3,500",
        features: ["8 Hours Shoot", "Full Crew", "Cinema Cameras", "Script Assistance", "Director on Set"]
      }
    ]
  },
  {
    id: "brochure",
    label: "Brochure Design",
    plans: [
      {
        name: "Bi-Fold",
        price: "$150",
        features: ["4 Sides Design", "Print Ready PDF", "Stock Photos", "2 Revisions"]
      },
      {
        name: "Catalog",
        price: "$450",
        features: ["Up to 12 Pages", "Custom Icons", "Copy Editing", "Source Files"]
      }
    ]
  },
  {
    id: "content",
    label: "Content Writing",
    plans: [
      {
        name: "Blog Pack",
        price: "$200",
        features: ["4 Blogs (1000 words)", "SEO Keywords", "Meta Descriptions", "Plagiarism Check"]
      },
      {
        name: "Website Copy",
        price: "$600",
        features: ["Home, About, Services", "Tone of Voice Guide", "Sales Psychology", "Competitor Research"]
      }
    ]
  }
];