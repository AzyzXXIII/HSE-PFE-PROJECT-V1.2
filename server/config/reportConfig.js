const getReportConfig = (reportType) => {
  const validReportTypes = {
    observations: {
      table: "observation",
      joins: `
        LEFT JOIN observation_type ot ON o.type_id = ot.id
        LEFT JOIN users u ON o.submitted_by = u.id
      `,
      extraColumns: `
        ot.type AS type,
        u.first_name AS first_name,
        u.last_name AS last_name,
        u.email AS email,
        o.title AS title,
        o.date AS date,
        o.status AS status,
        o.priority AS priority,
        o.severity AS severity
    
      `,
      severityColumn: "severity",
    },
    hazards: {
      table: "hazard",
      joins: `
        LEFT JOIN users u ON o.submitted_by = u.id
        LEFT JOIN hazard_group hg ON o.group_id = hg.id
      `,
      extraColumns: `
        u.first_name AS first_name,
        u.last_name AS last_name,
        u.email AS email,
        o.severity,
        hg.group AS type,
        o.env_comment AS cause,
        o.corrective_actions AS recommendation,
        o.latitude,
        o.longitude
      `,
      severityColumn: "severity",
    },
    incidents: {
      table: "incident",
      joins: `
        LEFT JOIN users u ON o.submitted_by = u.id
        LEFT JOIN injury_incident ii ON o.id = ii.incident_id
        LEFT JOIN injured_type itype ON ii.injured_type_id = itype.id
        LEFT JOIN users injured ON ii.injured_person_id = injured.id
      `,
      extraColumns: `
      u.first_name AS first_name,
      u.last_name AS last_name,
      u.email AS email,
      o.pi_actual_severity AS severity,
      o.pi_description AS description,
      ii.activity,
      ii.affected_body_parts,
      ii.injury_nature,
      ii.classification,
      ii.first_aid_measures,
      ii.days_absent,
      ii.lost_time_minutes,
      ii.lost_consciousness,
      ii.was_transferred_to_hospital,
      itype.type AS type, 
      injured.first_name AS injured_first_name,
      injured.last_name AS injured_last_name,
      injured.email AS injured_email
    `,
      severityColumn: "pi_actual_severity",
    },

    nearMiss: {
      table: `"nearMiss"`,
      joins: `
        LEFT JOIN users u ON o.submitted_by = u.id
        LEFT JOIN near_miss_type nmt ON o.type_id = nmt.id  
      `,
      extraColumns: `
        u.first_name AS first_name,
        u.last_name AS last_name,
        u.email AS email,
        o.status AS status,
        o.priority AS priority,
        o.date AS date,
        o.description AS description,
        nmt.type AS type
      `,
      severityColumn: null,
    },
  };

  return validReportTypes[reportType] || null;
};

export default getReportConfig;
