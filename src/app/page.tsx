export default function Home() {
  return (
    <div className="min-h-screen  overflow-hidden font-mono">
      <div className="flex flex-col justify-center items-center h-screen text-justify max-w-2xl mx-auto p-4">
        <h1 className="text-6xl text-yellow-500 mb-8 text-center uppercase bg-black rounded-2xl p-4 font-bold">
          Yet another SWAPI App
        </h1>
        <p className="text-2xl mb-12">
          This is just a small Project for a coding challenge. I decided to
          focus on Accessibilty and a non SPA Approach. So every API call will
          be done by the server.
        </p>
        <p className="text-2xl mb-12">
          For the sake of time I only implemented the Films Page, but if I had
          more time I would have implemented the other pages as well.
        </p>
      </div>
    </div>
  );
}
