import React from "react";
import { Link } from "react-router-dom";
import {
  Train,
  ChevronRight,
  Clock,
  MapPin,
  Users,
  Shield,
} from "lucide-react";
import Image from "../../assets/images/company_img1.png";

const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left content - Text */}
          <div className="md:w-1/2 space-y-8">
            <div className="flex items-center mb-4">
              <div className="bg-red-50 p-2 rounded-full mr-3">
                <Train className="text-red-600" size={20} />
              </div>
              <span className="bg-red-100 text-red-600 px-4 py-1.5 rounded-full text-sm font-semibold">
                Modern Transit Solutions
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
              Experience the Future of{" "}
              <span className="text-red-600 relative">
                HU Tech-Train
                <span className="absolute bottom-1 left-0 w-full h-2 bg-red-100 -z-10"></span>
              </span>{" "}
              Transportation
            </h1>

            <p className="text-gray-600 text-lg md:text-xl max-w-xl">
              Advanced, efficient, and environmentally friendly public
              transportation system designed to revolutionize how you commute
              across the city.
            </p>

            <div className="flex flex-wrap gap-8 py-4">
              <div className="flex items-center group">
                <div className="bg-red-100 p-2 rounded-full mr-3 group-hover:bg-red-200 transition-colors">
                  <Clock className="text-red-600" size={18} />
                </div>
                <span className="text-gray-700 font-medium">24/7 Service</span>
              </div>
              <div className="flex items-center group">
                <div className="bg-red-100 p-2 rounded-full mr-3 group-hover:bg-red-200 transition-colors">
                  <MapPin className="text-red-600" size={18} />
                </div>
                <span className="text-gray-700 font-medium">
                  City-wide Coverage
                </span>
              </div>
              <div className="flex items-center group">
                <div className="bg-red-100 p-2 rounded-full mr-3 group-hover:bg-red-200 transition-colors">
                  <Users className="text-red-600" size={18} />
                </div>
                <span className="text-gray-700 font-medium">High Capacity</span>
              </div>
              <div className="flex items-center group">
                <div className="bg-red-100 p-2 rounded-full mr-3 group-hover:bg-red-200 transition-colors">
                  <Shield className="text-red-600" size={18} />
                </div>
                <span className="text-gray-700 font-medium">Safety First</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all shadow-md hover:shadow-lg">
                Book a Ride
                <ChevronRight className="ml-2" size={16} />
              </button>
              <button className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3 rounded-lg font-medium transition-all">
                View Schedule
              </button>
              <Link
                to="/verify"
                className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center transition-all shadow-md hover:shadow-lg"
              >
                Register Now
                <ChevronRight className="ml-2" size={16} />
              </Link>
            </div>
          </div>

          {/* Right content - Image */}
          <div className="md:w-1/2 mt-8 md:mt-0">
            <div className="bg-white rounded-2xl overflow-hidden shadow-xl relative transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              {/* Main image */}
              <div className="relative">
                <img
                  src={Image}
                  alt="HU Tech-Train System"
                  className="w-full h-full object-cover"
                />

                {/* Floating badge */}
                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
                  <div className="flex items-center">
                    <div className="flex items-center text-yellow-500">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 font-semibold text-gray-800">
                      4.9/5
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats overlay */}
              <div className="bg-white p-6 border-t border-gray-100">
                <div className="flex justify-between text-gray-800">
                  <div className="text-center px-4">
                    <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
                      Daily Riders
                    </p>
                    <p className="text-2xl font-bold text-red-600">250,000+</p>
                  </div>
                  <div className="text-center px-4 border-x border-gray-200">
                    <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
                      Stations
                    </p>
                    <p className="text-2xl font-bold text-red-600">42</p>
                  </div>
                  <div className="text-center px-4">
                    <p className="text-xs uppercase font-semibold text-gray-500 tracking-wider">
                      Satisfaction
                    </p>
                    <p className="text-2xl font-bold text-red-600">98%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
