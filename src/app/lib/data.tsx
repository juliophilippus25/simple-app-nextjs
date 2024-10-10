import { prisma } from "@/app/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const getUsers = async () => {
    const session = await auth();
    if (!session || !session.user || session.user.role !== "admin")
        redirect("/dashboard");

    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        console.log(error);
    }
};

export const getCategories = async () => {
    const session = await auth();
    if (!session || !session.user)
        redirect("/dashboard");

    try {
        const categories = await prisma.category.findMany();
        return categories;
    } catch (error) {
        console.log(error);
    }
};

export const getProductsByUser = async () => {
    const session = await auth();

    if (!session || !session.user) {
        redirect("/dashboard");
    }

    const role = session.user.role;

    try {
        const products = await prisma.product.findMany({
            where: role === "admin" ? {} : { userId: session.user.id },
            include: {
                user: { select: { name: true } },
                category: { select: { name: true } }
            },
        });
        return products;
    } catch (error) {
        console.error("Failed to fetch products:", error);
        throw new Error("Could not retrieve products.");
    }
};