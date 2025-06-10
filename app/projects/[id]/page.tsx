// No "use client" — this is a server component by default

type PageProps = {
  params: {
    id: string;
  };
};

export default function Page({ params }: PageProps) {
  const { id } = params;

  return (
    <div>
      <h1>Project ID: {id}</h1>
      <p>This is the project page for the project with ID: {id}</p>
    </div>
  );
}
