import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  Filter,
  MapPin,
  ShoppingCart,
  Book,
  FileText,
  Tag,
  Ticket,
  Heart,
  X,
  Search,
} from "lucide-react";

const categoryIcons: Record<string, JSX.Element> = {
  "All Categories": <Filter size={16} />,
  Books: <Book size={16} />,
  Notes: <FileText size={16} />,
  Electronics: <ShoppingCart size={16} />,
  Coupons: <Tag size={16} />,
  "Event Tickets": <Ticket size={16} />,
  Services: <Tag size={16} />,
  Others: <Tag size={16} />,
};

const categories = [
  "All Categories",
  "Books",
  "Notes",
  "Electronics",
  "Coupons",
  "Event Tickets",
  "Services",
  "Others",
];

const conditions = ["New", "Like New", "Good", "Fair", "Poor"];
const cardBlack = "#000000";

const Marketplace = () => {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [showListingForm, setShowListingForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [listings, setListings] = useState([
    {
      id: 1,
      title: "Skullcandy",
      category: "Electronics",
      price: "Upto 80% off",
      image: "/headphones.png",
      condition: "New",
      location: "Online",
      description:
        "Upto 80% off on Skullcandy headphones and accessories.",
      listedOn: "Official Store",
      seller: "Official Store",
    },
    {
      id: 2,
      title: "Rise Beyond Limits",
      category: "Books",
      price: "Free Download",
      image: "/book1.png",
      condition: "New",
      location: "Online",
      description:
        "'Rise Beyond Limits' is an inspiring book by E SAI ESHWAR that empowers readers to overcome obstacles and unlock their true potential. Dive into motivational stories and practical strategies for personal growth.",
      listedOn: "E SAI ESHWAR",
      seller: "E SAI ESHWAR",
      download: "/RISE BEYOND LIMITS.pdf",
    },
  ]);

  useEffect(() => {}, []);

  const filteredListings = listings.filter((listing) => {
    const matchesCategory =
      selectedCategory === "All Categories" ||
      listing.category === selectedCategory;
    const matchesSearch =
      listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateListing = (formData: any) => {
    setShowListingForm(false);
    const newId = listings.length
      ? Math.max(...listings.map((l) => l.id)) + 1
      : 1;
    const newListing = {
      id: newId,
      title: formData.title as string,
      category: formData.category as string,
      price: formData.price as string,
      image: "/default.png",
      condition: formData.condition as string,
      location: formData.location as string,
      description: formData.description as string,
      listedOn: "Now",
      seller: "You",
    };
    setListings([newListing, ...listings]);
  };

  const pinkButton =
    "bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all duration-300";

  return (
    <div className="min-h-screen w-full bg-black">
      <Navbar />
      <main className="flex flex-col items-center min-h-[calc(100vh-120px)] px-2 md:px-0">
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="w-full max-w-5xl rounded-3xl shadow-xl border border-white/10 mt-10 mb-8 pb-10 px-5 md:px-12 pt-10"
          style={{ background: cardBlack }}
        >
          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between items-center mb-10 gap-6">
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent">
                Student Marketplace
              </h1>
              <p className="text-lg text-white/70 mt-2">
                Buy, sell, and save on student essentials in our digital bazaar.
              </p>
            </div>
            <Button
              onClick={() => setShowListingForm(true)}
              className={`${pinkButton} px-6 py-2 rounded-full`}
            >
              <Plus size={22} /> Post New Listing
            </Button>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-md mx-auto mb-10 relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search for books, electronics, tickets..."
              className="w-full pl-12 pr-4 py-3 rounded-xl bg-black text-white placeholder:text-white/60 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-400">
              <Search size={20} />
            </span>
          </div>

          {/* Create Listing Modal */}
          {showListingForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
              <div
                className="bg-black border border-white/10 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto relative"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 text-white hover:text-red-500 transition-colors"
                  onClick={() => setShowListingForm(false)}
                  aria-label="Close"
                  type="button"
                >
                  <X size={24} />
                </button>
                <h2 className="text-2xl font-bold mb-4 text-white">
                  Create New Listing
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(
                      e.target as HTMLFormElement
                    );
                    handleCreateListing(Object.fromEntries(formData));
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white">
                      Item Title
                    </label>
                    <Input
                      name="title"
                      placeholder="What are you selling?"
                      className="bg-black border-white/10 text-white placeholder:text-white/40"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-white">
                        Category
                      </label>
                      <select
                        name="category"
                        className="w-full rounded-md bg-black border-white/10 p-2 text-sm text-white"
                        required
                      >
                        {categories
                          .filter((cat) => cat !== "All Categories")
                          .map((category) => (
                            <option key={category} value={category}>
                              {category}
                            </option>
                          ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-white">
                        Condition
                      </label>
                      <select
                        name="condition"
                        className="w-full rounded-md bg-black border-white/10 p-2 text-sm text-white"
                        required
                      >
                        {conditions.map((condition) => (
                          <option key={condition} value={condition}>
                            {condition}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1 text-white">
                        Price (₹)
                      </label>
                      <Input
                        name="price"
                        type="text"
                        placeholder="e.g. 500"
                        className="bg-black border-white/10 text-white placeholder:text-white/40"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1 text-white">
                        Location
                      </label>
                      <Input
                        name="location"
                        placeholder="e.g. Campus, Online"
                        className="bg-black border-white/10 text-white placeholder:text-white/40"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 text-white">
                      Description
                    </label>
                    <Textarea
                      name="description"
                      placeholder="Describe your item in detail"
                      className="bg-black border-white/10 text-white placeholder:text-white/40"
                      rows={3}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className={`w-full rounded-full ${pinkButton}`}
                  >
                    Create Listing
                  </Button>
                </form>
              </div>
            </div>
          )}

          {/* Categories */}
          <div className="flex flex-wrap gap-4 justify-center md:justify-start mb-12">
            {categories.map((category) => (
              <button
                key={category}
                className={`flex items-center gap-2 px-6 py-2 rounded-full font-medium text-base shadow transition-all duration-200 ${
                  selectedCategory === category
                    ? `${pinkButton}`
                    : "bg-black text-white/70 border border-white/10 hover:border-pink-500"
                }`}
                onClick={() => setSelectedCategory(category)}
              >
                {categoryIcons[category]}
                {category}
              </button>
            ))}
          </div>

          {/* Listings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredListings.map((listing) => (
              <motion.div
                key={listing.id}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 6px 40px 0 rgba(217,70,239,0.25)",
                }}
                className="rounded-2xl border border-white/10 bg-black shadow-lg p-7 flex flex-col md:flex-row items-center gap-6 relative transition"
              >
                <div className="w-24 h-24 flex items-center justify-center bg-black rounded-full shadow-lg border border-pink-600/30 overflow-hidden">
                  {typeof listing.image === "string" ? (
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-16 h-16 object-contain"
                    />
                  ) : (
                    listing.image
                  )}
                </div>

                <div className="flex-1 w-full md:w-auto mt-5 md:mt-0">
                  <div className="flex items-center justify-between w-full">
                    <h2 className="text-2xl font-semibold text-white">
                      {listing.title}
                    </h2>
                    <span className="font-bold text-lg text-pink-400">
                      {listing.price}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-2 mb-1">
                    <span className="px-3 py-1 rounded-full bg-pink-900 text-pink-200 text-xs font-semibold">
                      {listing.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black text-white/80 text-xs border border-white/10">
                      {listing.condition}
                    </span>
                  </div>
                  <div className="text-white/60 text-sm flex items-center gap-2 mb-1">
                    <MapPin size={14} /> {listing.location}
                  </div>
                  <div className="text-white/40 text-xs mb-2">
                    {listing.listedOn}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-3 mt-3">
                    {listing.category === "Books" && listing.download ? (
                      <a
                        href={listing.download}
                        download
                        className={`px-6 py-2 rounded-full font-semibold ${pinkButton}`}
                      >
                        Download
                      </a>
                    ) : (
                      <a
                        href="https://wa.me/9182591431?text=Hi%2C%20I%20am%20interested%20in%20buying%20the%20Skullcandy%20product%20listed%20on%20StudLYF%20Marketplace."
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-6 py-2 rounded-full font-semibold ${pinkButton}`}
                      >
                        Buy Now
                      </a>
                    )}
                    {listing.category === "Books" && (
                      <button
                        className={`w-9 h-9 flex items-center justify-center rounded-full ${pinkButton}`}
                        title="Favorite"
                      >
                        <Heart size={20} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </main>
      <Footer />
    </div>
  );
};

export default Marketplace;
