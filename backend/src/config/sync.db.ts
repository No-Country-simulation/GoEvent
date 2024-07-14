import PostgreDB from "./db";

const syncDB = async () => {
  try {
    const dbInstance = await PostgreDB.getInstance()
    await dbInstance.sync();
    console.log('Sync database tables with Sequelize...');
    await dbInstance.close();
  } catch (err) {
    console.error('Unable to sync the database:', err);
  }
}

syncDB()