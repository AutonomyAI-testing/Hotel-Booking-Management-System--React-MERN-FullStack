/*
 * TEMPORARY FILE - FOR DEMO PURPOSES ONLY
 * This file is temporary and will be deleted once the draft is accepted.
 */

import { QueryClient, QueryClientProvider } from "react-query";
import Home from "./Home";
import { HotelType } from "../../../shared/types";

// Create a mock QueryClient for the Home component demo
const mockQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  },
});

// Mock hotel data matching HotelType structure
const mockHotels: HotelType[] = [
  {
    _id: "hotel1",
    userId: "user123",
    name: "Grand Palace Hotel",
    city: "London",
    country: "United Kingdom",
    description: "Luxury 5-star hotel in the heart of London with stunning views of the Thames",
    type: ["Luxury", "Business"],
    adultCount: 2,
    childCount: 1,
    facilities: ["WiFi", "Parking", "Pool", "Gym", "Restaurant"],
    pricePerNight: 250,
    starRating: 5,
    imageUrls: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop"
    ],
    lastUpdated: new Date("2024-01-15"),
    isActive: true,
    isFeatured: true,
    totalBookings: 245,
    totalRevenue: 61250,
    averageRating: 4.8,
    reviewCount: 156
  },
  {
    _id: "hotel2",
    userId: "user456",
    name: "Seaside Resort & Spa",
    city: "Brighton",
    country: "United Kingdom",
    description: "Beautiful beachfront resort with world-class spa facilities",
    type: ["Resort", "Beach"],
    adultCount: 4,
    childCount: 2,
    facilities: ["WiFi", "Pool", "Spa", "Restaurant", "Beach Access"],
    pricePerNight: 180,
    starRating: 4,
    imageUrls: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop"
    ],
    lastUpdated: new Date("2024-01-20"),
    isActive: true,
    isFeatured: false,
    totalBookings: 189,
    totalRevenue: 34020,
    averageRating: 4.6,
    reviewCount: 98
  },
  {
    _id: "hotel3",
    userId: "user789",
    name: "Mountain View Lodge",
    city: "Edinburgh",
    country: "Scotland",
    description: "Cozy mountain lodge with panoramic views and excellent hiking trails",
    type: ["Lodge", "Family Friendly"],
    adultCount: 3,
    childCount: 2,
    facilities: ["WiFi", "Parking", "Restaurant", "Bar", "Hiking"],
    pricePerNight: 120,
    starRating: 4,
    imageUrls: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop"
    ],
    lastUpdated: new Date("2024-01-22"),
    isActive: true,
    isFeatured: false,
    totalBookings: 134,
    totalRevenue: 16080,
    averageRating: 4.5,
    reviewCount: 67
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
