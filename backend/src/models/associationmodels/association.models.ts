import { User, SubscriptionType, CreditCard, Event, Guest, Invitation } from "../index"

export const defineAssociations = () => {
    
    User.belongsTo(SubscriptionType, { foreignKey: 'subscription_type_id' });
    SubscriptionType.hasMany(User, { foreignKey: 'subscription_type_id' });

    User.hasMany(CreditCard, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    CreditCard.belongsTo(User, { foreignKey: 'user_id', onDelete: 'CASCADE', onUpdate: 'CASCADE' })

    User.hasMany(Event, { foreignKey: 'user_id' });
    Event.belongsTo(User, { foreignKey: 'user_id' });

    User.hasMany(Guest, { foreignKey: 'user_id' });
    Guest.belongsTo(User, { foreignKey: 'user_id' });

    Event.belongsTo(User, { foreignKey: 'user_id' });
    User.hasMany(Event, { foreignKey: 'user_id' });

    Event.hasMany(Guest, { foreignKey: 'event_id' });
    Guest.belongsTo(Event, { foreignKey: 'event_id' });

    Invitation.belongsTo(Event, { foreignKey: 'event_id' });
    Event.hasMany(Invitation, { foreignKey: 'event_id' });
    
    Invitation.belongsTo(Guest, { foreignKey: 'guest_id' });
    Guest.hasMany(Invitation, { foreignKey: 'guest_id' });

};

// Guest y Event tienen una relación de muchos a muchos a través del modelo "Invitation".
// Un Guest puede estar asociado a varios Events a través de "Invitation".
// Un Event puede tener varios Guests a través de "Invitation".