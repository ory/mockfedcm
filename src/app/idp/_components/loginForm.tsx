import { useState } from "react";
import Image from "next/image";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const logoSrc = "/Vector.svg";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      setSuccess(true);

      // TODO: figure out where to redirect after login...
      window.location.href = "/";
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-32 flex justify-center items-center w-full">
      <div className="w-96 px-8 pt-8 pb-16 bg-white rounded-lg shadow-xl outline outline-2 outline-offset-[-2px] outline-fuchsia-300 flex flex-col justify-start items-center gap-11">
        <div className="flex flex-col justify-start items-center gap-3">
          <div className="p-1.5 bg-gradient-to-br from-fuchsia-500/20 to-pink-200/20 rounded-md outline outline-[0.72px] outline-offset-[-0.72px] outline-fuchsia-300 inline-flex justify-start items-center gap-1.5">
            <Image
              src={logoSrc}
              alt={"Company Logo"}
              width={40}
              height={40}
              className="object-contain"
            />
          </div>
          <div className="justify-start text-gray-900 text-base font-medium leading-none">
            Sign in to Mock-IdP
          </div>
        </div>

        {error && (
          <div className="self-stretch p-3 bg-red-50 border border-red-300 rounded-md text-red-700 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="self-stretch p-3 bg-green-50 border border-green-300 rounded-md text-green-700 text-sm">
            Successfully signed in! Redirecting...
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="self-stretch flex flex-col justify-start items-start gap-8 w-full"
        >
          <div className="self-stretch flex flex-col justify-start items-start gap-6 w-full">
            <div className="self-stretch flex flex-col justify-start items-start gap-1 w-full">
              <div className="self-stretch inline-flex justify-start items-center gap-8">
                <div className="flex-1 justify-start text-gray-900 text-sm font-medium leading-tight">
                  Email
                </div>
              </div>
              <div className="self-stretch p-3 bg-white rounded outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-2 overflow-hidden">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="flex-1 outline-none text-gray-900 text-sm"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="self-stretch flex flex-col justify-start items-start gap-1 w-full">
              <div className="self-stretch inline-flex justify-start items-center gap-8">
                <div className="flex-1 justify-start text-gray-900 text-sm font-medium leading-tight">
                  Password
                </div>
              </div>
              <div className="self-stretch p-3 bg-white rounded outline outline-1 outline-offset-[-1px] outline-gray-200 inline-flex justify-start items-center gap-2 overflow-hidden">
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="flex-1 outline-none text-gray-900 text-sm"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="self-stretch px-4 py-3.5 bg-gray-900 rounded inline-flex justify-center items-center overflow-hidden text-white text-sm font-normal leading-none"
          >
            {loading ? "Signing in..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
}
