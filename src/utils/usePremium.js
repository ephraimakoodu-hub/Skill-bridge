import { useEffect, useState } from "react";
import { getSubscription } from "./subscriptionStore";

export default function usePremium() {
  const [premium, setPremium] = useState(false);
  const [loadingPremium, setLoadingPremium] =
    useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadPremium() {
      try {
        setLoadingPremium(true);

        const subscription =
          await getSubscription();

        if (!cancelled) {
          setPremium(!!subscription.active);
        }
      } catch (error) {
        console.error(
          "Failed to load Premium status:",
          error
        );

        if (!cancelled) {
          setPremium(false);
        }
      } finally {
        if (!cancelled) {
          setLoadingPremium(false);
        }
      }
    }

    loadPremium();

    return () => {
      cancelled = true;
    };
  }, []);

  return {
    premium,
    loadingPremium,
  };
}
