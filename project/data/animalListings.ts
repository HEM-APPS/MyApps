export interface AnimalListing {
  id: string;
  title: string;
  price: number;
  priceType: 'total' | 'per_kg';
  image: string;
  additionalImages: string[];
  category: string;
  breed: string;
  age: string;
  weight: string;
  quantity: number;
  description: string;
  location: string;
  sellerName: string;
  sellerRating: number;
  sellerImage: string;
  featured: boolean;
  createdAt: string;
}

export function getAnimalListings(): AnimalListing[] {
  return [
    {
      id: '1',
      title: 'Healthy Jersey Cow',
      price: 45000,
      priceType: 'total',
      image: 'https://images.pexels.com/photos/7730530/pexels-photo-7730530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      additionalImages: [
        'https://images.pexels.com/photos/6152391/pexels-photo-6152391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        'https://images.pexels.com/photos/4347143/pexels-photo-4347143.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      category: 'cattle',
      breed: 'Jersey',
      age: '3 years',
      weight: '400 kg',
      quantity: 1,
      description: 'Beautiful and healthy Jersey cow. Gives 15 liters of milk daily. Very calm and well-behaved.',
      location: 'Bangalore Rural, Karnataka',
      sellerName: 'Rajesh Kumar',
      sellerRating: 4.8,
      sellerImage: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      featured: true,
      createdAt: '2023-05-15T10:30:00.000Z'
    },
    {
      id: '2',
      title: 'Murrah Buffalo Pair',
      price: 120000,
      priceType: 'total',
      image: 'https://images.pexels.com/photos/1867264/pexels-photo-1867264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      additionalImages: [
        'https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      category: 'cattle',
      breed: 'Murrah',
      age: '4-5 years',
      weight: '500 kg each',
      quantity: 2,
      description: 'Pair of healthy Murrah buffaloes. Each giving 20 liters of milk daily with high fat content.',
      location: 'Mysore, Karnataka',
      sellerName: 'Venkat Reddy',
      sellerRating: 4.5,
      sellerImage: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      featured: false,
      createdAt: '2023-05-20T14:15:00.000Z'
    },
    {
      id: '3',
      title: 'Sirohi Goats',
      price: 15000,
      priceType: 'total',
      image: 'https://images.pexels.com/photos/2255459/pexels-photo-2255459.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      additionalImages: [],
      category: 'goats',
      breed: 'Sirohi',
      age: '1-2 years',
      weight: '35 kg each',
      quantity: 5,
      description: 'Healthy Sirohi goats for sale. Good for milk and meat. Vaccinated and dewormed regularly.',
      location: 'Tumkur, Karnataka',
      sellerName: 'Prakash Singh',
      sellerRating: 4.2,
      sellerImage: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      featured: true,
      createdAt: '2023-06-01T09:00:00.000Z'
    },
    {
      id: '4',
      title: 'German Shepherd Puppies',
      price: 25000,
      priceType: 'total',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      additionalImages: [
        'https://images.pexels.com/photos/333083/pexels-photo-333083.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      category: 'pets',
      breed: 'German Shepherd',
      age: '2 months',
      weight: '5 kg',
      quantity: 3,
      description: 'Pure breed German Shepherd puppies. Vaccinated and dewormed. Parents are show quality dogs.',
      location: 'Bangalore, Karnataka',
      sellerName: 'Arun Sharma',
      sellerRating: 4.9,
      sellerImage: 'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      featured: true,
      createdAt: '2023-06-15T11:45:00.000Z'
    },
    {
      id: '5',
      title: 'African Grey Parrot',
      price: 35000,
      priceType: 'total',
      image: 'https://images.pexels.com/photos/1418241/pexels-photo-1418241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      additionalImages: [],
      category: 'birds',
      breed: 'African Grey',
      age: '1 year',
      weight: '400 g',
      quantity: 1,
      description: 'Talking African Grey Parrot. Hand-raised and very friendly. Comes with cage and accessories.',
      location: 'Chennai, Tamil Nadu',
      sellerName: 'Suresh Kumar',
      sellerRating: 4.7,
      sellerImage: 'https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      featured: false,
      createdAt: '2023-07-10T16:30:00.000Z'
    },
    {
      id: '6',
      title: 'Thoroughbred Horse',
      price: 150000,
      priceType: 'total',
      image: 'https://images.pexels.com/photos/635499/pexels-photo-635499.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      additionalImages: [
        'https://images.pexels.com/photos/1996333/pexels-photo-1996333.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
      ],
      category: 'horses',
      breed: 'Thoroughbred',
      age: '5 years',
      weight: '500 kg',
      quantity: 1,
      description: 'Beautiful thoroughbred horse with excellent temperament. Good for racing and showjumping.',
      location: 'Hyderabad, Telangana',
      sellerName: 'Rahul Mehta',
      sellerRating: 4.6,
      sellerImage: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      featured: true,
      createdAt: '2023-08-05T10:00:00.000Z'
    }
  ];
}