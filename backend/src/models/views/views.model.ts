import { sequelize } from "../../config/sequelize.config";

export const defineViews = () => {

  // Vista de guests y events
  const queryViewGuestsEvents = `
    CREATE OR REPLACE VIEW event_guests AS
    SELECT
      u.id as user_id,
      e.id as event_id,
      i.id as invitation_id,
      g.id as guest_id,
      g.fullname as guest_fullname,
      g.email as guest_email,
      g.phone as guest_phone,
      i.qr_code as invitation_qr_code,
      i.status as invitation_status,
      i.attendance as invitation_attendance
    FROM
      guests g
    JOIN
      invitations i ON g.id = i.guest_id
    JOIN
      events e ON e.id = i.event_id
    JOIN
      users u ON u.id = g.user_id;
  `;

  sequelize
    .query(queryViewGuestsEvents)
    .then((result) => {
      console.log('Vista creada exitosamente', result);
    })
    .catch((error) => {
      console.log('Error al crear la vista:', error);
    });
};


