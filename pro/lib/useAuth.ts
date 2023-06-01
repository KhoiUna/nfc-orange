import { useEffect } from "react";
import useSWR from "swr";
import { swrFetcher } from "./swrFetcher";
import { User } from "./session";
import { useRouter } from "next/navigation";

interface UseAuthProps {
  redirectIfFound?: boolean;
}
interface UseAuthReturn {
  data: User | null;
}

export default function useAuth({
  redirectIfFound = false,
}: UseAuthProps): UseAuthReturn {
  const router = useRouter();

  const { data } = useSWR('/api/user', swrFetcher);

  useEffect(() => {
    if (!data) return

    if (!data.isAuthenticated) return router.push("/");
    if (data.isAuthenticated && redirectIfFound) return router.push("/dashboard");
  }, [data, redirectIfFound, router]);

  return { data };
}
