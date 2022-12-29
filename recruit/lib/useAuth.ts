import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { User } from "./session";

interface UseAuthProps {
  redirectIfFound?: boolean;
}
interface UseAuthReturn {
  data: User | null;
}

const swrFetcher = (url: string) => fetch(url).then((r) => r.json());

export default function useAuth({
  redirectIfFound = false,
}: UseAuthProps): UseAuthReturn {
  const router = useRouter();

  const { data } = useSWR(`/api/user`, swrFetcher);

  useEffect(() => {
    if (!data?.isAuthenticated) router.push("/");
    if (data?.isAuthenticated && redirectIfFound) router.push("/dashboard");
  }, [data, redirectIfFound, router]);

  return { data };
}
