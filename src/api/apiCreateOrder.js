import React from "react";
import supabase from "./supabase";

export const createOrder = async (orderDetails) => {
  try {
    // Insert the order into the 'orders' table
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        user_id: orderDetails.user_id, // Assuming you have a user ID from the authenticated user
        total: orderDetails.total,
        amount: orderDetails.total,
        status: "pending",

        // Add other necessary fields
      })
      .select();

    if (orderError) throw orderError;

    const orderId = orderData[0].id;

    // Insert the items into the 'order_items' table
    const items = orderDetails.items.map((item) => ({
      order_id: orderId,
      product_id: item.id,
      product_name: item.name,
      quantity: item.quantity,
      unit_price: item.price,
      image_url: item.image,
    }));

    console.log(orderDetails);

    const { error: itemsError } = await supabase
      .from("order_items")
      .insert(items);

    if (itemsError) throw itemsError;

    return { success: true, order: orderData[0] };
  } catch (error) {
    console.error("Error creating order:", error);
    return { success: false, error };
  }
};
