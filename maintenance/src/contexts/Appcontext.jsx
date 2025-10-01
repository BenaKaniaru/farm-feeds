import { createContext, useContext, useMemo, useState } from "react";
import { workOrders as initialWorkOrders } from "../Data/WorkOrdersData";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activities, setActivities] = useState(initialWorkOrders);
  const today = new Date();

  // 🔹 Generate new unique ID
  const generateNewId = (orders) => Math.max(...orders.map((o) => o.id), 0) + 1;

  // 🔹 Auto-process activities
  const processedActivities = useMemo(() => {
    let expandedOrders = activities.flatMap((wo) => {
      if (wo.status === "completed" && wo.nextServiceDate) {
        const nextServiceDate = new Date(wo.nextServiceDate);
        const diffInDays = Math.floor(
          (nextServiceDate - today) / (1000 * 60 * 60 * 24)
        );

        if (diffInDays >= 0 && diffInDays <= 7) {
          const newOrder = {
            ...wo,
            id: generateNewId(activities),
            status: "upcoming",
            createdAt: today.toISOString().split("T")[0],
            dueDate: wo.nextServiceDate,
            completedAt: null,
          };
          return [wo, newOrder];
        }
      }
      return [wo];
    });

    // 🔹 Auto-update ongoing → overdue
    expandedOrders = expandedOrders.map((wo) => {
      if (wo.status === "ongoing" && wo.dueDate) {
        const dueDate = new Date(wo.dueDate);
        if (today > dueDate) {
          return { ...wo, status: "overdue" };
        }
      }
      return wo;
    });

    return expandedOrders;
  }, [activities]);

  return (
    <AppContext.Provider
      value={{
        activities: processedActivities,
        setActivities,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
