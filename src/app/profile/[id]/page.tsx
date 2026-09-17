
async function page({ params }:{ params:Promise< { id: string }> }) {
  const {id} = await params;
  return (
    <div className="flex flex-col justify-center items-center min-h-screen py-2">
      <h1 className="text-4xl">Profile Page</h1>
      <hr />
      <h2 className="p-3 bg-green-500 text-black rounded">{id}</h2>
    </div>
  );
}

export default page;
