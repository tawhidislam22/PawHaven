// Dummy data for PawHaven application

export const dummyPets = [
  {
    id: 1,
    name: "Buddy",
    species: "Dog",
    breed: "Golden Retriever",
    age: 24, // in months
    gender: "Male",
    size: "Large",
    description: "Buddy is a friendly and energetic Golden Retriever who loves playing fetch and swimming. He's great with kids and other dogs, making him the perfect family companion.",
    medicalHistory: "Fully vaccinated, neutered, microchipped. No known health issues.",
    temperament: "Friendly, energetic, loyal, good with children",
    status: "Available",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop",
    isVaccinated: true,
    isNeutered: true,
    isMicrochipped: true,
    arrivalDate: "2024-01-15"
  },
  {
    id: 2,
    name: "Luna",
    species: "Cat",
    breed: "Persian",
    age: 18,
    gender: "Female",
    size: "Medium",
    description: "Luna is a beautiful Persian cat with a calm and gentle personality. She enjoys quiet spaces and loves to be petted.",
    medicalHistory: "Fully vaccinated, spayed, microchipped. Treated for minor eye infection.",
    temperament: "Calm, gentle, independent, loves attention",
    status: "Available",
    imageUrl: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=300&fit=crop",
    isVaccinated: true,
    isNeutered: true,
    isMicrochipped: true,
    arrivalDate: "2024-02-20"
  },
  {
    id: 3,
    name: "Max",
    species: "Dog",
    breed: "German Shepherd",
    age: 36,
    gender: "Male",
    size: "Large",
    description: "Max is a loyal and intelligent German Shepherd. He's well-trained and would make an excellent guard dog and family protector.",
    medicalHistory: "Fully vaccinated, neutered, microchipped. Hip dysplasia screening clear.",
    temperament: "Loyal, intelligent, protective, trainable",
    status: "Pending",
    imageUrl: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=400&h=300&fit=crop",
    isVaccinated: true,
    isNeutered: true,
    isMicrochipped: true,
    arrivalDate: "2024-01-08"
  },
  {
    id: 4,
    name: "Whiskers",
    species: "Cat",
    breed: "Maine Coon",
    age: 12,
    gender: "Male",
    size: "Large",
    description: "Whiskers is a young Maine Coon with a playful personality. He loves climbing cat trees and playing with toys.",
    medicalHistory: "Fully vaccinated, neutered, microchipped. Recent dental cleaning.",
    temperament: "Playful, curious, social, good with other cats",
    status: "Available",
    imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop",
    isVaccinated: true,
    isNeutered: true,
    isMicrochipped: true,
    arrivalDate: "2024-03-10"
  },
  {
    id: 5,
    name: "Bella",
    species: "Dog",
    breed: "Labrador Mix",
    age: 48,
    gender: "Female",
    size: "Medium",
    description: "Bella is a sweet and gentle Labrador mix who loves cuddles and long walks. She's perfect for someone looking for a calm companion.",
    medicalHistory: "Fully vaccinated, spayed, microchipped. Arthritis medication required.",
    temperament: "Gentle, calm, affectionate, senior dog",
    status: "Available",
    imageUrl: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop",
    isVaccinated: true,
    isNeutered: true,
    isMicrochipped: true,
    arrivalDate: "2024-02-05"
  },
  {
    id: 6,
    name: "Charlie",
    species: "Rabbit",
    breed: "Holland Lop",
    age: 8,
    gender: "Male",
    size: "Small",
    description: "Charlie is an adorable Holland Lop rabbit who loves hopping around and eating fresh vegetables. He's litter trained and very social.",
    medicalHistory: "Vaccinated, neutered. Regular vet checkups.",
    temperament: "Social, gentle, curious, good with handling",
    status: "Available",
    imageUrl: "https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=400&h=300&fit=crop",
    isVaccinated: true,
    isNeutered: true,
    isMicrochipped: false,
    arrivalDate: "2024-03-15"
  }
];

export const dummyApplications = [
  {
    id: 1,
    petId: 1,
    petName: "Buddy",
    applicantName: "John Smith",
    status: "Pending",
    applicationDate: "2024-03-01",
    message: "I would love to adopt Buddy. I have experience with large dogs and a big backyard.",
    livingSituation: "House with large backyard",
    experienceWithPets: "10+ years with dogs",
    hasOtherPets: true,
    otherPetsDescription: "One 5-year-old Golden Retriever named Sam",
    hasChildren: true,
    childrenAges: "8, 12"
  },
  {
    id: 2,
    petId: 2,
    petName: "Luna",
    applicantName: "Sarah Johnson",
    status: "Approved",
    applicationDate: "2024-02-28",
    reviewDate: "2024-03-05",
    message: "Luna seems perfect for my quiet apartment lifestyle.",
    livingSituation: "Apartment, quiet neighborhood",
    experienceWithPets: "5 years with cats",
    hasOtherPets: false,
    hasChildren: false
  },
  {
    id: 3,
    petId: 3,
    petName: "Max",
    applicantName: "Mike Davis",
    status: "Under Review",
    applicationDate: "2024-03-03",
    message: "Looking for a loyal companion and guard dog.",
    livingSituation: "House with fenced yard",
    experienceWithPets: "Experience with German Shepherds",
    hasOtherPets: false,
    hasChildren: true,
    childrenAges: "15, 17"
  }
];

export const dummyDonations = [
  {
    id: 1,
    donorName: "Anonymous",
    amount: 100.00,
    type: "General",
    date: "2024-03-01",
    status: "Completed",
    message: "Keep up the great work!"
  },
  {
    id: 2,
    donorName: "Emily Wilson",
    amount: 250.00,
    type: "Medical",
    date: "2024-02-28",
    status: "Completed",
    message: "For medical expenses of rescue animals"
  },
  {
    id: 3,
    donorName: "Robert Brown",
    amount: 50.00,
    type: "Food",
    date: "2024-03-02",
    status: "Completed",
    message: "Help feed the animals"
  }
];

export const dummyWatchlist = [
  {
    id: 1,
    petId: 1,
    petName: "Buddy",
    petSpecies: "Dog",
    petBreed: "Golden Retriever",
    addedDate: "2024-03-01",
    imageUrl: "https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop"
  },
  {
    id: 2,
    petId: 4,
    petName: "Whiskers",
    petSpecies: "Cat",
    petBreed: "Maine Coon",
    addedDate: "2024-03-05",
    imageUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop"
  }
];

export const dummyUser = {
  id: 1,
  username: "johndoe",
  email: "john.doe@example.com",
  firstName: "John",
  lastName: "Doe",
  phoneNumber: "+1234567890",
  address: "123 Main St, City, State 12345",
  role: "User",
  joinDate: "2024-01-15"
};

export const testimonials = [
  {
    id: 1,
    name: "Sarah Martinez",
    pet: "Adopted Luna",
    message: "PawHaven made the adoption process so smooth and easy. Luna has brought so much joy to our family!",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "David Chen",
    pet: "Adopted Max",
    message: "The staff was incredibly helpful in matching us with the perfect dog. Max is now our loyal companion.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 3,
    name: "Lisa Thompson",
    pet: "Volunteer",
    message: "Volunteering at PawHaven has been incredibly rewarding. The organization truly cares about animal welfare.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }
];

export const stats = {
  totalPetsRescued: 1247,
  petsAdopted: 1089,
  activeDonors: 456,
  volunteersActive: 78,
  totalDonations: 45670.50
};
