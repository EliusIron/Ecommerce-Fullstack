import React from "react";
import Link from "next/link";
import WishlistIcon from "../icons/WishlistIcon";
import Orders from "../icons/orders";
import Cart from "../icons/Cart";
import Sign from "../icons/Sing";

import FloatingLabelSearch from "../ui/FloatingLabelSearch";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between font-bold py-4 px-20 border-b border-gray-200 shadow-md mt-1.5 ">
      <div>
        <Link href={"h"}>Logo</Link>
      </div>
      <div className="relative w-1/3">
        <FloatingLabelSearch
          id="navbar-search"
          placeholder="Buscar productos..."
        />
      </div>
      <div className="flex items-center gap-x-6">
        <Link href="/orders" className="text-sm hover:no-underline">
          <div className=" flex flex-col items-center gap-x-2">
            <Orders></Orders>
            <div>orders</div>
          </div>
        </Link>

        <Link href="/wishlist" className="text-sm hover:no-underline">
          <div className=" flex flex-col items-center ">
            <WishlistIcon></WishlistIcon>
            <div>wishlist</div>
          </div>
        </Link>
        <Link href="/cart" className="text-sm hover:no-underline">
          <div>
            <div className="flex flex-col items-center ">
              <Cart></Cart>
              <div>cart</div>
            </div>
          </div>
        </Link>
        <Link
          href="/signin"
          className="bg-black text-white px-2 py-2 rounded-md text-sm font-medium hover:bg-gray-800"
        >
          <Sign></Sign>
        </Link>
      </div>
    </nav>
  );
}
