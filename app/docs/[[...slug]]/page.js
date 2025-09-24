export default function DocsPage({ params }) {
  const parts = params.slug || [];
  return (
    <section>
      <h1>Docs</h1>
      {parts.length === 0 ? (
        <p>No section selected</p>
      ) : (
        <p>Path: {parts.join(" / ")}</p>
      )}
    </section>
  );
}
