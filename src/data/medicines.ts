import { Medicine } from "@/types/medicine.type";

export const MOCK_MEDICINES: Medicine[] = [
    {
        id: "1",
        name: "Napa Extend",
        description: "Effective for long-lasting relief from persistent pain and fever.",
        price: 15.00,
        stock: 4,
        manufacturer: "Beximco Pharma",
        images: ["https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=500"],
        categoryId: "cat1",
        sellerId: "sel1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
            id: "cat1",
            name: "Pain Relief",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    },
    {
        id: "2",
        name: "Ace 500mg",
        description: "Fast-acting formula for headaches and body pain.",
        price: 10.00,
        stock: 8,
        manufacturer: "Square Pharma",
        images: ["https://images.unsplash.com/photo-1585435557343-3b092031a831?q=80&w=500"],
        categoryId: "cat2",
        sellerId: "sel2",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
            id: "cat2",
            name: "Fever",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    },
    {
        id: "3",
        name: "Seclo 20mg",
        description: "Relieves stomach acidity and heartburn effectively.",
        price: 7.00,
        stock: 150,
        manufacturer: "Square Pharma",
        images: ["https://images.unsplash.com/photo-1471864190281-ad5f9f07ce4c?q=80&w=500"],
        categoryId: "cat3",
        sellerId: "sel1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
            id: "cat3",
            name: "Gastric",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    },
    {
        id: "4",
        name: "Fexo 120mg",
        description: "Provides relief from seasonal allergies and sneezing.",
        price: 12.00,
        stock: 45,
        manufacturer: "Incepta Pharma",
        images: ["https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?q=80&w=500"],
        categoryId: "cat4",
        sellerId: "sel3",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
            id: "cat4",
            name: "Allergy",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    },
    {
        id: "5",
        name: "Tofen 100ml Syrup",
        description: "Helps manage dry cough and allergic asthma.",
        price: 75.00,
        stock: 20,
        manufacturer: "Incepta Pharma",
        images: ["https://images.unsplash.com/photo-1550572017-ed200f545dec?q=80&w=500"],
        categoryId: "cat5",
        sellerId: "sel2",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
            id: "cat5",
            name: "Cough & Cold",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    },
    {
        id: "6",
        name: "Bextrum Gold",
        description: "A complete multivitamin for overall body health.",
        price: 350.00,
        stock: 60,
        manufacturer: "Beximco Pharma",
        images: ["https://images.unsplash.com/photo-1616670876400-344406691535?q=80&w=500"],
        categoryId: "cat6",
        sellerId: "sel1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
            id: "cat6",
            name: "Supplements",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    },
    {
        id: "7",
        name: "Monas 10mg",
        description: "Controls asthma symptoms and prevents breathlessness.",
        price: 18.00,
        stock: 35,
        manufacturer: "Acme Laboratories",
        images: ["https://images.unsplash.com/photo-1559839734-2b71f1e3c770?q=80&w=500"],
        categoryId: "cat7",
        sellerId: "sel1",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
            id: "cat7",
            name: "Asthma",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    },
    {
        id: "8",
        name: "Zimax 500mg",
        description: "Strong antibiotic for various bacterial infections.",
        price: 35.00,
        stock: 50,
        manufacturer: "Acme Laboratories",
        images: ["https://images.unsplash.com/photo-1576071804486-b8bc22106dbf?q=80&w=500"],
        categoryId: "cat8",
        sellerId: "sel3",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
            id: "cat8",
            name: "Antibiotic",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    },
    {
        id: "9",
        name: "Dettol Liquid 250ml",
        description: "Antiseptic solution for first aid and hygiene.",
        price: 180.00,
        stock: 15,
        manufacturer: "Reckitt",
        images: ["https://images.unsplash.com/photo-1603398938378-e54eab446ddd?q=80&w=500"],
        categoryId: "cat9",
        sellerId: "sel2",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
            id: "cat9",
            name: "Healthcare",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    },
    {
        id: "10",
        name: "Bepanthen Ointment",
        description: "Soothes minor burns and treats skin irritation.",
        price: 450.00,
        stock: 2,
        manufacturer: "Bayer",
        images: ["https://images.unsplash.com/photo-1616670876400-344406691535?q=80&w=500"],
        categoryId: "cat10",
        sellerId: "sel4",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
            id: "cat10",
            name: "Skin Care",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }
    }
];