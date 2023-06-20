import prisma from '@/prisma';
import { NextResponse } from 'next/server';

export async function main() {
	try {
		await prisma.$connect();
	} catch (err) {
		return Error('Database connection Unsuccessfull');
	}
}

export const GET = async (req: Request, res: NextResponse) => {
	try {
		await main();
		const posts = await prisma.post.findMany();
		return NextResponse.json({ message: 'Success', posts });
	} catch (err) {
		return NextResponse.json({ message: 'Error', err });
	} finally {
		await prisma.$disconnect();
	}
};

export const POST = async (req: Request, res: NextResponse) => {
	try {
		const { title, description } = await req.json();
		await main();
		const post = await prisma.post.create({ data: { title, description } });
		return NextResponse.json({ message: 'Success', post });
	} catch (err) {
		return NextResponse.json({ message: 'Error', err });
	} finally {
		await prisma.$disconnect();
	}
};
