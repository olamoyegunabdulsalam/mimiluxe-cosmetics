import { supabase } from "./supabase";

// --------- GET ALL PRODUCTS ---------
export const getProducts = async () => {
    const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("getProducts error:", error.message);
        return [];
    }
    return data;
};

// --------- ADD PRODUCT ---------
export const addProduct = async (form) => {
    let imageUrl = null;
    if (form.image) {
        imageUrl = await uploadImage(form.image);
    }

    const { data, error } = await supabase.from("products").insert([
        {
            name: form.name,
            price: form.price,
            category: form.category,
            description: form.description,
            image: imageUrl,
        },
    ]);

    if (error) throw new Error(error.message);
    return data[ 0 ];
};

// --------- UPDATE PRODUCT ---------
export const updateProduct = async (id, form) => {
    let imageUrl = form.imageUrl || null;

    if (form.image) {
        imageUrl = await uploadImage(form.image);
    }

    const { data, error } = await supabase
        .from("products")
        .update({
            name: form.name,
            price: form.price,
            category: form.category,
            description: form.description,
            image: imageUrl,
        })
        .eq("id", id);

    if (error) throw new Error(error.message);
    return data[ 0 ];
};

// --------- DELETE PRODUCT ---------
export const deleteProduct = async (id) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw new Error(error.message);
    return true;
};

// --------- UPLOAD IMAGE ---------
export const uploadImage = async (file) => {
    if (!file) return null;

    const fileName = `products/images/${Date.now()}-${Math.random()
        .toString(36)
        .slice(2)}.${file.name.split(".").pop()}`;

    const { error } = await supabase.storage
        .from("products")
        .upload(fileName, file);

    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from("products").getPublicUrl(fileName);
    return data.publicUrl;
};
