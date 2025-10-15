# 🍜 Wanderlust Kitchen - Food Travel Blog

![App Preview](https://imgix.cosmicjs.com/a38ea850-aa01-11f0-91b0-ed2330567185-photo-1569718212165-3a8278d5f624-1760558444343.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive food travel blog built with Next.js 15 and powered by Cosmic CMS. Explore culinary adventures from street food to fine dining, discover vibrant local markets, and meet passionate food travel writers.

## ✨ Features

- **Magazine-Style Layout**: Beautiful, image-focused design that highlights food photography
- **Category Filtering**: Browse posts by Street Food, Local Markets, and Fine Dining categories
- **Author Profiles**: Meet food travel writers with detailed bios and social connections
- **Responsive Design**: Seamless experience on desktop, tablet, and mobile devices
- **Dynamic Content**: Real-time content updates from Cosmic CMS
- **SEO Optimized**: Built with Next.js 15 for excellent search visibility
- **Image Optimization**: Automatic optimization using imgix CDN
- **Markdown Content**: Rich blog post content with markdown formatting
- **Social Integration**: Twitter and Instagram links for authors
- **Fast Performance**: Optimized with React Server Components

## 📋 Clone this Project

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=68effceeefbff1ff61e4d8be&clone_repository=68effe7bd6cd20ef72108087)

## 📝 Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create a content model for a food travel blog with posts, authors, and categories"

### Code Generation Prompt

> "Based on the content model I created for "Create a content model for a food travel blog with posts, authors, and categories", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## 🛠️ Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **React Markdown** - Markdown rendering
- **Imgix** - Image optimization and transformation

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Cosmic account and bucket

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd wanderlust-kitchen
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. **Run the development server**
```bash
bun dev
```

5. **Open your browser**

Navigate to [http://localhost:3000](http://localhost:3000)

## 📚 Cosmic SDK Examples

### Fetching Posts with Connected Data

```typescript
// Fetch posts with author and category data in a single query
const response = await cosmic.objects
  .find({
    type: 'posts'
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1); // Includes connected author and category objects

const posts = response.objects as Post[];
```

### Fetching a Single Post

```typescript
// Fetch individual post by slug
const response = await cosmic.objects.findOne({
  type: 'posts',
  slug: slug
}).depth(1);

const post = response.object as Post;
```

### Filtering Posts by Category

```typescript
// Get posts for a specific category
const response = await cosmic.objects
  .find({
    type: 'posts',
    'metadata.category': categoryId
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1);
```

## 🔗 Cosmic CMS Integration

This application integrates with your Cosmic bucket using three main content types:

### Posts
- **Fields**: Title, Excerpt, Content (Markdown), Featured Image, Published Date
- **Connections**: Author (object), Category (object)
- **Usage**: Main blog articles with rich content and imagery

### Authors
- **Fields**: Name, Bio, Profile Photo, Twitter Handle, Instagram Handle
- **Usage**: Food travel writer profiles with social connections

### Categories
- **Fields**: Name, Description, Category Image
- **Usage**: Content organization (Street Food, Local Markets, Fine Dining)

### Connected Objects
The application uses Cosmic's `depth` parameter to efficiently load related objects:
- Posts automatically include full author and category data
- Single query replaces multiple API calls
- Improved performance and reduced latency

## 🌐 Deployment Options

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above
2. Connect your GitHub repository
3. Add environment variables in Vercel dashboard
4. Deploy!

### Deploy to Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start)

1. Click the button above
2. Connect your repository
3. Set environment variables
4. Deploy!

### Environment Variables for Production

Make sure to set these in your hosting platform:
- `COSMIC_BUCKET_SLUG`
- `COSMIC_READ_KEY`
- `COSMIC_WRITE_KEY`

## 📱 Features Breakdown

### Homepage
- Featured posts with hero imagery
- Category navigation
- Latest articles grid
- Author showcase

### Post Detail Pages
- Full markdown content rendering
- Author information with social links
- Category badge
- Related posts suggestions
- Optimized featured images

### Category Pages
- Filtered posts by category
- Category description and image
- Responsive grid layout

### Author Pages
- Author biography
- Profile photo
- Social media links
- All posts by author

## 🎨 Design Features

- **Typography**: Clean Inter font family for excellent readability
- **Color Scheme**: Warm earth tones that complement food photography
- **Imagery**: High-quality photos optimized with imgix parameters
- **Layout**: Magazine-style grid with featured content
- **Navigation**: Intuitive category and author filtering
- **Mobile-First**: Fully responsive across all devices

## 📄 License

MIT License - feel free to use this project for your own food travel blog!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using [Cosmic](https://www.cosmicjs.com) - The Headless CMS for modern applications

<!-- README_END -->