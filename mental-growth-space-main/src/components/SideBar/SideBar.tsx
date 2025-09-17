import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function SideBar() {
  const [counsellors, setCounsellors] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const { getToken } = useAuth();

  // fetch counsellors
  const fetchCounsellors = async (query = "") => {
    try {
      setLoading(true);
      const token = await getToken();
      const res = await fetch(
        "http://localhost:5000/api/counseller/filterCounseller",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ search: query }),
        }
      );
      const data = await res.json();
      setCounsellors(data.counsellors || []);
      setTotalCount(data.totalCount || 0);
    } catch (err) {
      console.error("Error fetching counsellors:", err);
    } finally {
      setLoading(false);
    }
  };

  // initial load
  useEffect(() => {
    fetchCounsellors();
  }, []);

  // debounce search input (1 sec)
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchCounsellors(search);
    }, 1000);
    return () => clearTimeout(handler);
  }, [search]);

  
  const handleSelectCounsellor = (counsellor: any) => {
    
    localStorage.setItem("counsellor", JSON.stringify(counsellor));
    window.dispatchEvent(new Event("counsellor-changed"));

  };

  return (
    // Hide sidebar below md screen
   <div className="hidden md:flex w-80 bg-blue-50 h-screen p-6 overflow-y-auto flex-col">
  {/* Search bar */}
  <div className="mb-6">
    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search counsellors..."
      className="w-full p-3 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
    />
  </div>

  <h2 className="text-2xl font-bold mb-6 text-blue-700">
    Counsellors ({totalCount})
  </h2>

  {loading ? (
    <p className="text-gray-500">Loading counsellors...</p>
  ) : counsellors.length === 0 ? (
    <p className="text-gray-500">No counsellors found.</p>
  ) : (
    <ul className="space-y-4">
      {counsellors.map((counsellor) => (
        <li
          key={counsellor.id}
          onClick={() => handleSelectCounsellor(counsellor)}
          className="flex items-center gap-3 p-3 rounded-xl shadow cursor-pointer transition bg-white hover:bg-blue-100"
        >
          {/* Image */}
          <img
            src={counsellor.imageUrl || "/default-avatar.png"}
            alt={`${counsellor.firstName} ${counsellor.lastName}`}
            className="w-14 h-14 rounded-full object-cover"
          />
          {/* Details */}
          <div className="flex-1">
            <div className="font-semibold text-blue-800 text-lg">
              {counsellor.firstName} {counsellor.lastName}
            </div>
            <div className="text-sm text-blue-600">{counsellor.email}</div>
            {counsellor.speciality && (
              <div className="text-xs text-blue-500 mt-1">{counsellor.speciality}</div>
            )}
          </div>
        </li>
      ))}
    </ul>
  )}
</div>

  );
}
