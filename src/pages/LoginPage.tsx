import { ShieldHalf } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { firm } from "../data";

export function LoginPage() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-canvas px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <span className="mb-3 grid h-12 w-12 place-items-center rounded-2xl bg-ink-900 text-white">
            <ShieldHalf className="h-6 w-6" />
          </span>
          <p className="text-lg font-semibold text-ink-900">{firm.name}</p>
          <p className="text-sm text-ink-500">Audit Operating System</p>
        </div>

        <form
          className="panel space-y-4 p-6"
          onSubmit={(event) => {
            event.preventDefault();
            navigate("/");
          }}
        >
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Email</span>
            <input type="email" required defaultValue="maya.sorensen@meridiancole.com" className="input w-full" />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-ink-500">Password</span>
            <input type="password" required defaultValue="••••••••••" className="input w-full" />
          </label>
          <button type="submit" className="btn-primary w-full justify-center">
            Sign in
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-ink-500">
          Are you a client?{" "}
          <button onClick={() => navigate("/portal")} className="font-semibold text-brand-600 hover:text-brand-700">
            Go to the client portal
          </button>
        </p>
      </div>
    </div>
  );
}
