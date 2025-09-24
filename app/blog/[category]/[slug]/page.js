export default function BlogPost({ params }) {
  return (
    <section>
      <h1>Blog Post</h1>
      <p>Category: {params.category}</p>
      <p>Slug: {params.slug}</p>
    </section>
  );
}
