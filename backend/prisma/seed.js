const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const popularBrands = [
  'Nike', 'Adidas', 'Apple', 'Samsung', 'Levi\'s', 'Zara', 'H&M', 'Uniqlo',
  'Amazon', 'ASOS', 'Topshop', 'River Island', 'New Look', 'Primark',
  'Next', 'Marks & Spencer', 'John Lewis', 'Selfridges', 'Harrods',
  'Gucci', 'Louis Vuitton', 'Chanel', 'Prada', 'Versace', 'Armani',
  'Tommy Hilfiger', 'Calvin Klein', 'Ralph Lauren', 'Hugo Boss',
  'Under Armour', 'Puma', 'Reebok', 'Converse', 'Vans'
];

async function main() {
  console.log('🌱 Seeding database...');

  // Create brands
  for (const brandName of popularBrands) {
    await prisma.brand.upsert({
      where: { name: brandName },
      update: {},
      create: { name: brandName }
    });
  }

  console.log(`✅ Created ${popularBrands.length} brands`);
  console.log('🎉 Database seeded successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
