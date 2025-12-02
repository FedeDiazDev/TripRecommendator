export default function SearchBar() {
  return (
    <div className="w-full h-full pointer-events-none bg-black/70 fixed top-0 left-0 z-999999999999999999999999999999999999999999999999">
      <div style={{ transform: "translate(-50%, -50%)" }} className={`
        absolute top-[50%] left-[50%] inset-0 flex flex-col items-center justify-center z-30 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
        `}>
          <input type="text" />
      </div>
    </div>
  );
}
