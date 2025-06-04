// src/hooks/useAutoPrefetch.ts

import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { prefetchConfig } from "../config/prefetch-config";

export const useAutoPrefetch = (context: string) => {
  const queryClient = useQueryClient();
  const token = Cookies.get("token"); // Token আপনার cookie নাম অনুসারে পরিবর্তন করুন

  useEffect(() => {
    if (!context) return;

    const runPrefetch = async () => {
      const targetAPIs = prefetchConfig.filter((api) => {
        if (Array.isArray(api.when)) {
          return api.when.includes(context) || api.when.includes("always");
        }
        return api.when === context || api.when === "always";
      });

      for (const api of targetAPIs) {
        if (api.requiresAuth && !token) {
          console.warn(
            `Prefetch skipped for ${api.url} because auth token missing`
          );
          continue;
        }

        try {
          await queryClient.prefetchQuery({
            queryKey: api.key,
            queryFn: () =>
              axios
                .get(api.url, {
                  headers: token ? { Authorization: `Bearer ${token}` } : {},
                })
                .then((res) => res.data),
            staleTime: 1000 * 60 * 5, // 5 minutes cache lifetime
          });
          // Optional: console.log(`Prefetched: ${api.url}`);
        } catch (error) {
          console.error(`Error prefetching ${api.url}`, error);
        }
      }
    };

    runPrefetch();
  }, [context, queryClient, token]);
};

// useAutoPrefetch('onHome');
