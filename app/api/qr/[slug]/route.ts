export type QRContentType = 'url' | 'file' | 'text' | 'menu' | 'form'

export interface QRData {
  id: string
  slug: string
  title: string
  description: string
  contentType: QRContentType
  data: Record<string, any>
  createdAt: string
  ownerName: string
}

const mockQRDatabase: Record<string, QRData> = {
  'restaurant-menu': {
    id: 'qr-001',
    slug: 'restaurant-menu',
    title: 'The Grill House Menu',
    description: 'View our latest menu and specials',
    contentType: 'menu',
    data: {
      restaurant: 'The Grill House',
      address: '123 Main St, Downtown',
      phone: '(555) 123-4567',
      categories: ['Appetizers', 'Main Courses', 'Desserts', 'Beverages'],
    },
    createdAt: '2026-01-15',
    ownerName: 'Restaurant Owner',
  },
  'product-brochure': {
    id: 'qr-002',
    slug: 'product-brochure',
    title: 'Product Brochure 2026',
    description: 'Download our latest product catalog',
    contentType: 'file',
    data: {
      fileName: 'Product-Brochure-2026.pdf',
      fileSize: '2.4 MB',
      fileType: 'PDF',
    },
    createdAt: '2026-01-10',
    ownerName: 'Marketing Team',
  },
  'event-details': {
    id: 'qr-003',
    slug: 'event-details',
    title: 'Tech Conference 2026',
    description: 'Join us for an amazing tech conference',
    contentType: 'text',
    data: {
      eventName: 'Tech Conference 2026',
      date: 'March 15, 2026',
      time: '9:00 AM - 5:00 PM',
      location: 'Convention Center, Room A',
      speakers: '50+ industry experts',
      content: 'Join us for an amazing tech conference with speakers from leading companies. Network with professionals and learn about the latest trends in technology.',
    },
    createdAt: '2026-01-05',
    ownerName: 'Event Manager',
  },
  'customer-feedback': {
    id: 'qr-004',
    slug: 'customer-feedback',
    title: 'Customer Feedback Form',
    description: 'Help us improve - share your feedback',
    contentType: 'form',
    data: {
      formTitle: 'Customer Feedback Form',
      fields: [
        { name: 'name', label: 'Your Name', type: 'text', required: true },
        { name: 'email', label: 'Email Address', type: 'email', required: true },
        { name: 'rating', label: 'Rating', type: 'select', options: ['5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'], required: true },
        { name: 'feedback', label: 'Your Feedback', type: 'textarea', required: true },
      ],
    },
    createdAt: '2026-01-20',
    ownerName: 'Customer Success Team',
  },
  'website-redirect': {
    id: 'qr-005',
    slug: 'website-redirect',
    title: 'QRFlow Website',
    description: 'Visit our website',
    contentType: 'url',
    data: {
      url: 'https://qrflow.io',
      displayUrl: 'qrflow.io',
      title: 'QRFlow - QR Code Management Platform',
    },
    createdAt: '2026-01-12',
    ownerName: 'Web Team',
  },
}

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const { slug } = params

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  if (!slug || !mockQRDatabase[slug]) {
    return Response.json(
      { error: 'QR code not found' },
      { status: 404 }
    )
  }

  return Response.json(mockQRDatabase[slug])
}
