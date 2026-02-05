import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import dbConnect from "@/lib/db";
import Cart from "@/models/Cart";
import Product from "@/models/Product";

export async function GET(req) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== "customer") {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    await dbConnect();

    let cart = await Cart.findOne({ user: token.sub })
      .populate("items.product");

    if (!cart) {
      cart = await Cart.create({
        user: token.sub,
        items: [],
      });
    }

    return NextResponse.json(cart);

  } catch (error) {
    console.error("Get cart error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}
export async function POST(req) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== "customer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity = 1 } = await req.json();

    if (quantity < 1) {
      return NextResponse.json(
        { error: "Invalid quantity" },
        { status: 400 }
      );
    }

    await dbConnect();

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    if (product.stock === 0) {
      return NextResponse.json(
        { error: "Product is out of stock" },
        { status: 400 }
      );
    }

    let cart = await Cart.findOne({ user: token.sub });

    if (!cart) {
      if (quantity > product.stock) {
        return NextResponse.json(
          { error: `Only ${product.stock} items available` },
          { status: 400 }
        );
      }

      cart = await Cart.create({
        user: token.sub,
        items: [{ product: productId, quantity }],
      });

      return NextResponse.json(cart);
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      const newQty = cart.items[itemIndex].quantity + quantity;

      if (newQty > product.stock) {
        return NextResponse.json(
          { error: `Only ${product.stock} items available` },
          { status: 400 }
        );
      }

      cart.items[itemIndex].quantity = newQty;
    } else {
      if (quantity > product.stock) {
        return NextResponse.json(
          { error: `Only ${product.stock} items available` },
          { status: 400 }
        );
      }

      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    return NextResponse.json(cart);

  } catch (error) {
    console.error("Add to cart error:", error);
    return NextResponse.json(
      { error: "Failed to add product" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const token = await getToken({ req });

    if (!token || token.role !== "customer") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId, quantity } = await req.json();

    if (quantity < 1) {
      return NextResponse.json(
        { error: "Quantity must be at least 1" },
        { status: 400 }
      );
    }

    await dbConnect();

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    if (product.stock === 0) {
      return NextResponse.json(
        { error: "Product is out of stock" },
        { status: 400 }
      );
    }

    if (quantity > product.stock) {
      return NextResponse.json(
        { error: `Only ${product.stock} items available` },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ user: token.sub });

    if (!cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) {
      return NextResponse.json(
        { error: "Product not in cart" },
        { status: 404 }
      );
    }

    item.quantity = quantity;
    await cart.save();

    return NextResponse.json(cart);

  } catch (error) {
    console.error("Update cart error:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}
