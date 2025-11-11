// src/designTips.ts

interface Tips {
  [key: string]: string[];
}

export const designTips: Tips = {
  default: [
    "Good lighting is key! A mix of overhead, task, and ambient light makes a room feel complete.",
    "Don't be afraid to use dark colors in a small room. It can make the space feel cozy and sophisticated.",
    "Rugs help define a space. Make sure at least the front legs of your furniture are on the rug.",
    "Adding plants is one of the easiest ways to bring life and color to any room.",
    "Measure your space before you buy furniture. It saves a lot of headaches!",
  ],
  "living room": [
    "Your coffee table should be about two-thirds the length of your sofa.",
    "Create conversation zones by grouping furniture together.",
    "A large area rug can anchor your living room and tie all the elements together.",
  ],
  bedroom: [
    "Your bed is the focal point. Use stylish bedding and pillows to make a statement.",
    "Layer your lighting with a soft overhead light and bedside lamps for reading.",
    "A rug under the bed should extend at least 18-24 inches on the sides and foot.",
  ],
  kitchen: [
    "Good task lighting under your cabinets is a game-changer for food prep.",
    "A kitchen island can add valuable counter space and storage.",
    "Don't be afraid to use open shelving for items you use every day.",
  ],
  japandi: [
    "Japandi blends Scandinavian function with Japanese rustic minimalism.",
    "Focus on natural materials: light woods, bamboo, rattan, and paper.",
    "Keep colors neutral. Think beige, stone, and shades of white, with black or dark grey accents.",
  ],
  minimalist: [
    "Minimalism is about 'less is more'. Only keep what is essential and beautiful.",
    "Use a monochrome color palette (like black, white, and grey) to create a clean look.",
    "Focus on clean lines and simple, functional furniture.",
  ],
  industrial: [
    "Industrial style embraces raw materials like exposed brick, concrete, and metal.",
    "Look for furniture made from reclaimed wood and aged metal.",
    "Neutral colors like grey, black, and brown are the foundation of this style.",
  ],
  boho: [
    "Boho is all about a relaxed, layered, and traveled look.",
    "Mix and match patterns, textures, and fabrics. Think tassels, fringe, and macramé.",
    "Incorporate natural elements like wicker furniture, jute rugs, and lots of plants.",
  ],
};
