import { NextResponse } from 'next/server';
import { main } from '../route';
import prisma from '@/prisma';

export const GET = async (req: Request, res: NextResponse) => {
	try {
		const id = req.url.split('/blog/')[1];
		await main();
		const post = await prisma.post.findFirst({ where: { id } });
		if (!post) {
			return NextResponse.json({ message: 'Not Found' });
		}
		return NextResponse.json({ message: 'Success', post });
	} catch (err) {
		return NextResponse.json({ message: 'Error', err });
	} finally {
		await prisma.$disconnect();
	}
};
