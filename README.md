# Ecommerce Hackathon Website Clone Of HEKTO

This is a fully responsive, feature-rich e-commerce website built during a hackathon using **Next.js**. The website includes dynamic components, engaging design, and smooth user experiences for showcasing and purchasing products.

## Features
- **Dynamic Navbar**: A multi-layered navbar with announcement bar, logo, search functionality, and navigation links.
- **Hero Carousel**: Auto-sliding product showcase with manual navigation controls.
- **Product Grids**: Multiple sections showcasing featured, latest, discounted, and categorized products with hover effects and shadow animations.
- **Dynamic Pages**: Includes detailed product pages, blog lists, shop grids, cart and checkout pages, and more.
- **Zoom Functionality**: Zoom in on product images on hover and open a detailed modal view of the product for a closer look.
- **Add-to-Cart Functionality**: Add products to the cart, and dynamically display the cart items. When the cart is empty, a message like "Your cart is empty" will be shown.
- **Redux for State Management**: Centralized cart management using Redux to handle actions like adding, removing, and clearing items from the cart.
- **Newsletter Section**: Integrated subscription form with an elegant overlay design.
- **Footer**: Organized links to pages, customer care, categories, and social media.

## Components Overview
### Navbar Components
1. **Announcement Bar**: Displays top announcements.
2. **Main Navbar**: Contains logo, links, and a search bar.

### Homepage Components
1. **Hero Section**: Auto-sliding carousel with manual controls for showcasing top products.
2. **Featured Products**: Grid display of products with image, title, price, and an add-to-cart button.
3. **Latest Products**: Includes hover effects, sale tags, and interactive icons.
4. **Shopex Offers**: 3D hover effects on offer cards.
5. **Hero Section 2**: A promotional image with CTA.
6. **Discount Sections**: Products with discount prices and overlay effects.
7. **Categories & Brands**: Organized sections of categories and brands.
8. **Blog**: Blog post grids with image, author, date, title, paragraph, and a read more button.

### Pages Overview
- **Contact Page**: Includes a background image, heading, paragraph, and a subscription button.
- **Shop Pages**: Various layouts like grid, list, sidebar, and detailed views.
- **FAQ Page**: Accordion-style Q&A sections.
- **Cart and Checkout Pages**: Interactive and responsive forms for the purchase process, including live updates for cart totals and item counts.

## Libraries & Packages Used
- `react-icons`
- `@fortawesome/react-fontawesome`
- `@fortawesome/free-solid-svg-icons`
- `@fortawesome/free-brands-svg-icons`
- `react-responsive-carousel`
- `shadcn/ui`
- `tailwindcss`
- `@reduxjs/toolkit react-redux`
- `react-toastify`

## How to Run Locally

### Prerequisites
Ensure you have the following installed:
- **Node.js** (v16 or later)
- **npm** or **yarn**

### Installation Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/Mazz-Ather/Ecommerce-Hackathon
   cd Ecommerce-Hackathon
   npm install
   npm run dev
   ```

## Additional Details
- The **zoom functionality** enhances the user experience by allowing customers to closely inspect products through hover and modal views.
- The **add-to-cart functionality** ensures seamless shopping by dynamically updating the cart's state. An empty cart displays "Your cart is empty," while the total price and item count update automatically.
- **Redux state management** provides robust handling of cart actions, enabling scalable and maintainable code for e-commerce logic.

