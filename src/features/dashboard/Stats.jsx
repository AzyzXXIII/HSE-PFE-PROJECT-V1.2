import {
  HiOutlineClipboardDocumentList,
  HiOutlineBriefcase,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { MdOutlinePendingActions } from "react-icons/md";

import Stat from "./Stat";
//import { formatCurrency } from "../../utils/helpers";

function Stats({ reports, confirmedStays, numEmployees, numHighSeverity }) {
  const numReports = reports.length;

  const checkins = confirmedStays.length;

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
        title="in pending"
        color="indigo"
        icon={<MdOutlinePendingActions />}
        value={checkins}
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
