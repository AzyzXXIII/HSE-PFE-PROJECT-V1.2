import {
  HiOutlineClipboardDocumentList,
  HiOutlineBriefcase,
  HiOutlineChartBar,
} from "react-icons/hi2";
import { MdOutlinePendingActions } from "react-icons/md";

import Stat from "./Stat";
//import { formatCurrency } from "../../utils/helpers";

function Stats({ reports, confirmedStays, numEmployees, numHighSeverity }) {
  // 1.
  const numReports = reports.length;

  // 2.
  //const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  // 3.
  const checkins = confirmedStays.length;

  // 4.
  /* const occupation =
    confirmedStays.reduce((acc, cur) => acc + cur.numNights, 0) /
    (numDays * cabinCount); */
  // num checked in nights / all available nights (num days * num cabins)

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
