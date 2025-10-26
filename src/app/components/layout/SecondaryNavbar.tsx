import React from "react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  href: string;
}

const categories: Category[] = [
  { id: "1", name: "Electrónicos", href: "/category/electronics" },
  { id: "2", name: "Ropa", href: "/category/clothing" },
  { id: "3", name: "Hogar", href: "/category/home" },
  { id: "4", name: "Juguetes", href: "/category/toys" },
  // Agrega más categorías según necesites
];

export default function SecondaryNavbar() {
  return (
    <nav className="bg-blue-300 py-2 px-4 md:px-20 shadow-sm font-lobster ">
      <ul className="flex flex-wrap items-center md:justify-start gap-x-4 md:gap-x-6">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={category.href}
              className="text-sm text-gray-700 hover:text-blue-600 hover:underline"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
