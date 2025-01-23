import jwt from 'jsonwebtoken';
import User from '../models/User';

class TokenController {
    async store(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(401).json({
                    errors: ['Credenciais inválidas'],
                });
            }

            const user = await User.findByEmail(email);

            if (!user) {
                return res.status(401).json({
                    errors: ['Usuário não existe'],
                });
            }

            if (!(await User.passwordIsValid(password, user.password_hash))) {
                return res.status(401).json({
                    errors: ['Senha inválida'],
                });
            }

            const { id } = user;
            const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
                expiresIn: process.env.TOKEN_EXPIRANTION,
            });

            return res.json({
                token,
                user: { id, email, nome: user.nome },
            });
        } catch (error) {
            return res.status(400).json({
                errors: [error.message],
            });
        }
    }
}

export default new TokenController();
