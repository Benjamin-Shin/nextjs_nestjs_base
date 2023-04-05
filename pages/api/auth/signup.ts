import { NextApiRequest, NextApiResponse } from 'next';
import bcryptjs from 'bcryptjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return;
    }

    const data = req.body;
    const { name, email, password } = data;

    // Next.js에서 Nest.js API를 호출
    const result = await fetch(process.env.NESTAUTH_URL + '/api/user/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: email, name: name, password: password }),
    });

    if (result) {
        res.status(201).json({ message: 'Created user!', error: false });
    } else {
        res.status(422).json({ message: 'Prisma error occured', error: true })
    }
}

export default handler;