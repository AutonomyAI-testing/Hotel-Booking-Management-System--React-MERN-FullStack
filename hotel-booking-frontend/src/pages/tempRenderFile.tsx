/*
 * TEMPORARY FILE - FOR DEMO PURPOSES ONLY
 * This file is temporary and will be deleted once the draft is accepted.
 */

import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./Home";
import { HotelType } from "../../../shared/types";

// Create a new QueryClient instance for the render file
const mockQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

// Mock hotel data
const mockHotels: HotelType[] = [
  {
    _id: "1",
    userId: "user1",
    name: "Luxury Beach Resort",
    city: "Maldives",
    country: "Maldives",
    description: "Experience paradise at our stunning beachfront resort with crystal clear waters and white sand beaches.",
    type: ["Resort", "Beachfront", "Luxury"],
    adultCount: 4,
    childCount: 2,
    facilities: ["Pool", "Spa", "Restaurant", "Bar", "WiFi", "Gym"],
    pricePerNight: 450,
    starRating: 5,
    imageUrls: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
    ],
    lastUpdated: new Date("2024-01-15"),
    averageRating: 4.8,
    reviewCount: 245,
    isActive: true,
    isFeatured: true
  },
  {
    _id: "2",
    userId: "user2",
    name: "Mountain View Hotel",
    city: "Interlaken",
    country: "Switzerland",
    description: "Breathtaking mountain views and alpine charm in the heart of Switzerland.",
    type: ["Hotel", "Mountain View", "Family Friendly"],
    adultCount: 3,
    childCount: 2,
    facilities: ["WiFi", "Restaurant", "Parking", "Ski Storage"],
    pricePerNight: 280,
    starRating: 4,
    imageUrls: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
    ],
    lastUpdated: new Date("2024-01-12"),
    averageRating: 4.5,
    reviewCount: 189,
    isActive: true,
    isFeatured: false
  },
  {
    _id: "3",
    userId: "user3",
    name: "Downtown Business Suites",
    city: "New York",
    country: "United States",
    description: "Modern suites in the heart of Manhattan, perfect for business travelers.",
    type: ["Business", "City Center", "Modern"],
    adultCount: 2,
    childCount: 0,
    facilities: ["WiFi", "Business Center", "Gym", "Restaurant", "Bar"],
    pricePerNight: 320,
    starRating: 4,
    imageUrls: [
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80"
    ],
    lastUpdated: new Date("2024-01-10"),
    averageRating: 4.3,
    reviewCount: 312,
    isActive: true,
    isFeatured: true
  },
  {
    _id: "4",
    userId: "user4",
    name: "Historic Palace Hotel",
    city: "Prague",
    country: "Czech Republic",
    description: "Experience old-world charm in a beautifully restored historic palace.",
    type: ["Historic", "Luxury", "Boutique"],
    adultCount: 2,
    childCount: 1,
    facilities: ["WiFi", "Restaurant", "Spa", "Bar", "Concierge"],
    pricePerNight: 195,
    starRating: 5,
    imageUrls: [
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80"
    ],
    lastUpdated: new Date("2024-01-08"),
    averageRating: 4.7,
    reviewCount: 167,
    isActive: true,
    isFeatured: false
  },
  {
    _id: "5",
    userId: "user5",
    name: "Tropical Island Paradise",
    city: "Bali",
    country: "Indonesia",
    description: "Secluded villas surrounded by lush tropical gardens and pristine beaches.",
    type: ["Resort", "Tropical", "Romantic"],
    adultCount: 2,
    childCount: 0,
    facilities: ["Pool", "Spa", "Restaurant", "Beach Access", "WiFi"],
    pricePerNight: 380,
    starRating: 5,
    imageUrls: [
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
      "https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800&q=80"
    ],
    lastUpdated: new Date("2024-01-05"),
    averageRating: 4.9,
    reviewCount: 423,
    isActive: true,
    isFeatured: true
  },
  {
    _id: "6",
    userId: "user6",
    name: "Countryside Cottage Inn",
    city: "Cotswolds",
    country: "United Kingdom",
    description: "Charming countryside retreat with cozy rooms and traditional English hospitality.",
    type: ["Inn", "Countryside", "Budget Friendly"],
    adultCount: 2,
    childCount: 2,
    facilities: ["WiFi", "Restaurant", "Parking", "Garden"],
    pricePerNight: 125,
    starRating: 3,
    imageUrls: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&q=80",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80"
    ],
    lastUpdated: new Date("2024-01-03"),
    averageRating: 4.2,
    reviewCount: 98,
    isActive: true,
    isFeatured: false
  }
];

// Pre-populate the query cache with mock data
mockQueryClient.setQueryData("fetchQuery", mockHotels);

const HomeRender = () => {
  return (
    <QueryClientProvider client={mockQueryClient}>
      <Home />
    </QueryClientProvider>
  );
};

export default HomeRender;
