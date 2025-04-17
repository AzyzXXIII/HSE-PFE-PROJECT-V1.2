import { useSearchParams } from "react-router-dom";
import Filter from "../../ui/Filter";

function DashboardFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentFilter = searchParams.get("last") || "all";

  function handleChange(e) {
    searchParams.set("last", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Filter
      filterField="last"
      options={[
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" },
        { value: "90", label: "Last 90 days" },
        { value: "all", label: "All time" },
      ]}
      value={currentFilter}
      onChange={handleChange}
    />
  );
}

export default DashboardFilter;
