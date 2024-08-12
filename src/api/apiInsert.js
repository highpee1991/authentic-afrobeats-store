// import supabase, { supabaseUrl } from "./supabase";

// export async function AddItem(table, item) {
//   // https://sfqvkwwiriqbaukqmwdc.supabase.co/storage/v1/object/public/wears_styles/cl7.png
//   const img1Name = `${Math.random()}-${item.img1.name}`.replaceAll("/", "");
//   const img1Path1 = `${supabaseUrl}/storage/v1/object/public/wears_styles/${img1Name}`;

//   // const img2Name = `${Math.random()}-${item.img2.name}`.replaceAll("/", "");
//   // const img1Path2 = `${supabaseUrl}/storage/v1/object/public/wears_styles/${img2Name}`;

//   let img2Path = null;
//   let img2Name = null;

//   if (item.img2) {
//     img2Name = `${Math.random()}-${item.img2.name}`.replaceAll("/", "");
//     img2Path = `${supabaseUrl}/storage/v1/object/public/wears_styles/${img2Name}`;
//   }

//   const { data, error } = await supabase
//     .from(table)
//     .insert([{ ...item, img1: img1Path1, img2: img2Path }])
//     .select();

//   if (error) {
//     console.log(error);
//     throw new Error("Product Could not be deleted");
//   }
//   // upload an image
//   const { error: image1Error } = await supabase.storage
//     .from("wears_styles")
//     .upload(img1Name, item.img1);

//   const { error: image2Error } = await supabase.storage
//     .from("wears_styles")
//     .upload(img2Name, item.img2);

//   // delete cabin if there is an error uploading image
//   if (image1Error) {
//     console.log(image1Error);
//     await supabase.from(table).delete().eq("id", data.id);
//     throw new Error("image could not be uploaded item deleted in table");
//   }

//   // delete cabin if there is an error uploading image
//   if (image1Error) {
//     console.log(image2Error);
//     await supabase.from(table).delete().eq("id", data.id);
//     throw new Error("image could not be uploaded item deleted in table");
//   }
//   return data;
// }

/////////////////////////////////////////////////////////////////
import supabase, { supabaseUrl } from "./supabase";

export async function AddItem(table, item) {
  const img1Name = `${Math.random()}-${item.img1.name}`.replaceAll("/", "");
  const img1Path = `${supabaseUrl}/storage/v1/object/public/wears_styles/${img1Name}`;

  let img2Path = null;
  let img2Name = null;

  if (item.img2) {
    img2Name = `${Math.random()}-${item.img2.name}`.replaceAll("/", "");
    img2Path = `${supabaseUrl}/storage/v1/object/public/wears_styles/${img2Name}`;
  }

  const { data, error } = await supabase
    .from(table)
    .insert([{ ...item, img1: img1Path, img2: img2Path }])
    .select();

  if (error) {
    console.log(error);
    throw new Error("Product could not be added.");
  }

  // Upload img1
  const { error: image1Error } = await supabase.storage
    .from("wears_styles")
    .upload(img1Name, item.img1);

  if (image1Error) {
    console.log(image1Error);
    await supabase.from(table).delete().eq("id", data.id);
    throw new Error("Image 1 could not be uploaded. Item deleted in table.");
  }

  // Upload img2 if it exists
  if (img2Name) {
    const { error: image2Error } = await supabase.storage
      .from("wears_styles")
      .upload(img2Name, item.img2);

    if (image2Error) {
      console.log(image2Error);
      await supabase.from(table).delete().eq("id", data.id);
      throw new Error("Image 2 could not be uploaded. Item deleted in table.");
    }
  }

  return data;
}
