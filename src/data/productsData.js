// This file contains ALL product information
// Think of it as your product database

// STEP 1: Import images based on your actual files
import orangeImg from '../assets/images/orange.png'
import avocadoImg from '../assets/images/avocado.png'
import bananaImg from '../assets/images/banana.png'
import berryImg from '../assets/images/blueberry.png'
import grapeImg from '../assets/images/grapefruit.png'
import watermelonImg from '../assets/images/watermelon.png'
import pineappleImg from '../assets/images/pineapple.png'
import mangoImg from '../assets/images/mango.png'
import strawberryImg from '../assets/images/strawberry.png'

// STEP 2: Define your products array with descriptions matching the images
export const products = [
  {
    id: 1,
    name: "Orange Sunshine",
    price: 5.99,
    description: "Freshly squeezed oranges with a hint of honey. Pure vitamin C boost!",
    longDescription: "Made from organic Valencia oranges, cold-pressed to preserve all the natural vitamins and minerals. No added sugar, no preservatives - just pure orange goodness. Each bottle contains 5-6 fresh oranges.",
    image: orangeImg,
    category: "citrus",
    size: "16oz",
    calories: 180,
    benefits: ["🧡 Immune boosting", "⚡ Energy booster", "✨ Vitamin C rich"]
  },
  {
    id: 2,
    name: "Avocado Dream",
    price: 7.99,
    description: "Creamy avocado blended with almond milk and honey. Rich and satisfying!",
    longDescription: "A unique and creamy juice experience! We blend ripe avocados with organic almond milk, a touch of honey, and vanilla. Perfect for breakfast or post-workout recovery. Packed with healthy fats and potassium.",
    image: avocadoImg,
    category: "creamy",
    size: "16oz",
    calories: 280,
    benefits: ["🥑 Healthy fats", "💪 Muscle recovery", "✨ Skin glowing"]
  },
  {
    id: 3,
    name: "Banana Bliss",
    price: 5.99,
    description: "Sweet banana blended with almond milk and cinnamon. A satisfying treat!",
    longDescription: "Tastes like a dessert but packed with nutrition! Fresh bananas blended with organic almond milk, a dash of cinnamon, and vanilla. No added sugar - the bananas provide all the sweetness you need.",
    image: bananaImg,
    category: "creamy",
    size: "16oz",
    calories: 220,
    benefits: ["🍌 Potassium rich", "⚡ Energy boost", "😋 Naturally sweet"]
  },
  {
    id: 4,
    name: "Berry Bliss",
    price: 7.99,
    description: "Strawberry, blueberry, raspberry, and apple. Antioxidant powerhouse!",
    longDescription: "A burst of berry goodness in every sip! We combine fresh strawberries, blueberries, and a touch of apple for natural sweetness. Cold-pressed to preserve every antioxidant. Great for heart health and brain function.",
    image: berryImg,
    category: "berry",
    size: "16oz",
    calories: 160,
    benefits: ["🫐 Antioxidant rich", "❤️ Heart health", "🧠 Brain booster"]
  },
  {
    id: 5,
    name: "Grapefruit Zing",
    price: 5.99,
    description: "Tangy grapefruit with a hint of honey and mint. Refreshing and energizing!",
    longDescription: "Start your morning with this metabolism-boosting juice! Fresh pink grapefruit, a touch of honey to balance the tartness, and fresh mint leaves. Cold-pressed to preserve the natural enzymes that aid digestion.",
    image: grapeImg,
    category: "citrus",
    size: "16oz",
    calories: 140,
    benefits: ["🔥 Metabolism boost", "💛 Vitamin C", "🌿 Digestion aid"]
  },
  {
    id: 6,
    name: "Watermelon Mint Cooler",
    price: 5.99,
    description: "Fresh watermelon, mint, and lime. Summer in a bottle!",
    longDescription: "The ultimate summer refresher! We cold-press juicy watermelons with fresh mint leaves and a squeeze of lime. Naturally sweet, incredibly hydrating, and only 120 calories per bottle. Perfect post-workout or hot day.",
    image: watermelonImg,
    category: "seasonal",
    size: "16oz",
    calories: 120,
    benefits: ["💧 Hydrating", "💪 Muscle recovery", "🌿 Refreshing"]
  },
  {
    id: 7,
    name: "Pineapple Paradise",
    price: 6.99,
    description: "Sweet pineapple with coconut water and ginger. Tropical escape in a bottle!",
    longDescription: "Close your eyes and you're on a tropical beach! We blend fresh pineapple with hydrating coconut water and a hint of ginger for zip. Packed with bromelain, an enzyme that aids digestion and reduces inflammation.",
    image: pineappleImg,
    category: "tropical",
    size: "16oz",
    calories: 190,
    benefits: ["🍍 Digestive aid", "🌴 Anti-inflammatory", "💧 Hydrating"]
  },
  {
    id: 8,
    name: "Mango Tango",
    price: 6.99,
    description: "Ripe mangoes with orange and lime. A taste of the tropics!",
    longDescription: "Sweet, tangy, and absolutely delicious! We use only the ripest mangoes, combined with fresh orange juice and a squeeze of lime. Rich in Vitamin A and C, this juice supports eye health and immunity.",
    image: mangoImg,
    category: "tropical",
    size: "16oz",
    calories: 200,
    benefits: ["👁️ Eye health", "🛡️ Immune support", "✨ Skin health"]
  },
  {
    id: 9,
    name: "Strawberry Fields",
    price: 6.99,
    description: "Fresh strawberries with apple and mint. Sweet and refreshing!",
    longDescription: "Taste the freshness of just-picked strawberries! We cold-press organic strawberries with a touch of apple for sweetness and fresh mint for brightness. Packed with Vitamin C and antioxidants.",
    image: strawberryImg,
    category: "berry",
    size: "16oz",
    calories: 150,
    benefits: ["🍓 Antioxidant rich", "❤️ Heart health", "✨ Skin glowing"]
  }
]

// Helper function to get a single product by ID
export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id))
}

// Helper function to get products by category
export const getProductsByCategory = (category) => {
  if (category === 'all') return products
  return products.filter(product => product.category === category)
}