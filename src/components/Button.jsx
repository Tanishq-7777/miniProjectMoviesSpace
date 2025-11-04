export default function Button({ key, genres, setGenreButton }) {
  const handleButtonClick = (e) => {
    setGenreButton(genres);
  };
  return (
    <div
      className="h-10 mx-1 my-2 cursor-pointer w-auto h-auto px-3 py-2 text-center bg-gradient-to-r from-[#0f2027] via-[#203a43] to-[#2c5364] rounded-4xl"
      key={key}
    >
      <button className="cursor-pointer" onClick={handleButtonClick}>
        {genres}
      </button>
    </div>
  );
}
