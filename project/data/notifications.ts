export interface Notification {
  id: string;
  type: 'message' | 'offer' | 'purchase' | 'system';
  title: string;
  message: string;
  time: string;
  read: boolean;
  image?: string;
}

export function getNotifications(): Notification[] {
  return [
    {
      id: '1',
      type: 'message',
      title: 'New Message',
      message: 'Rajesh Kumar has sent you a message about Jersey Cow.',
      time: '2 hours ago',
      read: false,
      image: 'https://images.pexels.com/photos/7730530/pexels-photo-7730530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '2',
      type: 'offer',
      title: 'Price Offer',
      message: 'You received an offer of ₹40,000 for your Jersey Cow listing.',
      time: '5 hours ago',
      read: false,
      image: 'https://images.pexels.com/photos/7730530/pexels-photo-7730530.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '3',
      type: 'system',
      title: 'Listing Approved',
      message: 'Your listing for German Shepherd Puppies has been approved.',
      time: '1 day ago',
      read: true,
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '4',
      type: 'purchase',
      title: 'Purchase Complete',
      message: 'Your purchase of African Grey Parrot has been completed.',
      time: '2 days ago',
      read: true,
      image: 'https://images.pexels.com/photos/1418241/pexels-photo-1418241.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
    },
    {
      id: '5',
      type: 'system',
      title: 'Welcome to PetTrade',
      message: 'Welcome to PetTrade! Start buying and selling animals today.',
      time: '1 week ago',
      read: true
    }
  ];
}