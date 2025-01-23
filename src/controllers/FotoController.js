import multer from 'multer';
import multerConfig from '../config/multerConfig';
import supabase from '../config/database';

const upload = multer(multerConfig).single('foto');

class FotoController {
    async store(req, res) {
        return upload(req, res, async (err) => {
            if (err) {
                return res.status(400).json({
                errors: [err.code],
                });
            }

            try {
                const { aluno_id } = req.body;

                const { data: aluno, error: alunoError } = await supabase
                    .from('alunos')
                    .select('*')
                    .eq('id', aluno_id)
                    .single();

                if (alunoError || !aluno) {
                    return res.status(400).json({
                        errors: ['Aluno não encontrado'],
                    });
                }

                const { originalname } = req.file;
                const result = await multerConfig.uploadToSupabase(req, req.file);

                if (!result || result.error) {
                    return res.status(400).json({
                        errors: ['Erro ao fazer upload da foto'],
                    });
                }

                const url = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/images/${result.fileName}`;

                const { data: foto, error: fotoError } = await supabase
                    .from('fotos')
                    .insert({
                        originalname,
                        filename: result.fileName,
                        aluno_id,
                    })
                    .select()
                    .single();

                if (fotoError) {
                    return res.status(400).json({
                        errors: [fotoError.message],
                    });
                }

                return res.json({
                    ...foto,
                    url,
                });
            } catch (e) {
                console.error('Erro ao salvar foto:', e);
                return res.status(500).json({
                    errors: ['Erro inesperado ao salvar a foto.'],
                });
            }
        });
    }
}

export default new FotoController();
