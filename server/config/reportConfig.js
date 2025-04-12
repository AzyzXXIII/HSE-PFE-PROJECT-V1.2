const getReportConfig = (reportType) => {
  const validReportTypes = {
    observations: {
      table: "observation",
      joins: `
        LEFT JOIN observation_type ot ON o.type_id = ot.id
        LEFT JOIN location l ON o.location_id = l.id
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
        o.severity AS severity,
        l.id AS location_id,
        l.name AS location_name,
        l.department,
        l.area_type,
        l.floor,
        l.location_code,
        l.capacity,
        l.hazard_level,
        l.latitude,
        l.longitude,
        l.loc_description
      `,
    },
    hazards: {
      table: "hazard",
      joins: `
        LEFT JOIN location l ON o.location_id = l.id
        LEFT JOIN users u ON o.submitted_by = u.id
        LEFT JOIN equipment e ON o.equipment_id = e.id
        LEFT JOIN hazard_group hg ON o.group_id = hg.id
      `,
      extraColumns: `
        u.first_name AS first_name,
        u.last_name AS last_name,
        u.email AS email,
        e.name AS equipment_name,
        hg.name AS type,
        o.env_comment AS cause,
        o.corrective_actions AS recommendation,
        l.id AS location_id,
        l.name AS location_name,
        l.department,
        l.area_type,
        l.floor,
        l.location_code,
        l.capacity,
        l.hazard_level,
        l.latitude,
        l.longitude,
        l.loc_description
      `,
    },
    incidents: {
      table: "incident",
      joins: `
        LEFT JOIN location l ON o.location_id = l.id
        LEFT JOIN users u ON o.submitted_by = u.id
        LEFT JOIN incident_type it ON o.primary_incident_type_id = it.id
      `,
      extraColumns: `
        u.first_name AS first_name,
        u.last_name AS last_name,
        u.email AS email,
        it.name AS type,
        it.name AS title,
        o.pi_actual_severity AS severity,
        o.pi_description AS description,
        l.id AS location_id,
        l.name AS location_name,
        l.department,
        l.area_type,
        l.floor,
        l.location_code,
        l.capacity,
        l.hazard_level,
        l.latitude,
        l.longitude,
        l.loc_description 
      `,
    },
    nearMiss: {
      table: `"nearMiss"`,
      joins: `
        LEFT JOIN location l ON o.location_id = l.id
        LEFT JOIN users u ON o.submitted_by = u.id
      `,
      extraColumns: `
        u.first_name AS first_name,
        u.last_name AS last_name,
        u.email AS email,
        o.status AS status,
        o.priority AS priority,
        o.date AS date,
        o.description AS description,
        l.id AS location_id,
        l.name AS location_name,
        l.department,
        l.area_type,
        l.floor,
        l.location_code,
        l.capacity,
        l.hazard_level,
        l.latitude,
        l.longitude,
        l.loc_description
      `,
    },
  };

  return validReportTypes[reportType] || null;
};

export default getReportConfig;
