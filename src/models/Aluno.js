// src/models/Aluno.js
import supabase from '../config/database';

export const Aluno = {
    async create(data) {
        const { data: aluno, error } = await supabase
            .from('alunos')
            .insert([data]);

        if (error) throw error;
        return aluno;
    },

    async findByPk(id) {
        const { data: aluno, error } = await supabase
            .from('alunos')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw error;
        return aluno;
    },

    async findAll() {
        const { data, error } = await supabase
            .from('alunos')
            .select('*')
            .order('id', { ascending: false });

        if (error) throw error;
        return data;
    },

    async update(id, data) {
        const { data: aluno, error } = await supabase
            .from('alunos')
            .update(data)
            .eq('id', id)
            .single();

        if (error) throw error;
        return aluno;
    },

    async delete(id) {
        const { error } = await supabase
            .from('alunos')
            .delete()
            .eq('id', id);

        if (error) throw error;
        return { deleted: true };
    }
};
