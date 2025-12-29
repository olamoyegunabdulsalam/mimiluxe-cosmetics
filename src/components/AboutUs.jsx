// components/AboutUs.jsx
import React from "react";
import { Award, Truck, ShieldCheck, Star } from "lucide-react";

export const AboutUs = ({ onWhatsAppClick }) => {
const features = [
  {
    icon: <Award className="h-8 w-8 text-pink-500" />,
    title: "Premium Formulas",
    description:
      "Carefully crafted lip glosses made with nourishing ingredients for smooth, lasting shine.",
  },
  {
    icon: <Truck className="h-8 w-8 text-rose-500" />,
    title: "Fast Delivery",
    description:
      "Quick and reliable delivery so your favorite glosses get to you without delay.",
  },
  {
    icon: <ShieldCheck className="h-8 w-8 text-pink-600" />,
    title: "Trusted & Loved",
    description:
      "Loved by our customers for quality, consistency, and beautiful results.",
  },
];


  return (
    <section
      id="about"
      className="bg-gradient-to-b from-white to-gray-50 py-16 sm:py-24"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Gloss
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Thoughtfully crafted lip products designed to enhance your natural
            beauty
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 rounded-full bg-gray-50">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 ml-4">
                  {feature.title}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* About Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <div className="flex items-center mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>
              <span className="ml-2 text-gray-600 font-medium">
                Rated 4.5/5 by 500+ customers
              </span>
            </div>

            <h3 className="text-2xl font-bold text-gray-900">Our Story</h3>

            <div className="space-y-4">
              <p className="text-gray-600 text-lg">
                Our brand was created with one simple goal to help you feel
                confident, polished, and beautiful with every swipe. Each lip
                gloss is thoughtfully made to deliver shine, comfort, and a
                luxurious feel you can trust.
              </p>
              <p className="text-gray-600 text-lg">
                From everyday gloss to bold statement shades, we believe beauty
                should feel effortless, fun, and empowering. Every product
                reflects our love for detail, quality, and soft glam elegance.
              </p>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-pink-600">100%</div>
                  <div className="text-gray-600">Handcrafted Care</div>
                </div>
                <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                  <div className="text-3xl font-bold text-pink-600">500+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-pink-600 to-pink-300 rounded-2xl p-8 text-white">
            <div className="max-w-md mx-auto text-center">
              <h3 className="text-2xl font-bold mb-4">
                Ready to Find Your Perfect Shine?
              </h3>
              <p className="mb-6 text-pink-100">
                Discover glosses designed to hydrate, shine, and elevate your
                look. Order easily via WhatsApp and enjoy fast delivery.
              </p>

              <button
                onClick={() => onWhatsAppClick()}
                className="w-full bg-white text-pink-700 font-bold py-4 px-6 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg mb-4"
              >
                <div className="flex items-center justify-center">
                  <svg
                    className="w-6 h-6 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.507 14.307l-.009.075c-.016.15-.367 1.605-2.016 2.281-1.281.526-1.957.688-2.894.757-.368.027-.788.04-1.207.04-3.323 0-6.325-1.993-6.325-5.634 0-3.636 3.007-5.634 6.353-5.634 3.354 0 6.177 1.993 6.177 5.634 0 1.166-.399 2.234-.886 3.081l-.886-1.253-1.305 1.503zm-5.507-9.307c-5.523 0-10 4.477-10 10 0 1.799.476 3.567 1.377 5.107l-1.455 5.425 5.541-1.456c1.486.821 3.167 1.324 4.937 1.324 5.523 0 10-4.477 10-10s-4.477-10-10-10z" />
                  </svg>
                  Chat With Us Now
                </div>
              </button>

              <p className="text-sm text-pink-200">
                Average response time: 5 minutes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
