import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Globe,
  Zap,
  Award,
  Heart,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribeSuccess, setSubscribeSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribeSuccess(true);
      setEmail("");
      setTimeout(() => setSubscribeSuccess(false), 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-b from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-bounce-gentle" />
        <div
          className="absolute bottom-0 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-bounce-gentle"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter Section */}
        <div className="mb-16 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
              <p className="text-white/80 mb-6">
                Get exclusive offers, travel tips, and updates delivered to your
                inbox.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
                required
              />
              <Button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-500 text-primary-900 font-semibold whitespace-nowrap"
              >
                Subscribe
              </Button>
            </form>
            {subscribeSuccess && (
              <p className="col-span-1 md:col-span-2 text-green-300 text-sm">
                ✓ Thanks for subscribing!
              </p>
            )}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-gradient-to-br from-yellow-300 to-yellow-500 p-2 rounded-lg">
                  <Building2 className="w-6 h-6 text-primary-900" />
                </div>
                <span className="text-3xl font-bold">MernHolidays</span>
              </div>
              <p className="text-white/80 leading-relaxed text-sm">
                Discover amazing hotels, resorts, and accommodations worldwide.
                Book with confidence and enjoy unforgettable experiences.
              </p>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  title={label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Explore */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-bold">Explore</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Home",
                "Browse Hotels",
                "Popular Destinations",
                "Travel Guides",
                "Special Offers",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white flex items-center group transition-colors"
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-bold">Support</h3>
            </div>
            <ul className="space-y-3">
              {[
                "Help Center",
                "Booking Guide",
                "Cancellation Policy",
                "Privacy Policy",
                "Terms of Service",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-white/70 hover:text-white flex items-center group transition-colors"
                  >
                    <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <h3 className="text-lg font-bold">Contact</h3>
            </div>
            <div className="space-y-4">
              <a
                href="mailto:support@mernholidays.com"
                className="flex items-start space-x-3 group cursor-pointer"
              >
                <Mail className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70 group-hover:text-white transition-colors text-sm">
                    Email
                  </p>
                  <p className="text-white font-medium break-all">
                    support@mernholidays.com
                  </p>
                </div>
              </a>
              <a
                href="tel:+15551234567"
                className="flex items-start space-x-3 group cursor-pointer"
              >
                <Phone className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70 group-hover:text-white transition-colors text-sm">
                    Phone
                  </p>
                  <p className="text-white font-medium">+1 (555) 123-4567</p>
                </div>
              </a>
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-white/70 text-sm">Address</p>
                  <p className="text-white font-medium">123 Travel St, Tourism City</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-white/70 text-sm">
            <p>© 2025 MernHolidays. All rights reserved.</p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap justify-center gap-6">
            {[
              { Icon: Heart, label: "Trusted" },
              { Icon: Award, label: "Verified" },
              { Icon: Zap, label: "24/7 Support" },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="flex items-center space-x-2 text-white/70 text-xs"
              >
                <Icon className="w-4 h-4 text-yellow-400" />
                <span>{label}</span>
              </div>
            ))}
          </div>

          {/* Legal Links */}
          <div className="flex gap-6 text-white/70 text-sm">
            {[
              "Privacy Policy",
              "Terms of Service",
              "Cookie Policy",
            ].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white transition-colors"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
