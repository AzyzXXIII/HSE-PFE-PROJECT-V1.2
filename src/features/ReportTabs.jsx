import React from "react";
import styled from "styled-components";

const TabContainer = styled.div`
  display: flex;
  margin: 1rem 0;
  border-bottom: 2px solid #ddd;
`;

const Tab = styled.div`
  padding: 0.8rem 2rem;
  cursor: pointer;
  background-color: ${({ active }) => (active ? "#564ccf" : "#fff")};
  color: ${({ active }) => (active ? "#fff" : "#564ccf")};
  border: ${({ active }) => (active ? "1px solid #564ccf" : "1px solid #ddd")};
  border-radius: 8px 8px 0 0;
`;

const TabContent = styled.div`
  padding: 2rem;
  background-color: #f8f8f8;
  border: 1px solid #ddd;
  border-top: none;
  margin-bottom: 2rem;
`;

function ReportTabs({
  tabTitles,
  activeTab,
  onTabClick,
  renderReportDetails,
  renderAdditionalInformation,
  renderHistory,
}) {
  return (
    <div>
      <TabContainer>
        {tabTitles.map((title) => (
          <Tab
            key={title}
            active={activeTab === title}
            onClick={() => onTabClick(title)}
          >
            {title}
          </Tab>
        ))}
      </TabContainer>

      <TabContent>
        {activeTab === "Report Details" && renderReportDetails()}
        {activeTab === "Additional Information" &&
          renderAdditionalInformation()}
        {activeTab === "History" && renderHistory()}
      </TabContent>
    </div>
  );
}

export default ReportTabs;
