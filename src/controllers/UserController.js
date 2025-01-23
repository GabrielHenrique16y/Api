import User from '../models/User';

class UserController {
    async store(req, res) {
        try {
            const user = await User.create(req.body);
            return res.json(user);
        } catch (error) {
            return res.status(400).json({
                errors: [error.message],
            });
        }
    }

    async index(req, res) {
        try {
            const { data: users, error } = await supabase.from('users').select('*');

            if (error) throw new Error(error.message);

            return res.json(users);
        } catch (error) {
            return res.status(400).json({
                errors: [error.message],
            });
        }
    }

    async show(req, res) {
        try {
            const user = await User.findById(req.userId);
            if (!user) {
                return res.status(404).json({
                    errors: ['Usuário não encontrado'],
                });
            }
            return res.json(user);
        } catch (error) {
            return res.status(400).json({
                errors: [error.message],
            });
        }
    }

    async update(req, res) {
        try {
            const user = await User.update(req.userId, req.body);
            return res.json(user);
        } catch (error) {
            return res.status(400).json({
                errors: [error.message],
            });
        }
    }

    async delete(req, res) {
        try {
            const result = await User.delete(req.userId);
            return res.json({ deleted: result });
        } catch (error) {
            return res.status(400).json({
                errors: [error.message],
            });
        }
    }
}

export default new UserController();
