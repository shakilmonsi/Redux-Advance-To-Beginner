// hooks/useApiRequest.js
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

// Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.example.com",
  timeout: 10000,
});

export const useApiRequest = ({
  url,
  method = "GET",
  data = null,
  enabled = true,
  requireAuth = true,
  queryKey = [url],
  refetchOnMount = true,
  refetchOnWindowFocus = true,
  staleTime = 1000 * 60 * 5, // 5 mins
  onSuccess,
  onError,
  invalidateKey,
}) => {
  const queryClient = useQueryClient();
  const token = Cookies.get("token");

  const headers = {
    "Content-Type": "application/json",
  };
  if (token && requireAuth) {
    headers.Authorization = `Bearer ${token}`;
  }

  const fetchData = async () => {
    if (!token && requireAuth) {
      toast.error("🔒 You are not logged in.");
      throw new Error("Authentication required");
    }

    const res = await api({ url, method, data, headers });
    return res.data;
  };

  const query = useQuery({
    queryKey,
    queryFn: fetchData,
    enabled: method === "GET" ? enabled : false,
    refetchOnMount,
    refetchOnWindowFocus,
    staleTime,
    onSuccess,
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
      onError && onError(error);
    },
  });

  const mutation = useMutation({
    mutationFn: fetchData,
    onSuccess: (data) => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }
      onSuccess && onSuccess(data);
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message || error.message);
      onError && onError(error);
    },
  });

  return method === "GET" ? query : mutation;
};

// const { mutate: login, isLoading } = useApiRequest({
//   url: "/login",
//   method: "POST",
//   data: { email, password },
//   requireAuth: false,
//   onSuccess: (data) => {
//     Cookies.set("token", data.token);
//     toast.success("✅ Login Successful!");
//   },
// });

// const { mutate: deletePost, isLoading } = useApiRequest({
//   url: `/posts/${postId}`,
//   method: "DELETE",
//   invalidateKey: ["posts"], // Auto refetch post list
// });

// const { data, isFetching, refetch } = useApiRequest({
//   url: `/search?q=${searchTerm}`,
//   method: "GET",
//   enabled: false, // Only fetch when refetch() is called
//   queryKey: ["search", searchTerm],
// });

// import { useQueryClient } from "@tanstack/react-query";

// const queryClient = useQueryClient();

// // Prefetch profile data ahead of time
// queryClient.prefetchQuery({
//   queryKey: ["profile"],
//   queryFn: () => axios.get("/profile").then((res) => res.data),
// });
