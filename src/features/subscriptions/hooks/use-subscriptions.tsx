import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";


export const useSubscription = () => {
    return useQuery({
        queryKey: ['subscriptions'],
        queryFn: async () => {
            const { data } = await authClient.customer.state()
            return data;
        }
    })
}


export const useHasActiveSubscription = () => {
    
    const { data: costumerState , isLoading , ...rest} = useSubscription();

    const hasActiveSubscription = costumerState?.activeSubscriptions && costumerState.activeSubscriptions.length > 0 ;
    
    return {
        hasActiveSubscription,
        subscription : costumerState?.activeSubscriptions?.[0],
        isLoading,
        ...rest
    }
}