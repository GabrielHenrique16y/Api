// src/models/Aluno.js
import supabase from '../config/database';

export const Aluno = {
    async create(data, id) {
        const { data: aluno, error } = await supabase
            .from('alunos')
            .insert([data, id]);

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

    async findAll(created_user) {
        const { data, error } = await supabase
            .from('alunos')
            .select('*')
            .eq('created_user', created_user)
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
