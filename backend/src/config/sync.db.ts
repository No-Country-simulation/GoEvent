import PostgreDB from "./db";

const syncDB = async () => {
  try {
    await PostgreDB.getInstance().sync();
    console.log('Sync database tables with Sequelize...');
  } catch (err) {
    console.error('Unable to sync the database:', err);
  } finally {
    PostgreDB.getInstance().close();
  }
}

syncDB()