import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { User } from "./session";
import axios from "axios";

interface UseAuthProps {
  redirectIfFound?: boolean;
}
interface UseAuthReturn {
  data: User | null;
}

const swrFetcher = (url: string) => axios.get(url).then((res) => res.data);

export default function useAuth({
  redirectIfFound = false,
}: UseAuthProps): UseAuthReturn {
  const router = useRouter();

  const { data } = useSWR(`/api/user`, swrFetcher);

  useEffect(() => {
    if (!data) return;

    if (!data.isAuthenticated) router.push("/login");
    if (data.isAuthenticated && redirectIfFound) router.push("/dashboard");
  }, [data, redirectIfFound, router]);

  return { data };
}
