'use client';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useRef } from 'react';
import { Toaster, toast } from 'react-hot-toast';
type UpdateBlogParams = {
	title: string;
	description: string;
	id: string;
};
const updateBlog = async (data: UpdateBlogParams) => {
	const res = await fetch(`http://localhost:3000/api/blog/${data.id}`, {
		method: 'PUT',
		body: JSON.stringify({ title: data.title, description: data.description }),
		//@ts-ignore
		'Content-Type': 'application/json',
	});
	return res.json();
};

const getBlogById = async (id: string) => {
	const res = await fetch(`http://localhost:3000/api/blog/${id}`);
	const data = await res.json();
	return data.post;
};

const EditBlog = ({ params }: { params: { id: string } }) => {
	const route = useRouter();
	console.log(params.id);

	const titleRef = useRef<HTMLInputElement | null>(null);
	const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

	useEffect(() => {
		toast.loading('Fetchin Blog Details', { id: '1' });
		getBlogById(params.id)
			.then((data) => {
				if (titleRef.current && descriptionRef.current) {
					titleRef.current.value = data.title;
					descriptionRef.current.value = data.description;
					toast.success('Fetching Complete', { id: '1' });
				}
			})
			.catch((err) => {
				console.log(err);
				toast.error('Error fetching blog', { id: '1' });
			});
	}, []);
	const deleteBlog = async (id: string) => {
		const res = await fetch(`http://localhost:3000/api/blog/${id}`, {
			method: 'DELETE',
			//@ts-ignore
			'Content-Type': 'application/json',
		});
		return res.json();
	};

	const handleDelete = async (e: any) => {
		e.preventDefault();
		toast.loading('Deleting Blog', { id: '2' });
		await deleteBlog(params.id);
		toast.success('Blog Deleted', { id: '2' });
		route.push('/');
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		if (titleRef.current && descriptionRef.current) {
			toast.loading('Sending Request', { id: '1' });
			await updateBlog({
				title: titleRef.current?.value,
				description: descriptionRef.current?.value,
				id: params.id,
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
						Edit a Wonderful Blog
					</p>
					<form>
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
						<div className='flex '>
							<button
								onClick={handleSubmit}
								className='font-semibold px-4 py-2 shadow-xl bg-slate-300 rounded-lg m-auto hover:bg-slate-100 '
							>
								Update
							</button>
							<button
								onClick={handleDelete}
								className='font-semibold px-4 py-2 shadow-xl bg-red-500 rounded-lg m-auto  hover:bg-red-300 '
							>
								Delete
							</button>
						</div>
					</form>
				</div>
			</div>
		</Fragment>
	);
};

export default EditBlog;
