'use client';
import { useRouter } from 'next/navigation';
import React, { Fragment, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
const postBlog = async ({
	title,
	description,
}: {
	title: string;
	description: string;
}) => {
	const res = await fetch('http://localhost:3000/api/blog', {
		method: 'POST',
		body: JSON.stringify({ title, description }),
		//@ts-ignore
		'Content-Type': 'application/json',
	});
	return res.json();
};

const AddBlog = () => {
	const route = useRouter();
	const titleRef = useRef<HTMLInputElement | null>(null);
	const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (titleRef.current && descriptionRef.current) {
			toast.loading('Sending Request', { id: '1' });
			await postBlog({
				title: titleRef.current?.value,
				description: descriptionRef.current?.value,
			});
			toast.success('Blog posted successfully', { id: '1' });
			route.push('/');
		}
	};
	return (
		<Fragment>
			<Toaster />
			<div className='w-full m-auto fkex my-4 '>
				<div className='flex flex-col justify-center items-center m-auto'>
					<p className='text-2xl text-slate-200 font-bold p-3'>
						Add a Wonderful Blog
					</p>
					<form onSubmit={handleSubmit}>
						<input
							ref={titleRef}
							placeholder='Enter Title'
							type='text'
							className='rounded-md w-full px-4 py-2 my-2'
						/>
						<textarea
							ref={descriptionRef}
							placeholder='Enter Description'
							className='rounded-md px-4 py-2 w-full my-2'
						></textarea>
						<button className='font-semibold px-4 py-2 shadow-xl bg-slate-300 rounded-lg m-auto hover:bg-slate-100 '>
							Submit
						</button>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default AddBlog;
