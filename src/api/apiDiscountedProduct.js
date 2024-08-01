import React from "react";
import supabase from "./supabase";

export async function getDiscountedProducts() {
  const tables = [
    "authentic_african_wear",
    "beauty_and_household",
    "condiments",
    "drink_beverage",
    "fruits_and_vegetables",
    "grain_flour_cereal",
    "meat_sea_food",
    "more",
    "snack_confectionaries",
  ];

  const allData = [];
  let errorOccured = false;

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select("*");

    if (error) {
      errorOccured = true;
      break;
    }
    allData.push(...data);
  }

  if (errorOccured) {
    throw new Error("Could not load all products data");
  }

  return allData.filter((item) => item.discount_price);
}
