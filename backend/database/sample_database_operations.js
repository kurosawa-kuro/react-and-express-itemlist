import { db } from "./prisma/prismaClient.js";

async function connectToDatabase() {
  try {
    await db.$connect();
    console.log("データベースに接続しました。");
  } catch (e) {
    console.error("データベースに接続できませんでした:", e);
    throw e;
  }
}

// Create
async function createItem(name) {
  if (!name) {
    throw new Error("Name is required");
  }

  return await db.item.create({ data: { name } });
}

// Read
async function getItemById(id) {
  if (!id) {
    throw new Error("ID is required");
  }

  return await db.item.findUnique({ where: { id } });
}

async function getAllItems() {
  return await db.item.findMany();
}

// Update
async function updateItem(id, name) {
  if (!id || !name) {
    throw new Error("Both ID and name are required");
  }

  return await db.item.update({ where: { id }, data: { name } });
}

// Delete
async function deleteItem(id) {
  if (!id) {
    throw new Error("ID is required");
  }

  return await db.item.delete({ where: { id } });
}

// Usage
async function main() {
  // Connect to database
  await connectToDatabase();

  // Create
  const newItem = await createItem("apple");
  console.log("Created item:", newItem);
  const newItem2 = await createItem("apple2");
  console.log("Created item:", newItem2);

  // Read
  const item1 = await getItemById(newItem.id);
  console.log("Retrieved item by ID:", item1);

  const items = await getAllItems();
  console.log("Retrieved all items:", items);

  // Update
  const updatedItem = await updateItem(newItem.id, "orange");
  console.log("Updated item:", updatedItem);

  // Delete
  const deletedItem = await deleteItem(newItem.id);
  console.log("Deleted item:", deletedItem);
}

main()
  .catch((e) => console.error(e))
  .finally(() => db.$disconnect());
