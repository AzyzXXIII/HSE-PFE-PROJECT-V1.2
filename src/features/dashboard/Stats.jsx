import {
  HiOutlineClipboardDocumentList,
  HiOutlineBriefcase,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { MdOutlinePendingActions } from "react-icons/md";

import Stat from "./Stat";

function Stats({ numReports, pendingReports, numEmployees, numHighSeverity }) {
  return (
    <>
      <Stat
        title="Reports"
        color="blue"
        icon={<HiOutlineClipboardDocumentList />}
        value={numReports}
      />

      <Stat
        title="Employees"
        color="green"
        icon={<HiOutlineBriefcase />}
        value={numEmployees}
      />

      <Stat
        title="In Pending"
        color="indigo"
        icon={<MdOutlinePendingActions />}
        value={pendingReports}
      />

      <Stat
        title="High Severity"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={numHighSeverity}
      />
    </>
  );
}

export default Stats;
