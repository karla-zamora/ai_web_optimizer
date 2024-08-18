export default function ProButton() {
    return (
      <button className="px-4 py-2 rounded-md border border-[#d49c73] bg-[length:200%_100%] bg-[linear-gradient(110deg,#c75c5c,45%,#d49c73,55%,#c75c5c)] text-[#f3cb83] font-bold text-sm hover:-translate-y-1 transform transition duration-200 hover:shadow-[#f3cb83] hover:shadow-md animate-shimmer">
        <a href="/dashboard">
          Dashboard
        </a>
      </button>
    )
}