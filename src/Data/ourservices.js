// 1. Import your local images at the top
import imgSocial from '../assets/images/socialmediapic.png';
import imgWeb from '../assets/images/webdevelopment.png';
import imgVideo from '../assets/images/videoEditings.png';
import imgShoot from '../assets/images/adshooting.png';
import imgAdrunning from '../assets/images/runningads.png';
import imgProfile from '../assets/images/businessprofile.png';

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
    title: "Running Ads",
    category: "Performance Marketing",
    description: "Data-driven advertising campaigns designed to reach the right audience, maximize ROI, and generate consistent leads for your business.",
    image: imgAdrunning
  },
  {
    id: 6,
    title: "Business Profile Setup",
    category: "Google Business Profile",
    description: "Complete setup and optimization of your business profile to enhance local search visibility, customer engagement, and online credibility.",
    image: imgProfile
  }
];


export const pricingCategories = [
  {
    id: "social",
    label: "Social Media",
    plans: [
      {
        name: "Starter",
        price: "₹7,999",
        features: [
          "12 Posts / Month",
          "Hashtag Strategy",
          "Monthly Report",
          "Community Management"
        ]
      },
      {
        name: "Growth",
        price: "₹14,999",
        features: [
          "20 Posts / Month",
          "Reels & Stories",
          "Basic Ad Support",
          "Bi-Weekly Meetings",
          "Content Calendar"
        ]
      },
      {
        name: "Pro",
        price: "₹24,999",
        features: [
          "Daily Content",
          "Advanced Reels",
          "Dedicated Manager",
          "Priority Support",
          "Influencer Collaboration"
        ]
      }
    ]
  },

  {
    id: "website",
    label: "Website Creation",
    plans: [
      {
        name: "Landing Page",
        price: "₹9,999",
        features: [
          "One Page Design",
          "Mobile Responsive",
          "Contact Form",
          "Basic SEO"
        ]
      },
      {
        name: "Business Site",
        price: "₹24,999",
        features: [
          "5-7 Pages",
          "CMS Integration",
          "Blog Setup",
          "Speed Optimization",
          "Analytics Setup"
        ]
      },
      {
        name: "E-Commerce",
        price: "₹49,999",
        features: [
          "Online Store",
          "Payment Gateway",
          "Product Management",
          "User Accounts",
          "Advanced SEO"
        ]
      }
    ]
  },

  {
    id: "video",
    label: "Video Editing",
    plans: [
      {
        name: "Reels Pack",
        price: "₹4,999",
        features: [
          "10 Short Form Videos",
          "Trending Audio",
          "Captions & Effects"
        ]
      },
      {
        name: "YouTuber",
        price: "₹11,999",
        features: [
          "4 Long Form Videos",
          "Thumbnail Design",
          "Sound Design",
          "2 Revisions"
        ]
      }
    ]
  },

  {
    id: "shoot",
    label: "Ad & Video Shoot",
    plans: [
      {
        name: "Half Day",
        price: "₹14,999",
        features: [
          "4 Hours Shoot",
          "1 Videographer",
          "Basic Lighting",
          "1 Location"
        ]
      },
      {
        name: "Full Production",
        price: "₹34,999",
        features: [
          "8 Hours Shoot",
          "Professional Crew",
          "Cinema Cameras",
          "Script Assistance",
          "Director Support"
        ]
      }
    ]
  },

  {
    id: "ads",
    label: "Running Ads",
    plans: [
      {
        name: "Starter",
        price: "₹7,999",
        features: [
          "1 Ad Platform",
          "Campaign Setup",
          "Audience Targeting",
          "Monthly Report"
        ]
      },
      {
        name: "Growth",
        price: "₹14,999",
        features: [
          "Google & Meta Ads",
          "Lead Generation Campaigns",
          "A/B Testing",
          "Bi-Weekly Optimization",
          "Performance Reports"
        ]
      },
      {
        name: "Pro",
        price: "₹24,999",
        features: [
          "Multi-Platform Advertising",
          "Advanced Targeting",
          "Conversion Tracking",
          "Weekly Optimization",
          "Dedicated Manager"
        ]
      }
    ]
  },

  {
    id: "business-profile",
    label: "Business Profile Setup",
    plans: [
      {
        name: "Basic Setup",
        price: "₹2,999",
        features: [
          "Profile Creation",
          "Business Information Setup",
          "Category Optimization",
          "Verification Support"
        ]
      },
      {
        name: "Optimized Profile",
        price: "₹5,999",
        features: [
          "Complete Profile Optimization",
          "SEO-Friendly Description",
          "Photo Optimization",
          "Services Setup",
          "Review Strategy"
        ]
      },
      {
        name: "Local Growth",
        price: "₹9,999",
        features: [
          "Advanced Optimization",
          "Monthly Posts",
          "Review Management",
          "Local SEO Setup",
          "Performance Tracking"
        ]
      }
    ]
  }
];