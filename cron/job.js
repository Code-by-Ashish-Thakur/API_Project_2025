import cron from 'node-cron';

const job = cron.schedule('0 0 * * *', () => {
    console.log('⏰ Daily job: Send report or clear cache etc.');
});

export default job;
