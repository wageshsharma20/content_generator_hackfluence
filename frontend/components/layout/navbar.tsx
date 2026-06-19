import { Bell, Search } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <div className="flex items-center gap-3 rounded-xl border px-4 py-2">
        <Search size={18} />

        <input
          placeholder="Search products, influencers..."
          className="outline-none"
        />
      </div>

      <div className="flex items-center gap-5">
        <button className="relative">
          <Bell size={20} />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-100 font-bold text-orange-600">
            NGO
          </div>

          <div>
            <p className="font-medium">
              Rural Cooperative
            </p>

            <p className="text-xs text-gray-500">
              Premium Account
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}