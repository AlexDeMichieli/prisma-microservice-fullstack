const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
    const electronics = await prisma.category.create({
        data: {
            name: 'Electronics'
        }
    });

    const books = await prisma.category.create({
        data: {
            name: 'Books'
        }
    });

    const products = [
        {
            name: 'Laptop',
            description: "Best performing laptop",
            price: 1000,
            quantity: 10,
            categoryId: electronics.id
        },
        {
            name: 'Tablet',
            description: "Best performing tablet",
            price: 500,
            quantity: 5,
            categoryId: electronics.id
        },
        {
            name: 'Headphones',
            description: "Best performing headphones",
            price: 100,
            quantity: 20,
            categoryId: electronics.id
        },
        {
            name: 'Javascript Basics',
            description: "Learn Javascript from scratch",
            quantity: 20,
            price: 20,
            categoryId: books.id
        }
    ];

    for (const product of products) {
        await prisma.product.create({
            data: {
                name: product.name,
                description: product.description,
                price: product.price,
                quantity: product.quantity,
                category: {
                    connect: { id: product.categoryId }
                }
            }
        });
    }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
