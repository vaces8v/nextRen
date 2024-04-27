'use client'
import  Link  from 'next/link';

export default function Notfound() {
  return (
    <>
			<Link href={'/'}>
				<h1>Этот раздел еще в разработке</h1>
				<h2>Нажмите на этот текст, чтобы венруться</h2>
			</Link>
    </>
  );
}
