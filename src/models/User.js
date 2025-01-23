import bcryptjs from 'bcryptjs';
import supabase from '../config/database';

class User {
    static async create(data) {
        if (data.password) {
            data.password_hash = await bcryptjs.hash(data.password, 8);
            delete data.password;
        }

        const { data: newUser, error } = await supabase
            .from('users') // Nome da tabela no Supabase
            .insert(data)
            .select();

        if (error) throw new Error(error.message);

        return newUser[0];
    }

    static async findOne(where) {
        const { id, email } = where;
    
        const { data, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .eq('email', email)
            .single();
    
        if (error) {
            throw new Error(error.message);
        }
    
        return data;
    }

    static async findById(id) {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('id', id)
            .single();

        if (error) throw new Error(error.message);

        return user;
    }

    static async findByEmail(email) {
        const { data: user, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', email)
            .single();

        if (error) throw new Error(error.message);

        return user;
    }

    static async update(id, data) {
        if (data.password) {
            data.password_hash = await bcryptjs.hash(data.password, 8);
            delete data.password;
        }

        const { data: updatedUser, error } = await supabase
            .from('users')
            .update(data)
            .eq('id', id)
            .select();

        if (error) throw new Error(error.message);

        return updatedUser[0];
    }

    static async delete(id) {
        const { error } = await supabase
            .from('users')
            .delete()
            .eq('id', id);

        if (error) throw new Error(error.message);

        return true;
    }

    static async passwordIsValid(password, password_hash) {
        return bcryptjs.compare(password, password_hash);
    }
}

export default User;
