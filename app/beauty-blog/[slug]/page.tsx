import Link from "next/link";
import { BLOG_POSTS } from "@/lib/data";
export default function Page({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find(p => p.slug === params.slug) || BLOG_POSTS[0];
  return (
    <div style={{maxWidth:760,margin:"0 auto",padding:"32px 20px"}}>
      <Link href="/beauty-blog" style={{color:"#673ab7",fontWeight:600,fontSize:13,display:"inline-block",marginBottom:20}}>← Back to Blog</Link>
      <span style={{background:post.tagBg,color:post.tagColor,borderRadius:999,padding:"3px 12px",fontSize:11,fontWeight:700,textTransform:"uppercase"}}>{post.tag}</span>
      <h1 style={{fontSize:"clamp(1.6rem,3vw,2.2rem)",fontWeight:900,color:"#1a1a2e",lineHeight:1.2,margin:"14px 0"}}>{post.title}</h1>
      <p style={{fontSize:12,color:"#aaa",marginBottom:24}}>⏱ {post.read} read</p>
      <img src={post.img} alt={post.title} style={{width:"100%",borderRadius:16,marginBottom:28,maxHeight:400,objectFit:"cover"}}/>
      <p style={{fontSize:15,color:"#444",lineHeight:1.8}}>This is a beautiful article about {post.title.toLowerCase()}. Discover expert tips and advice to elevate your beauty routine.</p>
    </div>
  );
}