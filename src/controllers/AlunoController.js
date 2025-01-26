import supabase from '../config/database';
import { Aluno } from '../models/Aluno';
import { Foto } from '../models/Foto';

class AlunoController {
    async index(req, res) {
        const id = req.userId
        try {
            const alunos = await Aluno.findAll(id);
    
            for (const aluno of alunos) {
                const { data: fotos, error } = await supabase
                    .from('fotos')
                    .select('filename, created_at')
                    .eq('aluno_id', aluno.id)
                    .order('created_at', { ascending: false }); // Ordena pela data de criação, mais recente primeiro
    
                if (error) throw error;
    
                fotos.forEach(foto => {
                    foto.url = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/images/${foto.filename}`;
                });
    
                aluno.fotos = fotos;
            }
    
            res.json(alunos);
        } catch (e) {
            res.status(400).json({ errors: [e.message] });
        }
    }
    

    async store(req, res) {
        const { nome, sobrenome, email, idade } = req.body;
        const createdUser = req.userId;
    
        // Verificar se todos os campos obrigatórios estão presentes
        if (!nome || !sobrenome || !email || !idade) {
            return res.status(400).json({
                errors: ['Todos os campos (nome, sobrenome, email, idade) são obrigatórios.'],
            });
        }
    
        try {
            const { data, error } = await supabase
                .from('alunos')
                .insert([{
                    nome,
                    sobrenome,
                    email,
                    idade,
                    created_user: createdUser
                }])
                .single(); // Garanta que um único aluno seja retornado após a inserção

            if (error) {
                console.log('Erro de inserção:', error); // Veja o erro retornado
                return res.status(400).json({ errors: [error.message] });
            }

            console.log('Aluno inserido:', data); // Verifique o aluno inserido
            return res.json(data); // Retorne o aluno inserido

        } catch (e) {
            console.error('Erro ao criar aluno:', e); // Log de erro
            res.status(400).json({ errors: [e.message] });
        }
    }
    
    

    async update(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({
                    errors: ['Faltando Id'],
                });
            }

            const aluno = await Aluno.findByPk(id);
            if (!aluno) {
                return res.status(404).json({
                    errors: ['O aluno não existe'],
                });
            }

            const alunoEdit = await Aluno.update(id, req.body);
            res.json(alunoEdit);
        } catch (e) {
            res.status(400).json({ errors: [e.message] });
        }
    }

    async show(req, res) {
        try {
            const { id } = req.params;
    
            if (!id) {
                return res.status(400).json({ errors: ['Faltando Id'] });
            }
    
            const aluno = await Aluno.findByPk(id);
            if (!aluno) {
                return res.status(404).json({ errors: ['O aluno não existe'] });
            }
    
            const { data: fotos, error } = await supabase
                .from('fotos')
                .select('filename, created_at')
                .eq('aluno_id', aluno.id)
                .order('created_at', { ascending: false }); // Ordena pela data de criação, mais recente primeiro
    
            if (error) throw error;
    
            fotos.forEach(foto => {
                foto.url = `${process.env.SUPABASE_URL}/storage/v1/object/public/uploads/images/${foto.filename}`;
            });
    
            aluno.fotos = fotos;
    
            res.json(aluno);
        } catch (e) {
            res.status(400).json({ errors: [e.message] });
        }
    }
    

    async delete(req, res) {
        try {
            const { id } = req.params;

            if (!id) {
                return res.status(400).json({ errors: ['Faltando Id'] });
            }

            const aluno = await Aluno.findByPk(id);
            if (!aluno) {
                return res.status(404).json({ errors: ['O aluno não existe'] });
            }

            await Aluno.delete(id);
            res.json({ apagado: true });
        } catch (e) {
            res.status(400).json({ errors: [e.message] });
        }
    }
}

export default new AlunoController();
