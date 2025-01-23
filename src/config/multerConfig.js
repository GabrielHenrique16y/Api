import multer from 'multer';
import { extname } from 'path';
import supabase from './database'

// Função para gerar um nome aleatório
const Aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'image/png' && file.mimetype !== 'image/jpeg') {
            return cb(new multer.MulterError('O Arquivo deve ser PNG ou JPG'));
        }

        return cb(null, true);
    },
    storage: multer.memoryStorage(),
    async uploadToSupabase(req, file) {
        const bucket = 'uploads';
        const fileName = `${Date.now()}_${Aleatorio()}${extname(file.originalname)}`;
        
        const { data, error } = await supabase.storage
            .from(bucket)
            .upload(`images/${fileName}`, file.buffer, {
                contentType: file.mimetype,
            });

        if (error) {
            throw new Error(`Erro ao fazer upload para o Supabase: ${error.message}`);
        }

        return {
            fileName,
            url: supabase.storage.from(bucket).getPublicUrl(`images/${fileName}`).data.publicUrl,
        };
    },
};
