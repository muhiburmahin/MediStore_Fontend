# 💊 MediStore - Online Pharmacy Marketplace

**MediStore** is a sophisticated full-stack e-commerce platform dedicated to seamless medicine discovery, purchasing, and inventory management. It provides a clean, user-centric interface for customers to find healthcare products while empowering sellers with robust tools to manage their catalogs.

## 🚀 Live Demo
Explore the application here: **[MediStore Live](https://medistore-iota.vercel.app)**

---

## ✨ Key Features

### 👥 Multi-Role Architecture
*   **Customer Role**: Enables users to browse medicines, add items to a cart, place orders, and provide product reviews.
*   **Seller Role**: Allows vendors to list new medicines, manage stock levels, and track incoming orders.
*   **Admin Role**: Provides high-level oversight for managing users, categories, and maintaining platform integrity.

### 📦 Medicine & Inventory Management
*   **Dynamic Categorization**: Organizes medicines into types like Tablets, Syrups, or Healthcare for easy navigation.
*   **Real-time Stock Tracking**: Ensures accurate inventory levels and displays manufacturer details for transparency.
*   **User Feedback Loop**: Features a review system where customers can rate medicines, fostering community trust.

### 🛒 Ordering & Workflow
*   **Comprehensive Order Tracking**: Tracks orders through multiple stages: `PLACED`, `PROCESSING`, `SHIPPED`, and `DELIVERED`.
*   **Relational Data Integrity**: Ensures every transaction is linked accurately to the customer and specific medicine via Prisma relations.

---

## 🛠️ Tech Stack

### Frontend
*   **Framework**: Next.js (App Router)
*   **Styling**: Tailwind CSS & shadcn/ui
*   **Language**: TypeScript
*   **State Management**: React Query / Context API

### Backend
*   **Runtime**: Node.js
*   **Framework**: Express.js
*   **ORM**: Prisma
*   **Database**: MySQL (optimized for relational performance)

---

## 🏗️ Database Design (Prisma)
The backend leverages a highly optimized relational schema:
*   **Optimized Performance**: Database indexing is implemented on `name`, `categoryId`, and `sellerId` to ensure rapid search results.
*   **Data Validation**: Uses Enums for `Role`, `orderStatus`, and `UserStatus` to maintain strict data standards.
*   **Session Management**: Includes dedicated models for user sessions, tracking IP addresses and user agents for enhanced security.
*   **Cascading Actions**: Implements `onDelete: Cascade` to ensure data consistency across related tables.

---

## 🚀 Local Installation

1.  **Clone the Repository**:
    ```bash
    git clone [https://github.com/muhiburmahin/medistore-frontend.git](https://github.com/muhiburmahin/medistore-frontend.git)
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Configure Environment**:
    Create a `.env` file and add your `DATABASE_URL` and other necessary API keys.
4.  **Sync Database**:
    ```bash
    npx prisma generate
    ```
5.  **Run Development Server**:
    ```bash
    npm run dev
    ```

---

**Developed by [Md Muhibur Rahman Mahin](https://github.com/muhiburmahin)**
*Full-Stack Web Developer
