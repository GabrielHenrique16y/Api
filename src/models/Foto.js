import supabase from '../config/database';

export const Foto = {
    async create(data) {
        const { data: foto, error } = await supabase
            .from('fotos')
            .insert([data]);

        if (error) throw error;
        return foto;
    },

    generateUrl(filename) {
        return `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/images/${filename}`;
    },
};
