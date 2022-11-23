import { useEffect } from "react";
import Router from "next/router";
import useSWR from "swr";
import { swrFetcher } from "./swrFetcher";
import { User } from "./session";

interface UseAuthProps {
  redirectIfFound?: boolean;
}
interface UseAuthReturn {
  data: User | null;
}

export default function useAuth({
  redirectIfFound = false,
}: UseAuthProps): UseAuthReturn {
  const { data } = useSWR(`/api/user`, swrFetcher);

  useEffect(() => {
    if (!data?.isAuthenticated) Router.push("/login");
    if (data?.isAuthenticated && redirectIfFound) Router.push("/dashboard");
  }, [data, redirectIfFound]);

  return { data };
}
