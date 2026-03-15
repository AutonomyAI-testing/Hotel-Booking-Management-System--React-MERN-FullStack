import { Building2, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Heart, Zap, Globe, Award } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent" />

      {/* Floating Decorative Elements */}
      <div className="absolute top-20 right-20 w-40 h-40 bg-white/5 rounded-full blur-3xl animate-bounce-gentle" />
      <div
        className="absolute bottom-40 left-10 w-32 h-32 bg-white/5 rounded-full blur-3xl animate-bounce-gentle"
        style={{ animationDelay: "1.5s" }}
      />

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
          {/* Top Section with CTA */}
          <div className="mb-16 pb-8 border-b border-white/10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                  Ready to Book Your
                  <span className="block bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                    Perfect Stay?
                  </span>
                </h2>
                <p className="text-white/80 text-lg leading-relaxed">
                  Join thousands of travelers who have discovered amazing experiences with us.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                />
                <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-400 text-primary-900 font-semibold hover:shadow-lg hover:scale-105 transition-all duration-200 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Main Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <div className="bg-gradient-to-br from-yellow-400 to-orange-400 p-2 rounded-lg shadow-lg">
                    <Building2 className="w-6 h-6 text-primary-900" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent">
                    MernHolidays
                  </span>
                </div>
                <p className="text-white/75 leading-relaxed text-sm">
                  Your trusted partner in discovering amazing hotels, resorts, and accommodations worldwide. Book with confidence and create unforgettable memories.
                </p>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white/60 mb-3 uppercase tracking-wider">Follow Us</h4>
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
                      className="w-10 h-10 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-all duration-300 hover:scale-110"
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Explore */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-6">
                <Globe className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold">Explore</h3>
              </div>
              <ul className="space-y-3">
                {[
                  { label: "Home", href: "#" },
                  { label: "Hotels", href: "#" },
                  { label: "Destinations", href: "#" },
                  { label: "About Us", href: "#" },
                  { label: "Contact", href: "#" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                    >
                      <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2 group-hover:scale-150 transition-transform" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-6">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold">Support</h3>
              </div>
              <ul className="space-y-3">
                {[
                  { label: "Help Center", href: "#" },
                  { label: "Booking Guide", href: "#" },
                  { label: "FAQ", href: "#" },
                  { label: "Cancellation Policy", href: "#" },
                  { label: "Report Issue", href: "#" },
                ].map(({ label, href }) => (
                  <li key={label}>
                    <a
                      href={href}
                      className="text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center group"
                    >
                      <span className="inline-block w-1.5 h-1.5 bg-yellow-400 rounded-full mr-2 group-hover:scale-150 transition-transform" />
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2 mb-6">
                <Award className="w-5 h-5 text-yellow-400" />
                <h3 className="text-lg font-semibold">Contact</h3>
              </div>
              <div className="space-y-4">
                {[
                  { Icon: Mail, label: "Email", value: "support@mernholidays.com" },
                  { Icon: Phone, label: "Phone", value: "+1 (555) 123-4567" },
                  { Icon: MapPin, label: "Office", value: "123 Travel St, Tourism City" },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className="group cursor-pointer">
                    <div className="flex items-start space-x-3 p-2 rounded-lg transition-all hover:bg-white/5">
                      <Icon className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-xs font-semibold text-white/50 uppercase tracking-wider">{label}</p>
                        <p className="text-white/80 text-sm group-hover:text-white transition-colors">{value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-white/10 pt-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              {/* Copyright */}
              <div className="text-center md:text-left">
                <p className="text-white/60 text-sm flex items-center justify-center md:justify-start gap-1">
                  © 2025 MernHolidays. Made with
                  <Heart className="w-4 h-4 text-red-400" />
                  worldwide.
                </p>
              </div>

              {/* Trust Badges */}
              <div className="flex justify-center gap-4">
                {[
                  { emoji: "🔒", text: "Secure" },
                  { emoji: "✓", text: "Verified" },
                  { emoji: "24/7", text: "Support" },
                ].map(({ emoji, text }) => (
                  <div key={text} className="flex items-center space-x-1 text-xs text-white/60 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                    <span>{emoji}</span>
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex gap-4 justify-center md:justify-end text-sm">
                {[
                  { label: "Privacy", href: "#" },
                  { label: "Terms", href: "#" },
                  { label: "Cookies", href: "#" },
                ].map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    className="text-white/60 hover:text-white transition-colors"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
