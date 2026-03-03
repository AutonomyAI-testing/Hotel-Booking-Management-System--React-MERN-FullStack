/*
 * TEMPORARY FILE - FOR DEMO PURPOSES ONLY
 * This file is temporary and will be deleted once the draft is accepted.
 */

import { useEffect } from "react";
import Home from "./Home";
import { queryClient } from "../main";
import { HotelType } from "../../../shared/types";

// Mock hotel data with realistic values
const mockHotels: HotelType[] = [
  {
    _id: "1",
    userId: "user123",
    name: "Grand Plaza Hotel",
    city: "London",
    country: "United Kingdom",
    description: "Luxurious 5-star hotel in the heart of London with stunning city views",
    type: ["Luxury", "Business"],
    adultCount: 4,
    childCount: 2,
    facilities: ["WiFi", "Parking", "Pool", "Gym", "Restaurant"],
    pricePerNight: 250,
    starRating: 5,
    imageUrls: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop"
    ],
    lastUpdated: new Date("2024-01-15"),
    totalBookings: 156,
    totalRevenue: 39000,
    averageRating: 4.8,
    reviewCount: 142,
    isActive: true,
    isFeatured: true
  },
  {
    _id: "2",
    userId: "user456",
    name: "Seaside Resort & Spa",
    city: "Miami",
    country: "United States",
    description: "Beautiful beachfront resort with world-class spa facilities",
    type: ["Resort", "Beach"],
    adultCount: 3,
    childCount: 1,
    facilities: ["Beach Access", "Spa", "Pool", "Restaurant", "Bar"],
    pricePerNight: 320,
    starRating: 5,
    imageUrls: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop"
    ],
    lastUpdated: new Date("2024-01-20"),
    totalBookings: 203,
    totalRevenue: 64960,
    averageRating: 4.9,
    reviewCount: 189,
    isActive: true,
    isFeatured: true
  },
  {
    _id: "3",
    userId: "user789",
    name: "Mountain View Lodge",
    city: "Aspen",
    country: "United States",
    description: "Cozy mountain lodge with breathtaking alpine views and ski access",
    type: ["Lodge", "Ski Resort"],
    adultCount: 2,
    childCount: 0,
    facilities: ["WiFi", "Parking", "Ski Storage", "Restaurant", "Fireplace"],
    pricePerNight: 180,
    starRating: 4,
    imageUrls: [
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop"
    ],
    lastUpdated: new Date("2024-01-18"),
    totalBookings: 87,
    totalRevenue: 15660,
    averageRating: 4.6,
    reviewCount: 74,
    isActive: true,
    isFeatured: false
  }
];

const HomeRender = () => {
  useEffect(() => {
    // Mock the fetchQuery data used by Home component
    queryClient.setQueryData("fetchQuery", mockHotels);
  }, []);

  return <Home />;
};

export default HomeRender;
