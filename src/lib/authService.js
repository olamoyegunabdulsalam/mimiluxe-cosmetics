import { supabase } from "./supabase";

// --------- LOGIN ---------
export const login = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw new Error(error.message);
    return data.user;
};

// --------- LOGOUT ---------
export const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
};

// --------- CHECK AUTH ---------
export const checkAuth = async () => {
    const user = supabase.auth.getUser();
    return user;
};
