import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function DailyReward() {
  const [showReward, setShowReward] = useState(false);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const lastVisit = Cookies.get("lastVisit");

    if (lastVisit !== today) {
      setShowReward(true);
      Cookies.set("lastVisit", today, { expires: 1 }); // 1 day cookie
    }
  }, []);

  if (!showReward) return null;

  return (
    <div className="fixed top-4 right-4 bg-yellow-200 border border-yellow-400 p-4 rounded shadow z-50">
      <h2 className="font-semibold">🎉 Welcome back!</h2>
      <p>You earned a reward: <strong>SAVE10</strong></p>
      <button
        onClick={() => setShowReward(false)}
        className="mt-2 text-sm text-blue-700 hover:underline"
      >
        Close
      </button>
    </div>
  );
}
